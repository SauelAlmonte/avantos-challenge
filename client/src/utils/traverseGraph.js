export const topologicalSort = (nodes) => {
    const graph = new Map();
    const inDegree = new Map();

    // Initialize graph nodes
    for (const node of nodes) {
        graph.set(node.id, []);
        inDegree.set(node.id, 0);
    }

    // Build edges from prerequisites
    for (const node of nodes) {
        const prerequisites = node.data?.prerequisites || [];

        for (const dep of prerequisites) {
            if (graph.has(dep)) {
                graph.get(dep).push(node.id);
                inDegree.set(node.id, inDegree.get(node.id) + 1);
            }
        }
    }

    // Topological sort using Kahn's Algorithm
    const queue = [...inDegree.entries()]
        .filter(([, degree]) => degree === 0)
        .map(([id]) => id);

    const sorted = [];
    while (queue.length > 0) {
        const current = queue.shift();
        sorted.push(current);

        for (const neighbor of graph.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Return the original node objects in topological order
    return sorted.map(id => nodes.find(node => node.id === id));
};
