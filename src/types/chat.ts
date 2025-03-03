
export interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: number;
  favorite?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface Folder {
  id: string;
  name: string;
  messageIds: string[];
  createdAt: number;
}
