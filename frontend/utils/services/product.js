const BASE_URL = "http://localhost:8000/api/";

export const addProduct = async (formData, token) => {
    try {
        const res = await fetch(`${BASE_URL}products/`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return res.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const getProducts = async () => {
    try {
        const res = await fetch(`${BASE_URL}products/`, { cache: "no-store" });
        return res.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const getProduct = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}products/${id}/`, { cache: "no-store" });
        return res.json();
    } catch (error) {
        throw new Error(error);
    }
};
