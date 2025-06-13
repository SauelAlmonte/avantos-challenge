import { useEffect, useState } from 'react';
import { fetchFormGraph } from '../services/fetchFormGraph.js';

export function useFormGraph() {
    const [formGraph, setFormGraph] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGraph = async () => {
            try {
                const data = await fetchFormGraph();
                setFormGraph(data);
            } catch (err) {
                console.error('Failed to fetch form graph:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        void loadGraph();
    }, []);

    return { formGraph, loading, error };
}
