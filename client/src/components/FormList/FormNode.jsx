import { useState } from 'react';
import './FormNode.css';
import PrefillModal from '../PrefillModal/PrefillModal';

const FormNode = ({ node, onNodeUpdate, dependencies }) => {
    const [showPrefill, setShowPrefill] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(prev => !prev);

    return (
        <div className="form-container">
            <div className="form-header" onClick={toggleExpanded}>
                <span className="form-toggle">
                    {expanded ? '▼' : '▶'} {node.data.name}
                </span>
            </div>

            {expanded && (
                <div className="form-node">
                    {Object.entries(node.data?.field_schema?.properties || {}).map(([fieldKey, schema]) => {
                        // Skip unsupported field types
                        if (
                            schema?.avantos_type === 'button' ||
                            schema?.type === 'object'
                        ) return null;

                        const config = node.data?.dynamic_field_config?.[fieldKey];
                        const label = config?.prefill ? config.prefill : 'Not configured';

                        return (
                            <div className="form-field" key={fieldKey}>
                                <strong>{fieldKey}:</strong>
                                <span className={config?.prefill ? 'configured' : 'not-configured'}>
                                    {label}
                                </span>
                                <button onClick={() => setShowPrefill(fieldKey)}>
                                    {config?.prefill ? 'Edit Prefill' : 'Set Prefill'}
                                </button>

                                {config?.prefill && (
                                    <button
                                        className="clear-prefill"
                                        onClick={() => {
                                            const updatedConfig = { ...node.data.dynamic_field_config };
                                            delete updatedConfig[fieldKey];
                                            onNodeUpdate(node.id, { dynamic_field_config: updatedConfig });
                                        }}
                                        aria-label="Clear Prefill"
                                        title="Clear Prefill"
                                    >
                                        X
                                    </button>
                                )}

                                {showPrefill === fieldKey && (
                                    <PrefillModal
                                        isOpen
                                        onClose={() => setShowPrefill(false)}
                                        formId={node.id}
                                        fieldKey={fieldKey}
                                        dependencies={dependencies}
                                        onSave={(formId, fieldKey, source) => {
                                            const updatedConfig = {
                                                ...node.data.dynamic_field_config,
                                                [fieldKey]: {
                                                    ...node.data.dynamic_field_config?.[fieldKey],
                                                    prefill: source
                                                }
                                            };
                                            onNodeUpdate(node.id, { dynamic_field_config: updatedConfig });
                                            setShowPrefill(false);
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FormNode;
