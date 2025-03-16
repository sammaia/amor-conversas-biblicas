
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SupportedLanguage = "pt" | "en";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const languages = [
    { code: "pt", name: "Português" },
    { code: "en", name: "English" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-sky-50 hover:text-sky-700 transition-colors">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block font-medium">
            {language === "pt" ? "Português" : "English"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-40 border-sky-100">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as SupportedLanguage)}
            className={`${
              language === lang.code 
                ? "bg-sky-50 text-sky-700 font-medium" 
                : "hover:bg-sky-50 hover:text-sky-700"
            } cursor-pointer transition-colors`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
