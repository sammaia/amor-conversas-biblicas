
import React, { createContext, useContext, ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChatContextType } from "./types";
import { useChatContext } from "./useChatContext";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useLanguage();
  const chatContextValues = useChatContext();

  return (
    <ChatContext.Provider value={chatContextValues}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  
  return context;
};
