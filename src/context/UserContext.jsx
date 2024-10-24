import { createContext, useEffect, useReducer, useState } from "react";
import io from 'socket.io-client';

const UserContext = createContext(null);

const initialState = {
    isConnected: false,
    id: 0,
    name: '',
    firstName: '',
    email: '',
    family: '',
    familyId: 0,
    hash: null,
    isOwner: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'add user': {
            return {
                ...state,
                isConnected: true,
                id: action.payload.id,
                name: action.payload.name,
                firstName: action.payload.firstName,
                email: action.payload.email,
                family: action.payload.family,
                familyId: action.payload.familyId,
                hash: action.payload.hash,
                isOwner: action.payload.isOwner
            }
        }
        case 'remove user': {
            return initialState
        }
        case 'update name': {
            return {
                ...state,
                name: action.payload.name
            }
        }
        case 'update firstName': {
            return {
                ...state,
                firstName: action.payload.firstName
            }
        }
        case 'add family': {
            return {
                ...state,
                family: action.payload.family !== undefined ? action.payload.family : state.family,
                familyId: action.payload.familyId !== undefined ? action.payload.familyId : state.familyId,
                hash: action.payload.hash !== undefined ? action.payload.hash : state.hash,
                isOwner: action.payload.isOwner !== undefined ? action.payload.isOwner : state.isOwner
            }
        }
        
        default:
            return state
    }
}

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [socket, setSocket] = useState(null);



    useEffect(() => {
        
        if (state.isConnected) {
            const newSocket = io('wss://api.ez-task.fr/', {
                query: {
                    userId: state.id,
                    userFirstName: state.firstName,
                },
            });

            setSocket(newSocket); 

            newSocket.on('connect', () => {
                console.log(`l'utilisateur ${state.firstName} vient de se connecter`);
            });

            newSocket.on('disconnect', () => {
                console.log(`l'utilisateur ${state.firstName} vient de se déconnecter`);
            });

            
            return () => {
                newSocket.disconnect();
            };
        }
    }, [state.isConnected, state.id]);

    return (
        <UserContext.Provider value={{ state, dispatch, socket }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, initialState, reducer, UserContext }