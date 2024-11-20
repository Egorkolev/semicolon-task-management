"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { usePathname as pathNav } from "next/navigation";


interface LanguageType {
    className?: string | undefined;
}

const TMLanguageSelect = ({className}: LanguageType) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
    const pathName = usePathname();
    const router = useRouter();
    const path = pathNav();
    

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            if (path && !path.startsWith("/" + storedLanguage)) {
                router.push(pathName, { locale: storedLanguage });  
                setSelectedLanguage(storedLanguage)
            } 
            setSelectedLanguage(storedLanguage)
        } else {
            router.push(pathName, { locale: selectedLanguage }); 
            localStorage.setItem("language", selectedLanguage);
        }
    }, []);

    const handleLanguageChange = (lang: string) => {
        localStorage.setItem("language", lang);
        router.push(pathName, { locale: lang });
        setSelectedLanguage(lang);
    };

    return (
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className={`w-[180px] max-h-[34px] ${className}`}>
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem value="uk">🇺🇦 Українська</SelectItem>
                <SelectItem value="en">🏴󠁧󠁢󠁥󠁮󠁧󠁿 English</SelectItem>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
                <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default TMLanguageSelect;
