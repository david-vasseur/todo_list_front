import { createContext, useState } from "react";

export const SecurityContext = createContext(null)

export const SecurityProvider = ({ children }) => {

    const [csrf, setCsrf] = useState('');
    const [jwt, setJwt] = useState('');

    return (
        <SecurityContext.Provider value={{ csrf, setCsrf, jwt, setJwt }}>
            {children}
        </SecurityContext.Provider>
    )
}