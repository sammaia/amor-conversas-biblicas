
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Star, StarOff, FolderPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Message } from "@/types/chat";
import FolderSelector from "@/components/FolderSelector";

const Chat = () => {
  const { t, language } = useLanguage();
  const { 
    currentConversation, 
    addMessage, 
    toggleFavorite,
  } = useChat();
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFolderSelector, setShowFolderSelector] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    addMessage(input.trim(), "user");
    setInput("");
    setIsSubmitting(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      // This is a placeholder. In a real app, you would call an API for the response.
      const botResponses = [
        "A fé é a certeza das coisas que se esperam, e a prova das coisas que não se veem. (Hebreus 11:1)",
        "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça. (Isaías 41:10)",
        "Muitos são os planos no coração do homem, mas é o propósito do Senhor que permanece. (Provérbios 19:21)",
        "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei? (Salmos 27:1)",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      addMessage(randomResponse, "assistant");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFavoriteClick = (messageId: string) => {
    toggleFavorite(messageId);
  };

  const handleAddToFolder = (messageId: string) => {
    setSelectedMessageId(messageId);
    setShowFolderSelector(true);
  };

  const messages = currentConversation?.messages || [];

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto my-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <Card className="bg-white bg-opacity-95 backdrop-blur-md border border-sky-100 shadow-sm overflow-hidden">
        <CardHeader className="pb-2 pt-6 bg-gradient-to-r from-sky-50 to-white">
          <CardTitle className="text-xl text-center text-sky-700 font-serif">
            {t("chat")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] overflow-y-auto p-4 bg-white bg-opacity-70 scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } mb-4 group`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-sky-500 text-white rounded-tr-none"
                          : "bg-slate-100 text-slate-800 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm sm:text-base">{message.text}</p>
                    </div>
                    
                    <div className={`absolute top-2 ${message.sender === "user" ? "left-0 -translate-x-full -ml-2" : "right-0 translate-x-full mr-2"} opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full text-amber-500 hover:text-amber-600"
                        onClick={() => handleFavoriteClick(message.id)}
                      >
                        {message.favorite ? (
                          <StarOff className="h-3.5 w-3.5" />
                        ) : (
                          <Star className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      
                      {message.favorite && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full text-sky-500 hover:text-sky-600"
                            >
                              <FolderPlus className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => handleAddToFolder(message.id)}>
                              {t("addToFolder")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-sky-100 bg-white">
            <div className="flex gap-2">
              <Textarea
                placeholder={t("chatPlaceholder")}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="min-h-[60px] resize-none border-sky-100 focus-visible:ring-sky-500"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-sky-500 hover:bg-sky-600 text-white transition-colors duration-300"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">{t("send")}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {showFolderSelector && selectedMessageId && (
        <FolderSelector
          messageId={selectedMessageId}
          onClose={() => {
            setShowFolderSelector(false);
            setSelectedMessageId(null);
          }}
        />
      )}
    </motion.div>
  );
};

export default Chat;
