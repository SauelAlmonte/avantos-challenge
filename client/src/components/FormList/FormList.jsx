import { useEffect, useState } from "react";
import FormNode from "./FormNode";
import "./FormList.css";
import { useFormGraph } from "../../hooks/useFormGraph.js";
import { topologicalSort } from "../../utils/traverseGraph.js";

const FormList = () => {
    const { formGraph, loading, error } = useFormGraph();
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        if (formGraph?.nodes?.length && formGraph?.forms?.length) {
            const formMap = new Map(formGraph.forms.map(f => [f.id, f]));

            const enrichedNodes = formGraph.nodes.map(node => {
                const formDetails = formMap.get(node.data.component_id);
                return {
                    ...node,
                    data: {
                        ...node.data,
                        field_schema: formDetails?.field_schema || null,
                        ui_schema: formDetails?.ui_schema || null,
                    }
                };
            });

            const sortedNodes = topologicalSort(enrichedNodes);

            sortedNodes.sort((a, b) => {
                const nameA = a.data?.name || "";
                const nameB = b.data?.name || "";
                return nameA.localeCompare(nameB);
            });

            setNodes(sortedNodes);
        }
    }, [formGraph]);

    const handleNodeUpdate = (nodeId, updatedData) => {
        setNodes(prev =>
            prev.map(node =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, ...updatedData } }
                    : node
            )
        );
    };

    const collectDependencies = (nodeId, visited = new Set()) => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node || visited.has(nodeId)) return [];

        visited.add(nodeId);
        const prerequisites = node.data?.prerequisites || [];

        let result = [];

        for (const prereqId of prerequisites) {
            const prereqNode = nodes.find(n => n.id === prereqId);
            if (prereqNode && prereqNode.type === "form") {
                result.push(prereqNode);
            }

            result = result.concat(collectDependencies(prereqId, visited));
        }

        return result;
    };

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(nodes, null, 2)], {
            type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "form-nodes.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <p>Loading forms...</p>;
    if (error) return <p className="form-list__error">Error loading form graph.</p>;

    return (
        <section className="form-list">
            <h2 className="form-list__title">Available Forms</h2>
            <button className="form-list__download-button" onClick={handleDownload}>
                Download JSON
            </button>
            <ul className="form-list__items">
                {nodes.map((node) => (
                    <FormNode
                        key={node.id}
                        node={node}
                        onNodeUpdate={handleNodeUpdate}
                        dependencies={collectDependencies(node.id)}
                    />
                ))}
            </ul>
        </section>
    );
};

export default FormList;
