
import { Conversation, Message } from "@/types/chat";

export const initializeNewConversation = (): Conversation => {
  console.log("Initializing new conversation");
  return {
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
};

export const saveConversationsToLocalStorage = (
  conversations: Conversation[],
  userId?: string
) => {
  if (userId) {
    localStorage.setItem(
      `conversations-${userId}`,
      JSON.stringify(conversations)
    );
  }
};

export const saveFoldersToLocalStorage = (
  folders: any[],
  userId?: string
) => {
  if (userId && folders.length > 0) {
    localStorage.setItem(
      `folders-${userId}`,
      JSON.stringify(folders)
    );
  }
};

export const getConversationsFromLocalStorage = (userId?: string): Conversation[] => {
  if (!userId) return [];
  
  const storedConversations = localStorage.getItem(`conversations-${userId}`);
  if (!storedConversations) return [];
  
  try {
    return JSON.parse(storedConversations);
  } catch (error) {
    console.error("Error parsing stored conversations:", error);
    return [];
  }
};

export const getFoldersFromLocalStorage = (userId?: string): any[] => {
  if (!userId) return [];
  
  const storedFolders = localStorage.getItem(`folders-${userId}`);
  if (!storedFolders) return [];
  
  try {
    return JSON.parse(storedFolders);
  } catch (error) {
    console.error("Error parsing stored folders:", error);
    return [];
  }
};
