
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import i18n from '../i18n';

// Tipo para as chaves de tradução disponíveis
export type TranslationKey = 
  | "welcomeMessage"
  | "appDescription"
  | "startChat"
  | "readingPlan"
  | "chat"
  | "send"
  | "chatPlaceholder"
  | "todaysVerse"
  | "verseLoadError"
  | "verseUnavailable"
  | "reflectionTitle"
  | "loginMessage"
  | "registerMessage"
  | "aiError"
  | "addToFolder"
  | "noSearchResults"
  | "noConversations"
  | "conversation"
  | "noFavorites"
  | "favorite"
  | "noFolders"
  | "conversationHistory"
  | "manageConversations"
  | "selectFolder"
  | "newFolder"
  | "footerText"
  | "account"
  | "loggingIn"
  | "dontHaveAccount"
  | "backToHome"
  | "passwordsDoNotMatch"
  | "passwordTooShort"
  | "name"
  | "namePlaceholder"
  | "registering"
  | "alreadyHaveAccount"
  | "apiKeyRequired"
  | "apiKeyMissing"
  | "appName"
  | "history"
  | "login"
  | "email"
  | "password"
  | "forgotPassword"
  | "register"
  | "confirmPassword"
  | "profile"
  | "logout"
  | "newConversation"
  | "chatWelcome"
  | "addedToFavorites"
  | "removedFromFavorites"
  | "folderCreated"
  | "folderRenamed"
  | "folderDeleted"
  | "messageAlreadyInFolder"
  | "addedToFolder"
  | "removedFromFolder"
  | "search"
  | "favorites"
  | "folders"
  | "folderName"
  | "save"
  | "cancel"
  | "back"
  | "emptyFolder";

// Tipo para as traduções
type TranslationLanguages = {
  pt: string;
  en: string;
};

// Interface para o objeto de traduções
interface Translations {
  [key: string]: TranslationLanguages;
}

// Traduções disponíveis
const translations: Translations = {
  welcomeMessage: {
    pt: "Bem-vindo(a) ao Deus é Amor!",
    en: "Welcome to God is Love!"
  },
  appDescription: {
    pt: "Um espaço de fé e esperança para o seu dia a dia.",
    en: "A space of faith and hope for your daily life."
  },
  startChat: {
    pt: "Começar Chat",
    en: "Start Chat"
  },
  readingPlan: {
    pt: "Plano de Leitura",
    en: "Reading Plan"
  },
  chat: {
    pt: "Chat",
    en: "Chat"
  },
  send: {
    pt: "Enviar",
    en: "Send"
  },
  chatPlaceholder: {
    pt: "Escreva sua mensagem...",
    en: "Write your message..."
  },
  todaysVerse: {
    pt: "Versículo do Dia",
    en: "Today's Verse"
  },
  verseLoadError: {
    pt: "Erro ao carregar o versículo do dia.",
    en: "Error loading the verse of the day."
  },
  verseUnavailable: {
    pt: "Versículo do dia não disponível no momento.",
    en: "Verse of the day not available at the moment."
  },
  reflectionTitle: {
    pt: "Reflexão",
    en: "Reflection"
  },
  loginMessage: {
    pt: "Entre para continuar",
    en: "Login to continue"
  },
  registerMessage: {
    pt: "Crie uma conta",
    en: "Create an account"
  },
  aiError: {
    pt: "Houve um erro ao processar a mensagem. Por favor, tente novamente.",
    en: "There was an error processing the message. Please try again."
  },
  addToFolder: {
    pt: "Adicionar à Pasta",
    en: "Add to Folder"
  },
  noSearchResults: {
    pt: "Nenhum resultado encontrado.",
    en: "No results found."
  },
  noConversations: {
    pt: "Nenhuma conversa encontrada.",
    en: "No conversations found."
  },
  conversation: {
    pt: "Conversa",
    en: "Conversation"
  },
  noFavorites: {
    pt: "Nenhum favorito adicionado.",
    en: "No favorites added."
  },
  favorite: {
    pt: "Favorito",
    en: "Favorite"
  },
  noFolders: {
    pt: "Nenhuma pasta criada.",
    en: "No folders created."
  },
  conversationHistory: {
    pt: "Histórico de Conversas",
    en: "Conversation History"
  },
  manageConversations: {
    pt: "Gerenciar Conversas",
    en: "Manage Conversations"
  },
  selectFolder: {
    pt: "Selecionar Pasta",
    en: "Select Folder"
  },
  newFolder: {
    pt: "Nova Pasta",
    en: "New Folder"
  },
  footerText: {
    pt: "Deus é Amor - Todos os direitos reservados.",
    en: "God is Love - All rights reserved."
  },
  account: {
    pt: "Conta",
    en: "Account"
  },
  loggingIn: {
    pt: "Entrando...",
    en: "Logging in..."
  },
  dontHaveAccount: {
    pt: "Não tem uma conta?",
    en: "Don't have an account?"
  },
  backToHome: {
    pt: "Voltar para o Início",
    en: "Back to Home"
  },
  passwordsDoNotMatch: {
    pt: "As senhas não coincidem.",
    en: "Passwords do not match."
  },
  passwordTooShort: {
    pt: "A senha deve ter pelo menos 6 caracteres.",
    en: "Password must be at least 6 characters."
  },
  name: {
    pt: "Nome",
    en: "Name"
  },
  namePlaceholder: {
    pt: "Seu nome",
    en: "Your name"
  },
  registering: {
    pt: "Registrando...",
    en: "Registering..."
  },
  alreadyHaveAccount: {
    pt: "Já tem uma conta?",
    en: "Already have an account?"
  },
  apiKeyRequired: {
    pt: "Por favor, configure sua chave API da OpenAI para continuar a conversa.",
    en: "Please configure your OpenAI API key to continue the conversation."
  },
  apiKeyMissing: {
    pt: "Chave API não encontrada. Configure nas configurações.",
    en: "API key not found. Configure in settings."
  },
  appName: {
    pt: "Deus é Amor",
    en: "God is Love"
  },
  history: {
    pt: "Histórico",
    en: "History"
  },
  login: {
    pt: "Entrar",
    en: "Login"
  },
  email: {
    pt: "E-mail",
    en: "Email"
  },
  password: {
    pt: "Senha",
    en: "Password"
  },
  forgotPassword: {
    pt: "Esqueceu a senha?",
    en: "Forgot password?"
  },
  register: {
    pt: "Registrar",
    en: "Register"
  },
  confirmPassword: {
    pt: "Confirmar Senha",
    en: "Confirm Password"
  },
  profile: {
    pt: "Perfil",
    en: "Profile"
  },
  logout: {
    pt: "Sair",
    en: "Logout"
  },
  newConversation: {
    pt: "Nova Conversa",
    en: "New Conversation"
  },
  chatWelcome: {
    pt: "Olá! Como posso ajudá-lo hoje com base nos ensinamentos da Bíblia?",
    en: "Hello! How can I help you today based on Bible teachings?"
  },
  addedToFavorites: {
    pt: "Adicionado aos favoritos",
    en: "Added to favorites"
  },
  removedFromFavorites: {
    pt: "Removido dos favoritos",
    en: "Removed from favorites"
  },
  folderCreated: {
    pt: "Pasta criada com sucesso",
    en: "Folder created successfully"
  },
  folderRenamed: {
    pt: "Pasta renomeada com sucesso",
    en: "Folder renamed successfully"
  },
  folderDeleted: {
    pt: "Pasta excluída com sucesso",
    en: "Folder deleted successfully"
  },
  messageAlreadyInFolder: {
    pt: "Mensagem já está nesta pasta",
    en: "Message is already in this folder"
  },
  addedToFolder: {
    pt: "Adicionado à pasta",
    en: "Added to folder"
  },
  removedFromFolder: {
    pt: "Removido da pasta",
    en: "Removed from folder"
  },
  search: {
    pt: "Pesquisar",
    en: "Search"
  },
  favorites: {
    pt: "Favoritos",
    en: "Favorites"
  },
  folders: {
    pt: "Pastas",
    en: "Folders"
  },
  folderName: {
    pt: "Nome da pasta",
    en: "Folder name"
  },
  save: {
    pt: "Salvar",
    en: "Save"
  },
  cancel: {
    pt: "Cancelar",
    en: "Cancel"
  },
  back: {
    pt: "Voltar",
    en: "Back"
  },
  emptyFolder: {
    pt: "Pasta vazia",
    en: "Empty folder"
  }
};

interface LanguageContextProps {
  language: string;
  t: (key: TranslationKey) => string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language on mount
  const [language, setLanguage] = useState(() => i18n.init());

  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }, []);

  // Function to get translation
  const t = (key: TranslationKey): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    
    return translation[language as keyof TranslationLanguages] || translation["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
