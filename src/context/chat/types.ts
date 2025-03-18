
import { Conversation, Folder, Message } from "@/types/chat";

export interface ChatContextType {
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
