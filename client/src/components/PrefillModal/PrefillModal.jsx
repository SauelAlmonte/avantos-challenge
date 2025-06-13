import { useState, useEffect } from 'react';
import './PrefillModal.css';

const GLOBAL_FIELDS = [
    { label: 'Global: Organization Name', value: 'global.organization_name' },
    { label: 'Global: Client Tier', value: 'global.client_tier' },
    { label: 'Global: Industry', value: 'global.industry' }
];

const PrefillModal = ({ isOpen, onClose, formId, fieldKey, dependencies, onSave }) => {
    const [selectedSource, setSelectedSource] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (!isOpen) return;

        setSelectedSource('');
        const seen = new Set();
        const sourceOptions = [];

        dependencies.forEach(dep => {
            const formName = dep.data?.name || dep.id;
            const fields = dep.data?.field_schema?.properties;

            if (!fields) return;

            Object.entries(fields).forEach(([key, schema]) => {
                // Exclude invalid field types
                if (
                    schema?.type === 'object' ||
                    schema?.avantos_type === 'button'
                ) return;

                const value = `${formName}.${key}`;
                if (!seen.has(value)) {
                    seen.add(value);
                    sourceOptions.push({ label: `${formName}: ${key}`, value });
                }
            });
        });

        sourceOptions.push(...GLOBAL_FIELDS);
        setOptions(sourceOptions);
    }, [isOpen, dependencies, fieldKey]);

    const handleSave = () => {
        if (selectedSource) {
            onSave(formId, fieldKey, selectedSource);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Set Prefill Mapping</h3>
                <p><strong>Field:</strong> {fieldKey}</p>

                <label>
                    Select Source:
                    <select
                        value={selectedSource}
                        onChange={(e) => setSelectedSource(e.target.value)}
                    >
                        <option value="">-- Choose source field --</option>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="modal-actions">
                    <button onClick={handleSave} disabled={!selectedSource}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default PrefillModal;
