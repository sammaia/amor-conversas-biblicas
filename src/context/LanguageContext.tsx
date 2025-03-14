import React, { createContext, useContext, useState, useEffect } from "react";

// Define as chaves disponíveis para tradução
export type TranslationKey = 
  // App gerais
  | "appName" 
  | "loading"
  | "error"
  | "success"
  | "cancel"
  | "save"
  | "edit"
  | "delete"
  | "back"
  | "appDescription"
  // Login e autenticação
  | "login"
  | "logout"
  | "register"
  | "email"
  | "password"
  | "confirmPassword"
  | "name"
  | "namePlaceholder"
  | "loginMessage"
  | "registerMessage"
  | "forgotPassword"
  | "loggingIn"
  | "registering"
  | "dontHaveAccount"
  | "alreadyHaveAccount"
  | "passwordsDoNotMatch"
  | "passwordTooShort"
  // Header e footer
  | "footerText"
  | "backToHome"
  | "account"
  | "profile"
  // Chat
  | "chat"
  | "chatPlaceholder"
  | "send"
  | "newConversation"
  | "conversationHistory"
  | "manageConversations"
  | "search"
  | "history"
  | "favorites"
  | "folders"
  | "noFolders"
  | "noFavorites"
  | "noSearchResults"
  | "noConversations"
  | "emptyFolder"
  | "conversation"
  | "favorite"
  | "addToFolder"
  | "selectFolder"
  | "folderName"
  | "newFolder"
  | "folderCreated"
  | "folderRenamed"
  | "folderDeleted"
  | "addedToFolder"
  | "removedFromFolder"
  | "messageAlreadyInFolder"
  | "addedToFavorites"
  | "removedFromFavorites"
  | "chatWelcome"
  | "welcomeMessage"
  // Versículo do dia
  | "todaysVerse"
  | "verseLoadError"
  | "verseUnavailable"
  | "reflectionTitle";

// Define a interface para o contexto de idioma
interface LanguageContextProps {
  language: "pt" | "en" | "es";
  setLanguage: (lang: "pt" | "en" | "es") => void;
  t: (key: TranslationKey) => string;
}

// Traduções disponíveis
const translations = {
  pt: {
    // App gerais
    appName: "Deus é Amor",
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    cancel: "Cancelar",
    save: "Salvar",
    edit: "Editar",
    delete: "Excluir",
    back: "Voltar",
    appDescription: "Converse com Deus e receba orientação espiritual através de palavras de amor e esperança baseadas na Bíblia.",
    // Login e autenticação
    login: "Entrar",
    logout: "Sair",
    register: "Cadastrar",
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirmar senha",
    name: "Nome",
    namePlaceholder: "Seu nome completo",
    loginMessage: "Entre com sua conta para continuar",
    registerMessage: "Crie uma conta para começar",
    forgotPassword: "Esqueceu a senha?",
    loggingIn: "Entrando...",
    registering: "Cadastrando...",
    dontHaveAccount: "Não tem uma conta?",
    alreadyHaveAccount: "Já tem uma conta?",
    passwordsDoNotMatch: "As senhas não coincidem",
    passwordTooShort: "A senha deve ter pelo menos 6 caracteres",
    // Header e footer
    footerText: "Deus é Amor - Todos os direitos reservados",
    backToHome: "Voltar para o início",
    account: "Minha conta",
    profile: "Perfil",
    // Chat
    chat: "Converse com Deus",
    chatPlaceholder: "Digite sua mensagem...",
    send: "Enviar",
    newConversation: "Nova conversa",
    conversationHistory: "Histórico de conversas",
    manageConversations: "Gerencie suas conversas salvas",
    search: "Pesquisar",
    history: "Histórico",
    favorites: "Favoritos",
    folders: "Pastas",
    noFolders: "Você ainda não tem pastas",
    noFavorites: "Você ainda não tem favoritos",
    noSearchResults: "Nenhum resultado encontrado",
    noConversations: "Você ainda não tem conversas",
    emptyFolder: "Esta pasta está vazia",
    conversation: "Conversa",
    favorite: "Favorito",
    addToFolder: "Adicionar à pasta",
    selectFolder: "Selecione uma pasta",
    folderName: "Nome da pasta",
    newFolder: "Nova pasta",
    folderCreated: "Pasta criada com sucesso",
    folderRenamed: "Pasta renomeada com sucesso",
    folderDeleted: "Pasta excluída com sucesso",
    addedToFolder: "Adicionado à pasta com sucesso",
    removedFromFolder: "Removido da pasta com sucesso",
    messageAlreadyInFolder: "Esta mensagem já está nesta pasta",
    addedToFavorites: "Adicionado aos favoritos",
    removedFromFavorites: "Removido dos favoritos",
    chatWelcome: "Olá! Como posso te ajudar hoje? Estou aqui para conversar e compartilhar palavras de amor, fé e esperança baseadas nas Escrituras.",
    welcomeMessage: "Converse com Deus e receba orientação espiritual através de palavras de amor e esperança baseadas na Bíblia.",
    // Versículo do dia
    todaysVerse: "Versículo do Dia",
    verseLoadError: "Não foi possível carregar o versículo do dia",
    verseUnavailable: "Versículo indisponível no momento",
    reflectionTitle: "Reflexão"
  },
  en: {
    // App gerais
    appName: "God is Love",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    back: "Back",
    appDescription: "Chat with God and receive spiritual guidance through words of love and hope based on the Bible.",
    // Login e autenticação
    login: "Login",
    logout: "Logout",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    name: "Name",
    namePlaceholder: "Your full name",
    loginMessage: "Sign in to your account to continue",
    registerMessage: "Create an account to get started",
    forgotPassword: "Forgot password?",
    loggingIn: "Signing in...",
    registering: "Registering...",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    passwordsDoNotMatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 6 characters",
    // Header e footer
    footerText: "God is Love - All rights reserved",
    backToHome: "Back to home",
    account: "My account",
    profile: "Profile",
    // Chat
    chat: "Chat with God",
    chatPlaceholder: "Type your message...",
    send: "Send",
    newConversation: "New conversation",
    conversationHistory: "Conversation history",
    manageConversations: "Manage your saved conversations",
    search: "Search",
    history: "History",
    favorites: "Favorites",
    folders: "Folders",
    noFolders: "You don't have any folders yet",
    noFavorites: "You don't have any favorites yet",
    noSearchResults: "No results found",
    noConversations: "You don't have any conversations yet",
    emptyFolder: "This folder is empty",
    conversation: "Conversation",
    favorite: "Favorite",
    addToFolder: "Add to folder",
    selectFolder: "Select a folder",
    folderName: "Folder name",
    newFolder: "New folder",
    folderCreated: "Folder created successfully",
    folderRenamed: "Folder renamed successfully",
    folderDeleted: "Folder deleted successfully",
    addedToFolder: "Added to folder successfully",
    removedFromFolder: "Removed from folder successfully",
    messageAlreadyInFolder: "This message is already in this folder",
    addedToFavorites: "Added to favorites",
    removedFromFavorites: "Removed from favorites",
    chatWelcome: "Hello! How can I help you today? I'm here to chat and share words of love, faith, and hope based on the Scriptures.",
    welcomeMessage: "Chat with God and receive spiritual guidance through words of love and hope based on the Bible.",
    // Versículo do dia
    todaysVerse: "Verse of the Day",
    verseLoadError: "Could not load today's verse",
    verseUnavailable: "Verse currently unavailable",
    reflectionTitle: "Reflection"
  },
  es: {
    // App gerais
    appName: "Dios es Amor",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    back: "Volver",
    appDescription: "Conversa con Dios y recibe orientación espiritual a través de palabras de amor y esperanza basadas en la Biblia.",
    // Login e autenticação
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    register: "Registrarse",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    name: "Nombre",
    namePlaceholder: "Tu nombre completo",
    loginMessage: "Inicia sesión para continuar",
    registerMessage: "Crea una cuenta para empezar",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loggingIn: "Iniciando sesión...",
    registering: "Registrando...",
    dontHaveAccount: "¿No tienes una cuenta?",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    passwordsDoNotMatch: "Las contraseñas no coinciden",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
    // Header e footer
    footerText: "Dios es Amor - Todos los derechos reservados",
    backToHome: "Volver al inicio",
    account: "Mi cuenta",
    profile: "Perfil",
    // Chat
    chat: "Conversa con Dios",
    chatPlaceholder: "Escribe tu mensaje...",
    send: "Enviar",
    newConversation: "Nueva conversación",
    conversationHistory: "Historial de conversaciones",
    manageConversations: "Administra tus conversaciones guardadas",
    search: "Buscar",
    history: "Historial",
    favorites: "Favoritos",
    folders: "Carpetas",
    noFolders: "Aún no tienes carpetas",
    noFavorites: "Aún no tienes favoritos",
    noSearchResults: "No se encontraron resultados",
    noConversations: "Aún no tienes conversaciones",
    emptyFolder: "Esta carpeta está vacía",
    conversation: "Conversación",
    favorite: "Favorito",
    addToFolder: "Añadir a carpeta",
    selectFolder: "Selecciona una carpeta",
    folderName: "Nombre de la carpeta",
    newFolder: "Nueva carpeta",
    folderCreated: "Carpeta creada con éxito",
    folderRenamed: "Carpeta renombrada con éxito",
    folderDeleted: "Carpeta eliminada con éxito",
    addedToFolder: "Añadido a la carpeta con éxito",
    removedFromFolder: "Eliminado de la carpeta con éxito",
    messageAlreadyInFolder: "Este mensaje ya está en esta carpeta",
    addedToFavorites: "Añadido a favoritos",
    removedFromFavorites: "Eliminado de favoritos",
    chatWelcome: "¡Hola! ¿Cómo puedo ayudarte hoy? Estoy aquí para conversar y compartir palabras de amor, fe y esperanza basadas en las Escrituras.",
    welcomeMessage: "Conversa con Dios y recibe orientación espiritual a través de palabras de amor y esperanza basadas en la Biblia.",
    // Versículo do dia
    todaysVerse: "Versículo del Día",
    verseLoadError: "No se pudo cargar el versículo del día",
    verseUnavailable: "Versículo no disponible en este momento",
    reflectionTitle: "Reflexión"
  }
};

// Cria o contexto de idioma
const LanguageContext = createContext<LanguageContextProps>({
  language: "pt",
  setLanguage: () => {},
  t: () => "",
});

// Hook para usar o contexto de idioma
export const useLanguage = () => useContext(LanguageContext);

// Provedor de idioma
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tenta obter o idioma armazenado no localStorage ou usa o idioma do navegador ou português como padrão
  const getInitialLanguage = (): "pt" | "en" | "es" => {
    // Tenta recuperar do localStorage
    const savedLanguage = localStorage.getItem("language") as "pt" | "en" | "es" | null;
    if (savedLanguage && ["pt", "en", "es"].includes(savedLanguage)) {
      return savedLanguage as "pt" | "en" | "es";
    }
    
    // Tenta detectar o idioma do navegador
    const browserLang = navigator.language.split("-")[0].toLowerCase();
    if (browserLang === "pt" || browserLang === "en" || browserLang === "es") {
      return browserLang as "pt" | "en" | "es";
    }
    
    // Padrão: português
    return "pt";
  };
  
  const [language, setLanguageState] = useState<"pt" | "en" | "es">(getInitialLanguage);
  
  // Função para alterar o idioma e salvá-lo no localStorage
  const setLanguage = (lang: "pt" | "en" | "es") => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };
  
  // Função para obter a tradução de uma chave
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };
  
  // Configura o título da página com base no idioma selecionado
  useEffect(() => {
    document.title = t("appName");
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
