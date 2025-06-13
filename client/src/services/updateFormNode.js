const API_BASE = "http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc";

/**
 * Update a form node's dynamic_field_config on the server.
 *
 * @param {string} nodeId - The unique ID of the form node.
 * @param {object} config - The updated dynamic_field_config object.
 * @returns {Promise<object>} - The updated node data from the server.
 */
export const updateFormNode = async (nodeId, config) => {
    try {
        const response = await fetch(`${API_BASE}/nodes/${nodeId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ dynamic_field_config: config }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API error ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Failed to update form node:", err);
        throw err;
    }
};
