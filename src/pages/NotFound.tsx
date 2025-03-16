
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-8xl font-bold mb-2 text-sky-700 font-serif"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>
          <motion.div
            className="w-16 h-1 bg-sky-400 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.p 
            className="text-xl text-slate-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {language === "pt" ? "Página não encontrada" : "Page not found"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild className="bg-sky-500 hover:bg-sky-600 transition-colors duration-300 shadow-md hover:shadow-lg">
              <Link to="/" className="inline-flex items-center">
                <Home className="mr-2 h-4 w-4" />
                {t("backToHome")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
