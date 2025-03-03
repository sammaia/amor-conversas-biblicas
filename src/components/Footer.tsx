
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="w-full py-6 mt-auto bg-gradient-to-b from-transparent to-sky-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-2">
            {t("footerText")} &copy; {currentYear}
          </p>
          <div className="flex items-center justify-center space-x-2 mt-3">
            <motion.div 
              className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(186, 230, 253, 1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </motion.div>
            <motion.div 
              className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(186, 230, 253, 1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </motion.div>
            <motion.div 
              className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-500 cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(186, 230, 253, 1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
