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

  const initializeNewConversation = () => {
    console.log("Initializing new conversation");
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [
        {
          id: "welcome",
          text: "Hello! How can I help you today? I'm your spiritual assistant based on Biblical teachings.",
          sender: "assistant",
          timestamp: Date.now(),
        },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setCurrentConversation(newConversation);
    setConversations((prev) => [newConversation, ...prev]);
    
    // Also save to localStorage
    if (user) {
      const updatedConversations = [newConversation, ...conversations];
      localStorage.setItem(`conversations-${user.id}`, JSON.stringify(updatedConversations));
    }
    
    return newConversation;
  };

  // Effect to load conversations and folders from localStorage
  useEffect(() => {
    if (user) {
      console.log("Loading user data");
      const storedConversations = localStorage.getItem(`conversations-${user.id}`);
      const storedFolders = localStorage.getItem(`folders-${user.id}`);
      
      if (storedConversations) {
        try {
          const parsedConversations = JSON.parse(storedConversations);
          setConversations(parsedConversations);
          
          if (parsedConversations.length > 0) {
            setCurrentConversation(parsedConversations[0]);
          } else {
            initializeNewConversation();
          }
        } catch (error) {
          console.error("Error parsing stored conversations:", error);
          initializeNewConversation();
        }
      } else {
        initializeNewConversation();
      }
      
      if (storedFolders) {
        try {
          setFolders(JSON.parse(storedFolders));
        } catch (error) {
          console.error("Error parsing stored folders:", error);
          setFolders([]);
        }
      }
    } else {
      console.log("No user, creating new conversation");
      setConversations([]);
      setFolders([]);
      initializeNewConversation();
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
    console.log("Starting new conversation");
    const newConversation = initializeNewConversation();
  };

  const addMessage = (text: string, sender: "user" | "assistant") => {
    console.log("Adding message:", { text, sender });
    
    if (!currentConversation) {
      console.log("No current conversation, creating one");
      const newConv = initializeNewConversation();
      
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender,
        timestamp: Date.now(),
      };
      
      const updatedMessages = [...newConv.messages, newMessage];
      const updatedConversation = {
        ...newConv,
        messages: updatedMessages,
        updatedAt: Date.now(),
      };
      
      setCurrentConversation(updatedConversation);
      setConversations((prev) => 
        prev.map((conv) => 
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
      
      return;
    }
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: Date.now(),
    };
    
    const updatedMessages = [...currentConversation.messages, newMessage];
    const updatedConversation = {
      ...currentConversation,
      messages: updatedMessages,
      updatedAt: Date.now(),
    };
    
    setCurrentConversation(updatedConversation);
    
    setConversations((prev) => 
      prev.map((conv) => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );
    
    console.log("Updated conversation:", updatedConversation);
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
        ? "Added to favorites"
        : "Removed from favorites",
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
      title: "Folder created",
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
      title: "Folder renamed",
      description: newName,
    });
  };

  const deleteFolder = (folderId: string) => {
    const folderToDelete = folders.find(f => f.id === folderId);
    
    if (!folderToDelete) return;
    
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    
    toast({
      title: "Folder deleted",
      description: folderToDelete.name,
    });
  };

  const addMessageToFolder = (messageId: string, folderId: string) => {
    const folder = folders.find((f) => f.id === folderId);
    
    if (!folder) return;
    
    if (folder.messageIds.includes(messageId)) {
      toast({
        title: "Message already in folder",
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
      title: "Added to folder",
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
      title: "Removed from folder",
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
