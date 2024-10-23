export const getAllTasks = async (csrf, id) => {
    try {
        const response = await fetch(`http://api.ez-task.fr/api/task/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
            },
            credentials: "include",
        });
        const data = await response.json();
        return data.data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};

export const createTask = async (csrf, content, id) => {
    try {
        const response = await fetch('http://api.ez-task.fr/api/task/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
            },
            credentials: "include",
            body: JSON.stringify({
                content: content,
                treeId: id
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};

export const updateTask = async (csrf, id, content) => {
    try {
        const response = await fetch('http://api.ez-task.fr/api/task/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
            },
            credentials: "include",
            body: JSON.stringify({
                id,
                content
            })
        });
        const data = await response.json();
        console.log(data);
        
        return data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};

export const deleteTask = async (csrf, id) => {
    try {
        const response = await fetch('http://api.ez-task.fr/api/task/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
            },
            credentials: "include",
            body: JSON.stringify({
                id
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: { message: error.message } };
    }
};