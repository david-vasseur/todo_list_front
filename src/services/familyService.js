export const createFamily = async (id, name) => {
    try {
        const response = await fetch('http://localhost:8080/api/family/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
                id,
                name
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};