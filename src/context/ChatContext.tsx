
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Message, Conversation, Folder } from "@/types/chat";

interface ChatContextType {
  currentConversation: Conversation | null;
  conversations: Conversation[];
  folders: Folder[];
  startNewConversation: () => void;
  addMessage: (text: string, sender: "user" | "assistant") => void;
  toggleFavorite: (messageId: string) => void;
  getFavoritedMessages: () => Message[];
  createFolder: (name: string) => void;
  renameFolder: (folderId: string, newName: string) => void;
  deleteFolder: (folderId: string) => void;
  addMessageToFolder: (messageId: string, folderId: string) => void;
  removeMessageFromFolder: (messageId: string, folderId: string) => void;
  getMessagesInFolder: (folderId: string) => Message[];
  loadConversation: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  // Load data from localStorage when component mounts or user changes
  useEffect(() => {
    if (user) {
      const storedConversations = localStorage.getItem(`conversations-${user.id}`);
      const storedFolders = localStorage.getItem(`folders-${user.id}`);
      
      if (storedConversations) {
        setConversations(JSON.parse(storedConversations));
      }
      
      if (storedFolders) {
        setFolders(JSON.parse(storedFolders));
      }
      
      // Start a new conversation if none exists
      if (!storedConversations || JSON.parse(storedConversations).length === 0) {
        startNewConversation();
      } else {
        // Load the most recent conversation
        const sortedConversations = JSON.parse(storedConversations);
        setCurrentConversation(sortedConversations[0]);
      }
    } else {
      // Reset state when user logs out
      setConversations([]);
      setFolders([]);
      startNewConversation();
    }
  }, [user]);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (user && conversations.length > 0) {
      localStorage.setItem(`conversations-${user.id}`, JSON.stringify(conversations));
    }
  }, [conversations, user]);

  // Save folders to localStorage whenever they change
  useEffect(() => {
    if (user && folders.length > 0) {
      localStorage.setItem(`folders-${user.id}`, JSON.stringify(folders));
    }
  }, [folders, user]);

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: t("newConversation"),
      messages: [
        {
          id: "welcome",
          text: t("chatWelcome"),
          sender: "assistant",
          timestamp: Date.now(),
        },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setCurrentConversation(newConversation);
    setConversations((prev) => [newConversation, ...prev]);
  };

  const addMessage = (text: string, sender: "user" | "assistant") => {
    if (!currentConversation) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: Date.now(),
    };
    
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, newMessage],
      updatedAt: Date.now(),
    };
    
    setCurrentConversation(updatedConversation);
    
    setConversations((prev) => 
      prev.map((conv) => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );
  };

  const toggleFavorite = (messageId: string) => {
    if (!currentConversation) return;
    
    const updatedMessages = currentConversation.messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, favorite: !message.favorite };
      }
      return message;
    });
    
    const updatedConversation = {
      ...currentConversation,
      messages: updatedMessages,
    };
    
    setCurrentConversation(updatedConversation);
    
    setConversations((prev) => 
      prev.map((conv) => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );
    
    toast({
      title: updatedMessages.find(m => m.id === messageId)?.favorite 
        ? t("addedToFavorites")
        : t("removedFromFavorites"),
      duration: 1500,
    });
  };

  const getFavoritedMessages = () => {
    return conversations
      .flatMap((conv) => conv.messages)
      .filter((message) => message.favorite);
  };

  const createFolder = (name: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      messageIds: [],
      createdAt: Date.now(),
    };
    
    setFolders((prev) => [...prev, newFolder]);
    
    toast({
      title: t("folderCreated"),
      description: name,
    });
  };

  const renameFolder = (folderId: string, newName: string) => {
    setFolders((prev) => 
      prev.map((folder) => 
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
    
    toast({
      title: t("folderRenamed"),
      description: newName,
    });
  };

  const deleteFolder = (folderId: string) => {
    const folderToDelete = folders.find(f => f.id === folderId);
    
    if (!folderToDelete) return;
    
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    
    toast({
      title: t("folderDeleted"),
      description: folderToDelete.name,
    });
  };

  const addMessageToFolder = (messageId: string, folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    
    if (!folder) return;
    
    if (folder.messageIds.includes(messageId)) {
      toast({
        title: t("messageAlreadyInFolder"),
        duration: 1500,
      });
      return;
    }
    
    setFolders((prev) => 
      prev.map((f) => 
        f.id === folderId
          ? { ...f, messageIds: [...f.messageIds, messageId] }
          : f
      )
    );
    
    toast({
      title: t("addedToFolder"),
      description: folder.name,
      duration: 1500,
    });
  };

  const removeMessageFromFolder = (messageId: string, folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    
    if (!folder) return;
    
    setFolders((prev) => 
      prev.map((f) => 
        f.id === folderId
          ? { ...f, messageIds: f.messageIds.filter((id) => id !== messageId) }
          : f
      )
    );
    
    toast({
      title: t("removedFromFolder"),
      description: folder.name,
      duration: 1500,
    });
  };

  const getMessagesInFolder = (folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    
    if (!folder) return [];
    
    return conversations
      .flatMap((conv) => conv.messages)
      .filter((message) => folder.messageIds.includes(message.id));
  };

  const loadConversation = (conversationId: string) => {
    const conversation = conversations.find((conv) => conv.id === conversationId);
    
    if (conversation) {
      setCurrentConversation(conversation);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentConversation,
        conversations,
        folders,
        startNewConversation,
        addMessage,
        toggleFavorite,
        getFavoritedMessages,
        createFolder,
        renameFolder,
        deleteFolder,
        addMessageToFolder,
        removeMessageFromFolder,
        getMessagesInFolder,
        loadConversation,
      }}
    >
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
