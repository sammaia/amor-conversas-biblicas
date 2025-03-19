
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
  | "emptyFolder"
  | "startConversation";

// Tipo para as traduções
type TranslationLanguages = {
  pt: string;
  en: string;
  es: string;
};

// Interface para o objeto de traduções
interface Translations {
  [key: string]: TranslationLanguages;
}

// Traduções disponíveis
const translations: Translations = {
  welcomeMessage: {
    pt: "Bem-vindo(a) ao Deus é Amor!",
    en: "Welcome to God is Love!",
    es: "¡Bienvenido a Dios es Amor!"
  },
  appDescription: {
    pt: "Um espaço de fé e esperança para o seu dia a dia.",
    en: "A space of faith and hope for your daily life.",
    es: "Un espacio de fe y esperanza para tu día a día."
  },
  startChat: {
    pt: "Começar Chat",
    en: "Start Chat",
    es: "Iniciar Chat"
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
    es: "Inicia sesión para continuar"
  },
  registerMessage: {
    pt: "Crie uma conta",
    en: "Create an account",
    es: "Crea una cuenta"
  },
  aiError: {
    pt: "Houve um erro ao processar a mensagem. Por favor, tente novamente.",
    en: "There was an error processing the message. Please try again.",
    es: "Hubo un error al procesar el mensaje. Por favor, inténtalo de nuevo."
  },
  addToFolder: {
    pt: "Adicionar à Pasta",
    en: "Add to Folder",
    es: "Añadir a Carpeta"
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
    es: "No hay favoritos añadidos."
  },
  favorite: {
    pt: "Favorito",
    en: "Favorite",
    es: "Favorito"
  },
  noFolders: {
    pt: "Nenhuma pasta criada.",
    en: "No folders created.",
    es: "No hay carpetas creadas."
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
    es: "Por favor, configura tu clave API de OpenAI para continuar la conversación."
  },
  apiKeyMissing: {
    pt: "Chave API não encontrada. Configure nas configurações.",
    en: "API key not found. Configure in settings.",
    es: "Clave API no encontrada. Configúrala en ajustes."
  },
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
    es: "Iniciar Sesión"
  },
  email: {
    pt: "E-mail",
    en: "Email",
    es: "Correo Electrónico"
  },
  password: {
    pt: "Senha",
    en: "Password",
    es: "Contraseña"
  },
  forgotPassword: {
    pt: "Esqueceu a senha?",
    en: "Forgot password?",
    es: "¿Olvidaste tu contraseña?"
  },
  register: {
    pt: "Registrar",
    en: "Register",
    es: "Registrar"
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
    es: "Cerrar Sesión"
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
  },
  startConversation: {
    pt: "Iniciar Conversa",
    en: "Start Conversation",
    es: "Iniciar Conversación"
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
  const [language, setLanguage] = useState<string>(() => {
    i18n.init();
    return i18n.language();
  });

  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  // Detectar o idioma salvo ou do navegador ao iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = ['pt', 'en', 'es'].includes(browserLang) ? browserLang : 'en';
      changeLanguage(supportedLang);
    }
  }, [changeLanguage]);

  // Function to get translation
  const t = (key: TranslationKey): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    
    const currentLang = language as keyof TranslationLanguages;
    if (translation[currentLang]) {
      return translation[currentLang];
    }
    
    const i18nKey = key.toString();
    const i18nTranslation = i18n.t(i18nKey);
    
    return i18nTranslation !== i18nKey ? i18nTranslation : translation["en"] || key;
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
