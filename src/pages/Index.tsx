
import { useState } from "react";
import Header from "@/components/Header";
import DailyVerse from "@/components/DailyVerse";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import ConversationHistory from "@/components/ConversationHistory";
import { LanguageProvider } from "@/context/LanguageContext";
import { ChatProvider } from "@/context/ChatContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  
  return (
    <LanguageProvider>
      <ChatProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
          <Header />
          
          <motion.main 
            className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center justify-start relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HistoryButton onClick={() => setHistoryOpen(true)} />
            
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
          
          <ConversationHistory 
            open={historyOpen} 
            onClose={() => setHistoryOpen(false)} 
          />
        </div>
      </ChatProvider>
    </LanguageProvider>
  );
};

// Componente de botão para abrir o histórico
const HistoryButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="absolute left-4 top-0 bg-white/80 hover:bg-white border-sky-100 text-sky-700"
    >
      <History className="h-4 w-4 mr-2" />
      <span>{t("history")}</span>
    </Button>
  );
};

export default Index;
