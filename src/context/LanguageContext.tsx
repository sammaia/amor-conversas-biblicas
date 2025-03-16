
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

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
interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
  };
}

// Traduções disponíveis
const translations: Translations = {
  welcomeMessage: {
    pt: "Bem-vindo(a) ao Deus é Amor!",
    en: "Welcome to God is Love!",
    es: "¡Bienvenido(a) a Dios es Amor!"
  },
  appDescription: {
    pt: "Um espaço de fé e esperança para o seu dia a dia.",
    en: "A space of faith and hope for your daily life.",
    es: "Un espacio de fe y esperanza para tu vida diaria."
  },
  startChat: {
    pt: "Começar Chat",
    en: "Start Chat",
    es: "Comenzar Chat"
  },
  readingPlan: {
    pt: "Plano de Leitura",
    en: "Reading Plan",
    es: "Plan de Lectura"
  },
  chat: {
    pt: "Chat",
    en: "Chat",
    es: "Chat"
  },
  send: {
    pt: "Enviar",
    en: "Send",
    es: "Enviar"
  },
  chatPlaceholder: {
    pt: "Escreva sua mensagem...",
    en: "Write your message...",
    es: "Escribe tu mensaje..."
  },
  todaysVerse: {
    pt: "Versículo do Dia",
    en: "Today's Verse",
    es: "Versículo del Día"
  },
  verseLoadError: {
    pt: "Erro ao carregar o versículo do dia.",
    en: "Error loading the verse of the day.",
    es: "Error al cargar el versículo del día."
  },
  verseUnavailable: {
    pt: "Versículo do dia não disponível no momento.",
    en: "Verse of the day not available at the moment.",
    es: "Versículo del día no disponible en este momento."
  },
  reflectionTitle: {
    pt: "Reflexão",
    en: "Reflection",
    es: "Reflexión"
  },
  loginMessage: {
    pt: "Entre para continuar",
    en: "Login to continue",
    es: "Entra para continuar"
  },
  registerMessage: {
    pt: "Crie uma conta",
    en: "Create an account",
    es: "Crea una cuenta"
  },
  aiError: {
    pt: "Houve um erro ao processar a mensagem. Por favor, tente novamente.",
    en: "There was an error processing the message. Please try again.",
    es: "Hubo un error al procesar el mensaje. Por favor, inténtelo de nuevo."
  },
  addToFolder: {
    pt: "Adicionar à Pasta",
    en: "Add to Folder",
    es: "Añadir a la Carpeta"
  },
  noSearchResults: {
    pt: "Nenhum resultado encontrado.",
    en: "No results found.",
    es: "No se encontraron resultados."
  },
  noConversations: {
    pt: "Nenhuma conversa encontrada.",
    en: "No conversations found.",
    es: "No se encontraron conversaciones."
  },
  conversation: {
    pt: "Conversa",
    en: "Conversation",
    es: "Conversación"
  },
  noFavorites: {
    pt: "Nenhum favorito adicionado.",
    en: "No favorites added.",
    es: "Ningún favorito añadido."
  },
  favorite: {
    pt: "Favorito",
    en: "Favorite",
    es: "Favorito"
  },
  noFolders: {
    pt: "Nenhuma pasta criada.",
    en: "No folders created.",
    es: "Ninguna carpeta creada."
  },
  conversationHistory: {
    pt: "Histórico de Conversas",
    en: "Conversation History",
    es: "Historial de Conversaciones"
  },
  manageConversations: {
    pt: "Gerenciar Conversas",
    en: "Manage Conversations",
    es: "Administrar Conversaciones"
  },
  selectFolder: {
    pt: "Selecionar Pasta",
    en: "Select Folder",
    es: "Seleccionar Carpeta"
  },
  newFolder: {
    pt: "Nova Pasta",
    en: "New Folder",
    es: "Nueva Carpeta"
  },
  footerText: {
    pt: "Deus é Amor - Todos os direitos reservados.",
    en: "God is Love - All rights reserved.",
    es: "Dios es Amor - Todos los derechos reservados."
  },
  account: {
    pt: "Conta",
    en: "Account",
    es: "Cuenta"
  },
  loggingIn: {
    pt: "Entrando...",
    en: "Logging in...",
    es: "Iniciando sesión..."
  },
  dontHaveAccount: {
    pt: "Não tem uma conta?",
    en: "Don't have an account?",
    es: "¿No tienes una cuenta?"
  },
  backToHome: {
    pt: "Voltar para o Início",
    en: "Back to Home",
    es: "Volver al Inicio"
  },
  passwordsDoNotMatch: {
    pt: "As senhas não coincidem.",
    en: "Passwords do not match.",
    es: "Las contraseñas no coinciden."
  },
  passwordTooShort: {
    pt: "A senha deve ter pelo menos 6 caracteres.",
    en: "Password must be at least 6 characters.",
    es: "La contraseña debe tener al menos 6 caracteres."
  },
  name: {
    pt: "Nome",
    en: "Name",
    es: "Nombre"
  },
  namePlaceholder: {
    pt: "Seu nome",
    en: "Your name",
    es: "Tu nombre"
  },
  registering: {
    pt: "Registrando...",
    en: "Registering...",
    es: "Registrando..."
  },
  alreadyHaveAccount: {
    pt: "Já tem uma conta?",
    en: "Already have an account?",
    es: "¿Ya tienes una cuenta?"
  },
  apiKeyRequired: {
    pt: "Por favor, configure sua chave API da OpenAI para continuar a conversa.",
    en: "Please configure your OpenAI API key to continue the conversation.",
    es: "Por favor, configure su clave API de OpenAI para continuar la conversación."
  },
  apiKeyMissing: {
    pt: "Chave API não encontrada. Configure nas configurações.",
    en: "API key not found. Configure in settings.",
    es: "Clave API no encontrada. Configure en ajustes."
  },
  // New translations for missing keys
  appName: {
    pt: "Deus é Amor",
    en: "God is Love",
    es: "Dios es Amor"
  },
  history: {
    pt: "Histórico",
    en: "History",
    es: "Historial"
  },
  login: {
    pt: "Entrar",
    en: "Login",
    es: "Iniciar sesión"
  },
  email: {
    pt: "E-mail",
    en: "Email",
    es: "Correo electrónico"
  },
  password: {
    pt: "Senha",
    en: "Password",
    es: "Contraseña"
  },
  forgotPassword: {
    pt: "Esqueceu a senha?",
    en: "Forgot password?",
    es: "¿Olvidó su contraseña?"
  },
  register: {
    pt: "Registrar",
    en: "Register",
    es: "Registrarse"
  },
  confirmPassword: {
    pt: "Confirmar Senha",
    en: "Confirm Password",
    es: "Confirmar Contraseña"
  },
  profile: {
    pt: "Perfil",
    en: "Profile",
    es: "Perfil"
  },
  logout: {
    pt: "Sair",
    en: "Logout",
    es: "Cerrar sesión"
  },
  newConversation: {
    pt: "Nova Conversa",
    en: "New Conversation",
    es: "Nueva Conversación"
  },
  chatWelcome: {
    pt: "Olá! Como posso ajudá-lo hoje com base nos ensinamentos da Bíblia?",
    en: "Hello! How can I help you today based on Bible teachings?",
    es: "¡Hola! ¿Cómo puedo ayudarte hoy basándome en las enseñanzas de la Biblia?"
  },
  addedToFavorites: {
    pt: "Adicionado aos favoritos",
    en: "Added to favorites",
    es: "Añadido a favoritos"
  },
  removedFromFavorites: {
    pt: "Removido dos favoritos",
    en: "Removed from favorites",
    es: "Eliminado de favoritos"
  },
  folderCreated: {
    pt: "Pasta criada com sucesso",
    en: "Folder created successfully",
    es: "Carpeta creada con éxito"
  },
  folderRenamed: {
    pt: "Pasta renomeada com sucesso",
    en: "Folder renamed successfully",
    es: "Carpeta renombrada con éxito"
  },
  folderDeleted: {
    pt: "Pasta excluída com sucesso",
    en: "Folder deleted successfully",
    es: "Carpeta eliminada con éxito"
  },
  messageAlreadyInFolder: {
    pt: "Mensagem já está nesta pasta",
    en: "Message is already in this folder",
    es: "El mensaje ya está en esta carpeta"
  },
  addedToFolder: {
    pt: "Adicionado à pasta",
    en: "Added to folder",
    es: "Añadido a la carpeta"
  },
  removedFromFolder: {
    pt: "Removido da pasta",
    en: "Removed from folder",
    es: "Eliminado de la carpeta"
  },
  search: {
    pt: "Pesquisar",
    en: "Search",
    es: "Buscar"
  },
  favorites: {
    pt: "Favoritos",
    en: "Favorites",
    es: "Favoritos"
  },
  folders: {
    pt: "Pastas",
    en: "Folders",
    es: "Carpetas"
  },
  folderName: {
    pt: "Nome da pasta",
    en: "Folder name",
    es: "Nombre de la carpeta"
  },
  save: {
    pt: "Salvar",
    en: "Save",
    es: "Guardar"
  },
  cancel: {
    pt: "Cancelar",
    en: "Cancel",
    es: "Cancelar"
  },
  back: {
    pt: "Voltar",
    en: "Back",
    es: "Volver"
  },
  emptyFolder: {
    pt: "Pasta vazia",
    en: "Empty folder",
    es: "Carpeta vacía"
  }
};

interface LanguageContextProps {
  language: string;
  t: (key: TranslationKey) => string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState("pt"); // Default to Portuguese

  const changeLanguage = useCallback((lang: string) => {
    setLanguage(lang);
  }, []);

  const t = (key: TranslationKey): string => {
    const translation = translations[key];
    if (!translation) {
      return `Missing translation for ${key}`;
    }
    
    return translation[language as "pt" | "en" | "es"] || translation["en"] || `Missing translation for ${key} in ${language}`;
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
