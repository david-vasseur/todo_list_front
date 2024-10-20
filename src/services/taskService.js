export const getAllTasks = async (id) => {
    try {
        const response = await fetch(`http://91.134.90.159/api/task/${id}`, {
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

export const createTask = async (content, id) => {
    try {
        const response = await fetch('http://91.134.90.159/api/task/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

export const updateTask = async (id, content) => {
    try {
        const response = await fetch('http://91.134.90.159/api/task/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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

export const deleteTask = async (id) => {
    try {
        const response = await fetch('http://91.134.90.159/api/task/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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