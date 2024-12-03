import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme();
    const storageTheme = localStorage.getItem('theme');
    return (
        <Button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-800 border-white dark:border-gray hover:bg-slate-800 dark:hover:bg-slate-100 border w-fit p-2"
        >
            {theme === 'light' || storageTheme === 'light' ? <MdDarkMode /> : <MdLightMode className="text-gray" />}
        </Button>
    )
}

export default ThemeToggle;