import { useState } from "react";
import Header from "@/components/Header";
import DailyVerse from "@/components/DailyVerse";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import ConversationHistory from "@/components/ConversationHistory";
import { useLanguage } from "@/context/LanguageContext";
import { ChatProvider } from "@/context/chat";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { History, BookOpen } from "lucide-react";

const Index = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 to-white">
        <Header />

        <motion.main 
          className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-start relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute left-4 top-2 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistoryOpen(true)}
              className="bg-white/80 hover:bg-white border-sky-100 text-sky-700 shadow-sm hover:shadow transition-all"
            >
              <History className="h-4 w-4 mr-2" />
              <span>{t("history")}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 hover:bg-white border-sky-100 text-sky-700 shadow-sm hover:shadow transition-all"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span>{t("readingPlan")}</span>
            </Button>
          </div>

          <motion.div 
            className="w-full text-center mb-8 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-sky-700 mb-4 tracking-tight">
              {t("appName")}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4 leading-relaxed">
              {t("appDescription")}
            </p>
          </motion.div>

          <div className="w-full max-w-6xl mx-auto grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <DailyVerse />
            </div>
            <div className="md:col-span-3">
              <Chat />
            </div>
          </div>
        </motion.main>

        <Footer />

        <ConversationHistory 
          open={historyOpen} 
          onClose={() => setHistoryOpen(false)} 
        />
      </div>
    </ChatProvider>
  );
};

export default Index;
