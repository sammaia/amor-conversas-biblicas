import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/chat";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Star, StarOff, FolderPlus, Key, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FolderSelector from "@/components/FolderSelector";
import { sendMessageToOpenAI, isApiKeyConfigured, saveApiKey } from "@/services/openAIService";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const { t, language } = useLanguage();
  const { 
    currentConversation, 
    addMessage, 
    toggleFavorite,
    startNewConversation
  } = useChat();
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFolderSelector, setShowFolderSelector] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  useEffect(() => {
    if (!isApiKeyConfigured()) {
      setShowApiKeyDialog(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    if (!isApiKeyConfigured()) {
      setShowApiKeyDialog(true);
      return;
    }

    const userMessage = input.trim();
    addMessage(userMessage, "user");
    setInput("");
    setIsSubmitting(true);

    try {
      const botResponse = await sendMessageToOpenAI(userMessage, language);
      addMessage(botResponse, "assistant");
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      addMessage(t("aiError"), "assistant");
    } finally {
      setIsSubmitting(false);
    }
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

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setShowApiKeyDialog(false);
      toast({
        title: "API Key Saved",
        description: "Your API key has been stored locally.",
      });
    } else {
      toast({
        title: "API Key Error",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
    }
  };

  const handleConfigureApiKey = () => {
    setShowApiKeyDialog(true);
  };

  const handleNewChat = () => {
    startNewConversation();
    toast({
      title: "New chat started",
      duration: 2000
    });
  };

  const messages = currentConversation?.messages || [];

  console.log("Current conversation:", currentConversation);
  console.log("Messages:", messages);

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto my-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <Card className="bg-white bg-opacity-95 backdrop-blur-md border border-sky-100 shadow-sm overflow-hidden">
        <CardHeader className="pb-2 pt-6 bg-gradient-to-r from-sky-50 to-white flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-center text-sky-700 font-serif">
            {t("chat")}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewChat}
              className="text-sky-600 border-sky-200 hover:bg-sky-50"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              New Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleConfigureApiKey}
              className="text-sky-600 border-sky-200 hover:bg-sky-50"
            >
              <Key className="h-4 w-4 mr-1" />
              API Key
            </Button>
          </div>
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
                      className={`max-w-xs sm:max-w-md p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-sky-500 text-white rounded-tr-none"
                          : "bg-slate-100 text-slate-800 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm sm:text-base whitespace-pre-wrap">{message.text}</p>
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
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
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

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configure OpenAI API Key</DialogTitle>
            <DialogDescription>
              Enter your OpenAI API key to enable the chat functionality.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-slate-500">
                Get your API key at: 
                <a 
                  href="https://platform.openai.com/api-keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline ml-1"
                >
                  platform.openai.com/api-keys
                </a>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveApiKey}>
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Chat;
