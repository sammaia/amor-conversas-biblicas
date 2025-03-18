
import { Conversation, Message, Folder } from "@/types/chat";

export const initializeNewConversation = (): Conversation => {
  console.log("Initializing new conversation");
  const timestamp = Date.now();
  return {
    id: timestamp.toString(),
    title: "New Conversation",
    messages: [
      {
        id: "welcome-" + timestamp,
        text: "Hello! How can I help you today? I'm your spiritual assistant based on Biblical teachings.",
        sender: "assistant",
        timestamp: timestamp,
      },
    ],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const saveConversationsToLocalStorage = (
  conversations: Conversation[],
  userId?: string
) => {
  try {
    const key = userId ? `conversations-${userId}` : "conversations-guest";
    localStorage.setItem(key, JSON.stringify(conversations));
    console.log("Saved conversations to localStorage:", key, conversations.length);
  } catch (error) {
    console.error("Error saving conversations to localStorage:", error);
  }
};

export const saveFoldersToLocalStorage = (
  folders: Folder[],
  userId?: string
) => {
  try {
    if (folders.length > 0) {
      const key = userId ? `folders-${userId}` : "folders-guest";
      localStorage.setItem(key, JSON.stringify(folders));
      console.log("Saved folders to localStorage:", key, folders.length);
    }
  } catch (error) {
    console.error("Error saving folders to localStorage:", error);
  }
};

export const getConversationsFromLocalStorage = (userId?: string): Conversation[] => {
  try {
    const key = userId ? `conversations-${userId}` : "conversations-guest";
    const storedConversations = localStorage.getItem(key);
    
    if (!storedConversations) {
      console.log("No conversations found in localStorage for key:", key);
      return [];
    }
    
    const parsedConversations = JSON.parse(storedConversations) as Conversation[];
    console.log("Loaded conversations from localStorage:", key, parsedConversations.length);
    return parsedConversations;
  } catch (error) {
    console.error("Error parsing stored conversations:", error);
    return [];
  }
};

export const getFoldersFromLocalStorage = (userId?: string): Folder[] => {
  try {
    const key = userId ? `folders-${userId}` : "folders-guest";
    const storedFolders = localStorage.getItem(key);
    
    if (!storedFolders) {
      console.log("No folders found in localStorage for key:", key);
      return [];
    }
    
    const parsedFolders = JSON.parse(storedFolders) as Folder[];
    console.log("Loaded folders from localStorage:", key, parsedFolders.length);
    return parsedFolders;
  } catch (error) {
    console.error("Error parsing stored folders:", error);
    return [];
  }
};
