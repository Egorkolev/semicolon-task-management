"use client";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme();
    const [storageTheme, setStorageTheme] = useState<string | null>(null);

    useEffect(() => {
        if(typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            setStorageTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if(theme) {
            localStorage.setItem("theme", theme)
        }
    }, [theme]);

    const currentTheme = storageTheme && theme;
    
    return (
        <Button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-800 border-white dark:border-gray hover:bg-slate-800 dark:hover:bg-slate-100 border w-fit p-2"
        >
            {currentTheme === 'light' ? (<MdDarkMode />) : (<MdLightMode className="text-gray" />)}
        </Button>
    )
}

export default ThemeToggle;