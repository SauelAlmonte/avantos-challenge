const API_URL =
    "http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph";

export const fetchFormGraph = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch form graph");
    return res.json();
};
