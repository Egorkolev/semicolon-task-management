import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserType {
    name: string;
    email: string;
    userImg: string;
}

const UserContext = createContext<{
    userData: UserType | undefined;
    setUserData: (data: UserType) => void;
} | undefined>(undefined)

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [userData, setUserData] = useState<UserType>();

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};