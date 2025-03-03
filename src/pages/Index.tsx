
import Header from "@/components/Header";
import DailyVerse from "@/components/DailyVerse";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { motion } from "framer-motion";

// Install framer-motion for animations
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
        <Header />
        
        <motion.main 
          className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-full text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-sky-700 mb-4">
              Deus é Amor
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              Sua jornada de fé e conexão espiritual em um só lugar
            </p>
          </motion.div>
          
          <DailyVerse />
          <Chat />
        </motion.main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
