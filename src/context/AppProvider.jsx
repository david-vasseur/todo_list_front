import { ModalProvider } from "./ModalContext"
import { SecurityProvider } from "./SecurityContext"
import { UserProvider } from "./UserContext"

export const AppProvider = ({children}) => {
    return (
        <SecurityProvider>
            <UserProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </UserProvider>
        </SecurityProvider>
    )
}