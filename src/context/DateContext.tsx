import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

const DateContext = createContext<{
    newDate: Date | undefined;
    setNewDate: (data: Date | undefined) => void;
    dateISO: string | undefined;
} | undefined>(undefined);

export const DateProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [newDate, setNewDate] = useState<Date | undefined>();
    const [dateISO, setDateISO] = useState<string | undefined>();

    useEffect(() => {
        const newDateISO = newDate?.toISOString().slice(0, 10);
        setDateISO(newDateISO)
    }, [newDate])

    return (
        <DateContext.Provider value={{newDate, dateISO, setNewDate}}>
            {children}
        </DateContext.Provider>
    );
};

export const useDateContext = () => {
    const context = useContext(DateContext);
    if(!context) {
        throw new Error("useDateContext must be used within a UserProvider");
    }
    return context;
};