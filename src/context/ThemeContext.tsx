import { useEffect, useState, createContext, useContext, ReactNode } from "react";

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
})

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState(() => {
        if(typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    })

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}