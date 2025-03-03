
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { motion } from "framer-motion";

const Header = () => {
  const { t } = useLanguage();

  return (
    <motion.header 
      className="w-full py-6 px-6 sm:px-8 glass-panel rounded-b-2xl bg-opacity-95 backdrop-blur-lg shadow-sm z-10 sticky top-0 border-b border-sky-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <motion.div
            className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
          <motion.h1 
            className="text-2xl sm:text-3xl font-serif font-semibold text-sky-700 ml-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t('appName')}
          </motion.h1>
        </div>
        
        <nav className="flex items-center gap-6">
          <LanguageSelector />
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
