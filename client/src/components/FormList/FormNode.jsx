import { useState } from 'react';
import './FormNode.css';
import PrefillModal from '../PrefillModal/PrefillModal';

const FormNode = ({ node, onNodeUpdate, dependencies }) => {
    const [showPrefill, setShowPrefill] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(prev => !prev);

    return (
        <div className="form-node">
            <div className="form-node__header" onClick={toggleExpanded}>
                <span className="form-node__toggle">
                    {expanded ? '▼' : '▶'} {node.data.name}
                </span>
            </div>

            {expanded && (
                <div className="form-node__fields">
                    {Object.entries(node.data?.field_schema?.properties || {}).map(([fieldKey, schema]) => {
                        if (
                            schema?.avantos_type === 'button' ||
                            schema?.type === 'object'
                        ) return null;

                        const config = node.data?.dynamic_field_config?.[fieldKey];
                        const label = config?.prefill ? config.prefill : 'Not configured';

                        return (
                            <div className="form-node__field" key={fieldKey}>
                                <strong className="form-node__label">{fieldKey}:</strong>
                                <span className={`form-node__value${config?.prefill ? ' form-node__value--configured' : ' form-node__value--not-configured'}`}>
                                    {label}
                                </span>
                                <button
                                    className="form-node__button"
                                    onClick={() => setShowPrefill(fieldKey)}
                                >
                                    {config?.prefill ? 'Edit Prefill' : 'Set Prefill'}
                                </button>

                                {config?.prefill && (
                                    <button
                                        className="form-node__clear"
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
