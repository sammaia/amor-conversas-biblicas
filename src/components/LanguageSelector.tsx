
import { useLanguage, Language } from "@/context/LanguageContext";
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "pt", label: t("portuguese") },
    { code: "en", label: t("english") },
    { code: "es", label: t("spanish") },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-3 text-slate-700 hover:bg-sky-50">
          <Globe className="h-4 w-4 mr-2" />
          <span className="font-medium">{t("languages")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" align="end">
        <div className="space-y-0.5">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${
                language === lang.code ? "bg-sky-50 text-sky-700" : "hover:bg-slate-50"
              }`}
              onClick={() => setLanguage(lang.code)}
              whileHover={{ backgroundColor: language === lang.code ? "rgba(186, 230, 253, 0.7)" : "rgba(241, 245, 249, 0.8)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {lang.label}
              {language === lang.code && <Check className="h-4 w-4" />}
            </motion.button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
