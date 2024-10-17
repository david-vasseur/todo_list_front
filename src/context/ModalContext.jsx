import { createContext, useContext, useReducer } from "react";
import { initialState } from "./UserContext";

const ModalContext = createContext({
    isVisible: false,
    title: '',
    message: ''
});

export const useModal = () => {
    return useContext(ModalContext);
};

const modalReducer = (state, action) => {
    switch (action.type) {
        case 'show modal':
            return {
                ...state,
                isVisible: true,
                title: action.payload.title,
                message: action.payload.message
            }         
        case 'hide modal':
            return {
                ...state,
                isVisible: false,
                title: '',
                message: ''
            }
        default:
           return state
    }
}

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(modalReducer, initialState);

    const showModal = (title, message) => {
        dispatch({ type: 'show modal', payload: { title, message } });
    };

    const hideModal = () => {
        dispatch({ type: 'hide modal' })
    }

    return (
        <ModalContext.Provider value={{ state, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    )
};