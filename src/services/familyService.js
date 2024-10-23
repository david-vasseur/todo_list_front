export const createFamily = async (csrf, id, name) => {
    try {
        const response = await fetch('https://api.ez-task.fr/api/family/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
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