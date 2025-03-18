import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Conversation, Folder, Message } from "@/types/chat";
import { 
  initializeNewConversation, 
  saveConversationsToLocalStorage,
  saveFoldersToLocalStorage,
  getConversationsFromLocalStorage,
  getFoldersFromLocalStorage
} from "./utils";
import { supabase } from "@/integrations/supabase/client";

export const useChatContext = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to load conversations and folders
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (user) {
        console.log("Loading user data from Supabase");
        try {
          // Get conversations from Supabase
          const { data: conversationsData, error: conversationsError } = await supabase
            .from('conversations')
            .select('*')
            .order('updated_at', { ascending: false });

          if (conversationsError) throw conversationsError;

          if (conversationsData && conversationsData.length > 0) {
            const fullConversations = await Promise.all(
              conversationsData.map(async (conv) => {
                // Get messages for each conversation
                const { data: messagesData, error: messagesError } = await supabase
                  .from('messages')
                  .select('*')
                  .eq('conversation_id', conv.id)
                  .order('timestamp', { ascending: true });

                if (messagesError) throw messagesError;

                return {
                  id: conv.id,
                  title: conv.title,
                  messages: messagesData ? messagesData.map(msg => ({
                    id: msg.id,
                    text: msg.text,
                    sender: msg.sender,
                    timestamp: new Date(msg.timestamp).getTime(),
                    favorite: msg.favorite || false
                  })) : [],
                  createdAt: new Date(conv.created_at).getTime(),
                  updatedAt: new Date(conv.updated_at).getTime()
                };
              })
            );

            setConversations(fullConversations);
            setCurrentConversation(fullConversations[0]);
          } else {
            // Create a new conversation if none exists
            const newConv = initializeNewConversation();
            await createConversationInDatabase(newConv);
            setCurrentConversation(newConv);
            setConversations([newConv]);
          }

          // Load folders from localStorage (will be migrated to Supabase in the future)
          const parsedFolders = getFoldersFromLocalStorage(user.id);
          if (parsedFolders.length > 0) {
            setFolders(parsedFolders);
          }
        } catch (error) {
          console.error("Error loading data from Supabase:", error);
          // Fallback to localStorage
          loadFromLocalStorage(user.id);
        }
      } else {
        console.log("No user, creating new conversation");
        // For guest users, we'll continue using localStorage
        loadFromLocalStorage();
      }
      
      setInitialized(true);
      setIsLoading(false);
    };

    const loadFromLocalStorage = (userId?: string) => {
      const parsedConversations = getConversationsFromLocalStorage(userId);
      
      if (parsedConversations.length > 0) {
        setConversations(parsedConversations);
        // Always select the first conversation as the current one
        setCurrentConversation(parsedConversations[0]);
      } else {
        const newConv = initializeNewConversation();
        setCurrentConversation(newConv);
        setConversations([newConv]);
      }
      
      const parsedFolders = getFoldersFromLocalStorage(userId);
      if (parsedFolders.length > 0) {
        setFolders(parsedFolders);
      }
    };

    loadData();
  }, [user]);

  // Save folders to localStorage whenever they change
  useEffect(() => {
    if (initialized) {
      saveFoldersToLocalStorage(folders, user?.id);
    }
  }, [folders, user, initialized]);

  // Function to create a conversation in the database
  const createConversationInDatabase = async (conversation: Conversation) => {
    if (!user) {
      console.log("No user, saving to localStorage only");
      return;
    }

    try {
      // Insert conversation
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .insert({
          id: conversation.id,
          title: conversation.title,
          user_id: user.id,
          created_at: new Date(conversation.createdAt).toISOString(),
          updated_at: new Date(conversation.updatedAt).toISOString()
        })
        .select()
        .single();

      if (convError) throw convError;

      // Insert messages
      if (conversation.messages.length > 0) {
        const messagesForDb = conversation.messages.map(msg => ({
          conversation_id: conversation.id,
          text: msg.text,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp).toISOString(),
          favorite: msg.favorite || false,
          role: msg.sender === "user" ? "user" : "assistant"
        }));

        const { error: msgError } = await supabase
          .from('messages')
          .insert(messagesForDb);

        if (msgError) throw msgError;
      }

      console.log("Conversation created in database:", convData);
    } catch (error) {
      console.error("Error creating conversation in database:", error);
      // Fall back to localStorage
      saveConversationsToLocalStorage(conversations, user.id);
    }
  };

  // Function to update a conversation in the database
  const updateConversationInDatabase = async (conversation: Conversation) => {
    if (!user) {
      console.log("No user, saving to localStorage only");
      return;
    }

    try {
      // Update conversation record
      const { error: convError } = await supabase
        .from('conversations')
        .update({
          title: conversation.title,
          updated_at: new Date(conversation.updatedAt).toISOString()
        })
        .eq('id', conversation.id);

      if (convError) throw convError;
      console.log("Conversation updated in database");
    } catch (error) {
      console.error("Error updating conversation in database:", error);
      // Fall back to localStorage
      saveConversationsToLocalStorage(conversations, user.id);
    }
  };

  // Function to add a message to the database
  const addMessageToDatabase = async (message: Message, conversationId: string) => {
    if (!user) {
      console.log("No user, saving to localStorage only");
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          id: message.id,
          conversation_id: conversationId,
          text: message.text,
          sender: message.sender,
          timestamp: new Date(message.timestamp).toISOString(),
          favorite: message.favorite || false,
          role: message.sender === "user" ? "user" : "assistant"
        });

      if (error) throw error;
      console.log("Message added to database");
    } catch (error) {
      console.error("Error adding message to database:", error);
      // Fall back to localStorage
      saveConversationsToLocalStorage(conversations, user.id);
    }
  };

  const startNewConversation = async () => {
    console.log("Starting new conversation");
    const newConversation = initializeNewConversation();
    
    if (user) {
      await createConversationInDatabase(newConversation);
    }
    
    setCurrentConversation(newConversation);
    setConversations((prev) => [newConversation, ...prev]);
  };

  const addMessage = async (text: string, sender: "user" | "assistant") => {
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
      setConversations([updatedConversation]);
      
      if (user) {
        await createConversationInDatabase(updatedConversation);
      } else {
        saveConversationsToLocalStorage([updatedConversation]);
      }
      
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
    
    setConversations((prev) => {
      // Check if the current conversation already exists in the list
      const exists = prev.some(conv => conv.id === updatedConversation.id);
      
      if (exists) {
        // Update the existing conversation
        return prev.map((conv) => 
          conv.id === updatedConversation.id ? updatedConversation : conv
        );
      } else {
        // Add the new conversation to the beginning of the list
        return [updatedConversation, ...prev];
      }
    });
    
    if (user) {
      await addMessageToDatabase(newMessage, currentConversation.id);
      await updateConversationInDatabase(updatedConversation);
    } else {
      saveConversationsToLocalStorage(
        conversations.map(conv => 
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
    }
    
    console.log("Updated conversation:", updatedConversation);
  };

  const toggleFavorite = async (messageId: string) => {
    if (!currentConversation) return;
    
    const messageToUpdate = currentConversation.messages.find(m => m.id === messageId);
    if (!messageToUpdate) return;
    
    const newFavoriteValue = !messageToUpdate.favorite;
    
    const updatedMessages = currentConversation.messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, favorite: newFavoriteValue };
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
    
    // Update in database if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('messages')
          .update({ favorite: newFavoriteValue })
          .eq('id', messageId);
          
        if (error) throw error;
      } catch (error) {
        console.error("Error updating message favorite status:", error);
      }
    } else {
      saveConversationsToLocalStorage(
        conversations.map(conv => 
          conv.id === updatedConversation.id ? updatedConversation : conv
        )
      );
    }
    
    toast({
      title: newFavoriteValue ? "Added to favorites" : "Removed from favorites",
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

  const loadConversation = async (conversationId: string) => {
    if (user) {
      try {
        // Get the conversation from Supabase
        const { data: conversationData, error: convError } = await supabase
          .from('conversations')
          .select('*')
          .eq('id', conversationId)
          .single();
          
        if (convError) throw convError;
        
        // Get messages for the conversation
        const { data: messagesData, error: msgError } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('timestamp', { ascending: true });
          
        if (msgError) throw msgError;
        
        const conversation: Conversation = {
          id: conversationData.id,
          title: conversationData.title,
          messages: messagesData.map(msg => ({
            id: msg.id,
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date(msg.timestamp).getTime(),
            favorite: msg.favorite || false
          })),
          createdAt: new Date(conversationData.created_at).getTime(),
          updatedAt: new Date(conversationData.updated_at).getTime()
        };
        
        setCurrentConversation(conversation);
      } catch (error) {
        console.error("Error loading conversation from Supabase:", error);
        // Fallback to local state
        const conversation = conversations.find((conv) => conv.id === conversationId);
        if (conversation) {
          setCurrentConversation(conversation);
        }
      }
    } else {
      // For guest users, use the local state
      const conversation = conversations.find((conv) => conv.id === conversationId);
      if (conversation) {
        console.log("Loading conversation from local state:", conversation);
        setCurrentConversation(conversation);
      } else {
        console.error("Conversation not found:", conversationId);
      }
    }
  };

  return {
    currentConversation,
    conversations,
    folders,
    isLoading,
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
  };
};
