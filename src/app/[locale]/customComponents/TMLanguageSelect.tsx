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
import { usePathname, useRouter } from "@/i18n/routing";

interface LanguageType {
    className?: string | undefined;
}

const TMLanguageSelect = ({className}: LanguageType) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    localStorage.setItem("language", lang);
    router.push(pathName, { locale: lang });
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
