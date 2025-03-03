
import { useLanguage } from "@/context/LanguageContext";
import { getDailyVerse } from "@/data/verses";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DailyVerse = () => {
  const { language, t } = useLanguage();
  const verse = getDailyVerse();
  
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <Card className="bg-white bg-opacity-90 backdrop-blur-md border border-sky-100 shadow-sm overflow-hidden">
        <CardHeader className="pb-2 pt-6 bg-gradient-to-r from-sky-50 to-white">
          <CardTitle className="text-xl text-center text-sky-700 font-serif">
            {t("todaysVerse")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <motion.blockquote 
            className="text-lg sm:text-xl text-slate-700 font-serif italic text-center px-4 py-2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <span className="absolute -top-4 left-0 text-5xl text-sky-100">"</span>
            <span className="relative z-10">{verse.text[language]}</span>
            <span className="absolute -bottom-8 right-0 text-5xl text-sky-100">"</span>
          </motion.blockquote>
          <motion.p 
            className="text-sm text-right mt-4 mr-8 text-sky-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            — {verse.reference[language]}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DailyVerse;
