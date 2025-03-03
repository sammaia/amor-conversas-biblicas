
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipos de dados
type SupportedLanguage = "pt" | "en" | "es";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
}

interface TranslationsType {
  [key: string]: {
    [key: string]: string;
  };
}

// Objeto de traduções
const translations: TranslationsType = {
  pt: {
    appName: "Deus é Amor",
    welcomeMessage: "Bem-vindo ao Deus é Amor",
    sendMessage: "Enviar mensagem",
    typeMessage: "Digite sua mensagem...",
    search: "Buscar...",
    history: "Histórico",
    dailyVerse: "Versículo do Dia",
    readMore: "Ler mais",
    shareVerse: "Compartilhar",
    settings: "Configurações",
    about: "Sobre",
    login: "Entrar",
    register: "Cadastrar",
    logout: "Sair",
    username: "Nome de usuário",
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirmar senha",
    name: "Nome",
    namePlaceholder: "Seu nome completo",
    forgotPassword: "Esqueceu a senha?",
    resetPassword: "Resetar senha",
    loginMessage: "Entre para continuar sua jornada espiritual",
    registerMessage: "Crie uma conta para iniciar sua jornada espiritual",
    loggingIn: "Entrando...",
    registering: "Cadastrando...",
    dontHaveAccount: "Não tem uma conta?",
    alreadyHaveAccount: "Já tem uma conta?",
    backToHome: "Voltar para o início",
    passwordsDoNotMatch: "As senhas não coincidem",
    passwordTooShort: "A senha deve ter pelo menos 6 caracteres",
    conversations: "Conversas",
    newChat: "Nova conversa",
    favorites: "Favoritos",
    folders: "Pastas",
    createFolder: "Criar pasta",
    editFolder: "Editar pasta",
    deleteFolder: "Excluir pasta",
    folderName: "Nome da pasta",
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    confirmDelete: "Tem certeza que deseja excluir?",
    searchConversations: "Buscar conversas...",
    noResults: "Nenhum resultado encontrado",
    addToFolder: "Adicionar à pasta",
    removeFromFolder: "Remover da pasta",
    folderNameRequired: "O nome da pasta é obrigatório",
    folderCreated: "Pasta criada com sucesso",
    folderUpdated: "Pasta atualizada com sucesso",
    folderDeleted: "Pasta excluída com sucesso",
    messageFavorited: "Mensagem adicionada aos favoritos",
    messageUnfavorited: "Mensagem removida dos favoritos",
    profile: "Perfil",
    myAccount: "Minha conta",
    appearance: "Aparência",
    helpCenter: "Central de ajuda",
    selectFolder: "Selecionar pasta",
    createNewFolder: "Criar nova pasta",
    deleteConversation: "Excluir conversa",
    conversationDeleted: "Conversa excluída com sucesso",
    copyToClipboard: "Copiar para a área de transferência",
    copied: "Copiado!",
    darkMode: "Modo escuro",
    lightMode: "Modo claro",
    systemDefault: "Padrão do sistema",
    language: "Idioma",
    feedback: "Feedback",
    sendFeedback: "Enviar feedback",
    termsOfService: "Termos de serviço",
    privacyPolicy: "Política de privacidade",
    emptyFolders: "Você não tem pastas",
    emptyFavorites: "Você não tem favoritos",
    emptyHistory: "Você não tem histórico",
  },
  en: {
    appName: "God is Love",
    welcomeMessage: "Welcome to God is Love",
    sendMessage: "Send message",
    typeMessage: "Type your message...",
    search: "Search...",
    history: "History",
    dailyVerse: "Daily Verse",
    readMore: "Read more",
    shareVerse: "Share",
    settings: "Settings",
    about: "About",
    login: "Login",
    register: "Register",
    logout: "Logout",
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    name: "Name",
    namePlaceholder: "Your full name",
    forgotPassword: "Forgot password?",
    resetPassword: "Reset password",
    loginMessage: "Sign in to continue your spiritual journey",
    registerMessage: "Create an account to start your spiritual journey",
    loggingIn: "Logging in...",
    registering: "Registering...",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    backToHome: "Back to home",
    passwordsDoNotMatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 6 characters",
    conversations: "Conversations",
    newChat: "New chat",
    favorites: "Favorites",
    folders: "Folders",
    createFolder: "Create folder",
    editFolder: "Edit folder",
    deleteFolder: "Delete folder",
    folderName: "Folder name",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    confirmDelete: "Are you sure you want to delete?",
    searchConversations: "Search conversations...",
    noResults: "No results found",
    addToFolder: "Add to folder",
    removeFromFolder: "Remove from folder",
    folderNameRequired: "Folder name is required",
    folderCreated: "Folder created successfully",
    folderUpdated: "Folder updated successfully",
    folderDeleted: "Folder deleted successfully",
    messageFavorited: "Message added to favorites",
    messageUnfavorited: "Message removed from favorites",
    profile: "Profile",
    myAccount: "My account",
    appearance: "Appearance",
    helpCenter: "Help center",
    selectFolder: "Select folder",
    createNewFolder: "Create new folder",
    deleteConversation: "Delete conversation",
    conversationDeleted: "Conversation deleted successfully",
    copyToClipboard: "Copy to clipboard",
    copied: "Copied!",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    systemDefault: "System default",
    language: "Language",
    feedback: "Feedback",
    sendFeedback: "Send feedback",
    termsOfService: "Terms of service",
    privacyPolicy: "Privacy policy",
    emptyFolders: "You don't have any folders",
    emptyFavorites: "You don't have any favorites",
    emptyHistory: "You don't have any history",
  },
  es: {
    appName: "Dios es Amor",
    welcomeMessage: "Bienvenido a Dios es Amor",
    sendMessage: "Enviar mensaje",
    typeMessage: "Escribe tu mensaje...",
    search: "Buscar...",
    history: "Historial",
    dailyVerse: "Versículo del Día",
    readMore: "Leer más",
    shareVerse: "Compartir",
    settings: "Configuración",
    about: "Acerca de",
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    username: "Nombre de usuario",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    name: "Nombre",
    namePlaceholder: "Tu nombre completo",
    forgotPassword: "¿Olvidaste tu contraseña?",
    resetPassword: "Restablecer contraseña",
    loginMessage: "Inicia sesión para continuar tu jornada espiritual",
    registerMessage: "Crea una cuenta para iniciar tu jornada espiritual",
    loggingIn: "Iniciando sesión...",
    registering: "Registrando...",
    dontHaveAccount: "¿No tienes una cuenta?",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    backToHome: "Volver al inicio",
    passwordsDoNotMatch: "Las contraseñas no coinciden",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
    conversations: "Conversaciones",
    newChat: "Nueva conversación",
    favorites: "Favoritos",
    folders: "Carpetas",
    createFolder: "Crear carpeta",
    editFolder: "Editar carpeta",
    deleteFolder: "Eliminar carpeta",
    folderName: "Nombre de la carpeta",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    confirmDelete: "¿Estás seguro de que deseas eliminar?",
    searchConversations: "Buscar conversaciones...",
    noResults: "No se encontraron resultados",
    addToFolder: "Añadir a carpeta",
    removeFromFolder: "Quitar de carpeta",
    folderNameRequired: "El nombre de la carpeta es obligatorio",
    folderCreated: "Carpeta creada con éxito",
    folderUpdated: "Carpeta actualizada con éxito",
    folderDeleted: "Carpeta eliminada con éxito",
    messageFavorited: "Mensaje añadido a favoritos",
    messageUnfavorited: "Mensaje quitado de favoritos",
    profile: "Perfil",
    myAccount: "Mi cuenta",
    appearance: "Apariencia",
    helpCenter: "Centro de ayuda",
    selectFolder: "Seleccionar carpeta",
    createNewFolder: "Crear nueva carpeta",
    deleteConversation: "Eliminar conversación",
    conversationDeleted: "Conversación eliminada con éxito",
    copyToClipboard: "Copiar al portapapeles",
    copied: "¡Copiado!",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    systemDefault: "Predeterminado del sistema",
    language: "Idioma",
    feedback: "Comentarios",
    sendFeedback: "Enviar comentarios",
    termsOfService: "Términos de servicio",
    privacyPolicy: "Política de privacidad",
    emptyFolders: "No tienes carpetas",
    emptyFavorites: "No tienes favoritos",
    emptyHistory: "No tienes historial",
  },
};

// Criação do contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Detecta o idioma do navegador ou usa português como padrão
  const detectBrowserLanguage = (): SupportedLanguage => {
    const browserLang = navigator.language.split("-")[0];
    return (browserLang === "pt" || browserLang === "en" || browserLang === "es") 
      ? browserLang as SupportedLanguage 
      : "pt";
  };

  // Estado para armazenar o idioma atual
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const savedLanguage = localStorage.getItem("language") as SupportedLanguage;
    return savedLanguage || detectBrowserLanguage();
  });

  // Atualiza o localStorage quando o idioma muda
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Função para traduzir as chaves
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
};
