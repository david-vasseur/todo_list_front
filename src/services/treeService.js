export const getAllTrees = async (familyId) => {
    try {
        const response = await fetch(`http://api.ez-task.fr/api/tree/all/${familyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });
        const data = await response.json();
        return data.data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};

export const getTree = async (id) => {
    try {
        const response = await fetch(`http://api.ez-task.fr/api/tree/one/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });
        const data = await response.json();
        console.log(data.data);
        return data.data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};

export const createTree = async (name, familyId) => {
    try {
        const response = await fetch('http://api.ez-task.fr/api/tree/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                familyId
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};

export const deleteTree = async (id) => {
    try {
        const response = await fetch(`http://api.ez-task.fr/api/tree/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};

export const updateTree = async (id, name) => {
    try {
        const response = await fetch('http://api.ez-task.fr/api/tree/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
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