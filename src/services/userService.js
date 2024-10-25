

export const fetchsign = async (values, csrf) => {
    const { email, password, name, firstName } = values;
    try {
        const response = await fetch('https://api.ez-task.fr/api/users/sign', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf 
            },
            credentials: "include",
            body: JSON.stringify({ email, password, name, firstName })
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: { message: error.message } }
    }
};

export const fetchLogin = async (values, csrf, dispatch) => {
    const { email, password } = values;
    
    try {
        const response = await fetch('https://api.ez-task.fr/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message)
        }
        const data = await response.json();
        dispatch({
            type: 'add user',
            payload: {
                id: data.user.id,
                name: data.user.name,
                firstName: data.user.firstName,
                email: data.user.email,
                family: data.user.family.name,  
                familyId: data.user.familyId, 
                hash: data.user.family.hash, 
                isOwner: data.user.family.isOwner 
            }
        })
        return {
            success: response.ok,
            data
        };
    } catch (error) {
        console.error(error.message);
        return { error: { message: error.message } };
    }    
};

export const getCsrf = async () => {
    try {
        const response = await fetch('https://api.ez-task.fr/api/csrfToken', {
            method: "GET",
            credentials: "include"
        });
        if(!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        console.error(error.message);
        return null;
    } 
}

export const getUser = async (dispatch) => {
    const response = await fetch('https://api.ez-task.fr/api/users/user', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    
    dispatch({
        type: 'add user',
        payload: {
            id: data.userInfos.id,
            name: data.userInfos.name,
            firstName: data.userInfos.firstName,
            email: data.userInfos.email,
            family: data.userInfos.family.name,  
            familyId: data.userInfos.familyId, 
            hash: data.userInfos.family.hash, 
            isOwner: data.userInfos.family.isOwner 
        }
    })
    return data
};

export const getAllUsers = async (csrf, id) => {
    const response = await fetch(`https://api.ez-task.fr/api/users/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf
        },
        credentials: "include",
    });
    const data = await response.json();
    return data;
};

export const fetchLogout = async (csrf) => {
    const response = await fetch(`https://api.ez-task.fr/api/users/logout`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf
        },
        credentials: "include",
    });
    const data = await response.json();
    return data;
}