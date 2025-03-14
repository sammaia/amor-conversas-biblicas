
import React, { createContext, useContext, useState, useEffect } from "react";

// Define as chaves disponíveis para tradução
export type TranslationKey = 
  // UI geral
  | "appName"
  | "search"
  | "settings"
  | "profile"
  | "save"
  | "cancel"
  | "confirm"
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
  | "forgotPassword"
  | "resetPassword"
  | "username"
  | "loginSuccess"
  | "loginError"
  | "logoutSuccess"
  | "registrationSuccess"
  | "registrationError"
  | "passwordResetSuccess"
  | "passwordResetError"
  | "passwordStrength"
  | "passwordMismatch"
  | "invalidEmail"
  | "requiredField"
  // Navegação
  | "home"
  | "explore"
  | "bible"
  | "prayers"
  | "community"
  | "devotionals"
  | "myContent"
  | "history"
  // Chat
  | "chat"
  | "chatPlaceholder"
  | "send"
  | "newChat"
  | "newConversation"
  | "deleteConversation"
  | "confirmDelete"
  | "typeMessage"
  | "loadingResponse"
  | "aiError"
  | "noMessages"
  | "favorites"
  | "folders"
  | "createFolder"
  | "folderName"
  | "renameFolder"
  | "deleteFolder"
  | "folderCreated"
  | "folderRenamed"
  | "folderDeleted"
  | "emptyFolder"
  | "searchFolders"
  | "addToFolder"
  | "messageAlreadyInFolder"
  | "addedToFolder"
  | "removedFromFolder"
  | "favoriteMessages"
  | "addedToFavorites"
  | "removedFromFavorites"
  | "chatWelcome"
  | "welcomeMessage"
  // Versículo do dia
  | "todaysVerse"
  | "verseLoadError"
  | "shareVerse"
  | "copyVerse"
  | "verseCopied"

// Define a interface do contexto
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: TranslationKey) => string;
}

// Tradução em português
const translationsPT = {
    // UI geral
    appName: "Deus é Amor",
    search: "Buscar",
    settings: "Configurações",
    profile: "Perfil",
    save: "Salvar",
    cancel: "Cancelar",
    confirm: "Confirmar",
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
    forgotPassword: "Esqueceu a senha?",
    resetPassword: "Redefinir senha",
    username: "Nome de usuário",
    loginSuccess: "Login realizado com sucesso!",
    loginError: "Erro ao fazer login. Verifique suas credenciais.",
    logoutSuccess: "Logout realizado com sucesso!",
    registrationSuccess: "Cadastro realizado com sucesso!",
    registrationError: "Erro ao realizar cadastro.",
    passwordResetSuccess: "E-mail de redefinição de senha enviado com sucesso!",
    passwordResetError: "Erro ao enviar e-mail de redefinição de senha.",
    passwordStrength: "A senha deve ter pelo menos 8 caracteres",
    passwordMismatch: "As senhas não coincidem",
    invalidEmail: "E-mail inválido",
    requiredField: "Campo obrigatório",
    // Navegação
    home: "Início",
    explore: "Explorar",
    bible: "Bíblia",
    prayers: "Orações",
    community: "Comunidade",
    devotionals: "Devocionais",
    myContent: "Meu conteúdo",
    history: "Histórico",
    // Chat
    chat: "Conversa",
    chatPlaceholder: "Digite sua mensagem aqui...",
    send: "Enviar",
    newChat: "Nova conversa",
    newConversation: "Nova conversa",
    deleteConversation: "Excluir conversa",
    confirmDelete: "Tem certeza que deseja excluir esta conversa?",
    typeMessage: "Digite uma mensagem...",
    loadingResponse: "Digitando...",
    aiError: "Desculpe, não consegui processar sua mensagem neste momento. Por favor, tente novamente.",
    noMessages: "Nenhuma mensagem para mostrar",
    favorites: "Favoritos",
    folders: "Pastas",
    createFolder: "Criar pasta",
    folderName: "Nome da pasta",
    renameFolder: "Renomear pasta",
    deleteFolder: "Excluir pasta",
    folderCreated: "Pasta criada",
    folderRenamed: "Pasta renomeada",
    folderDeleted: "Pasta excluída",
    emptyFolder: "Pasta vazia",
    searchFolders: "Buscar pastas",
    addToFolder: "Adicionar à pasta",
    messageAlreadyInFolder: "Mensagem já está nesta pasta",
    addedToFolder: "Adicionado à pasta",
    removedFromFolder: "Removido da pasta",
    favoriteMessages: "Mensagens favoritas",
    addedToFavorites: "Adicionado aos favoritos",
    removedFromFavorites: "Removido dos favoritos",
    chatWelcome: "Olá! Como posso te ajudar hoje? Estou aqui para conversar e compartilhar palavras de amor, fé e esperança baseadas nas Escrituras.",
    welcomeMessage: "Converse com Deus e receba orientação espiritual através de palavras de amor e esperança baseadas na Bíblia.",
    // Versículo do dia
    todaysVerse: "Versículo do Dia",
    verseLoadError: "Não foi possível carregar o versículo do dia",
    shareVerse: "Compartilhar",
    copyVerse: "Copiar",
    verseCopied: "Versículo copiado para a área de transferência",
};

// Tradução em inglês
const translationsEN = {
    // UI geral
    appName: "God is Love",
    search: "Search",
    settings: "Settings",
    profile: "Profile",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
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
    forgotPassword: "Forgot password?",
    resetPassword: "Reset password",
    username: "Username",
    loginSuccess: "Login successful!",
    loginError: "Login error. Check your credentials.",
    logoutSuccess: "Logout successful!",
    registrationSuccess: "Registration successful!",
    registrationError: "Registration error.",
    passwordResetSuccess: "Password reset email sent successfully!",
    passwordResetError: "Error sending password reset email.",
    passwordStrength: "Password must be at least 8 characters",
    passwordMismatch: "Passwords do not match",
    invalidEmail: "Invalid email",
    requiredField: "Required field",
    // Navegação
    home: "Home",
    explore: "Explore",
    bible: "Bible",
    prayers: "Prayers",
    community: "Community",
    devotionals: "Devotionals",
    myContent: "My content",
    history: "History",
    // Chat
    chat: "Chat",
    chatPlaceholder: "Type your message here...",
    send: "Send",
    newChat: "New chat",
    newConversation: "New conversation",
    deleteConversation: "Delete conversation",
    confirmDelete: "Are you sure you want to delete this conversation?",
    typeMessage: "Type a message...",
    loadingResponse: "Typing...",
    aiError: "Sorry, I could not process your message at this time. Please try again.",
    noMessages: "No messages to display",
    favorites: "Favorites",
    folders: "Folders",
    createFolder: "Create folder",
    folderName: "Folder name",
    renameFolder: "Rename folder",
    deleteFolder: "Delete folder",
    folderCreated: "Folder created",
    folderRenamed: "Folder renamed",
    folderDeleted: "Folder deleted",
    emptyFolder: "Empty folder",
    searchFolders: "Search folders",
    addToFolder: "Add to folder",
    messageAlreadyInFolder: "Message already in this folder",
    addedToFolder: "Added to folder",
    removedFromFolder: "Removed from folder",
    favoriteMessages: "Favorite messages",
    addedToFavorites: "Added to favorites",
    removedFromFavorites: "Removed from favorites",
    chatWelcome: "Hello! How can I help you today? I'm here to chat and share words of love, faith, and hope based on the Scriptures.",
    welcomeMessage: "Chat with God and receive spiritual guidance through words of love and hope based on the Bible.",
    // Versículo do dia
    todaysVerse: "Verse of the Day",
    verseLoadError: "Could not load today's verse",
    shareVerse: "Share",
    copyVerse: "Copy",
    verseCopied: "Verse copied to clipboard",
};

// Tradução em espanhol
const translationsES = {
    // UI geral
    appName: "Dios es Amor",
    search: "Buscar",
    settings: "Configuración",
    profile: "Perfil",
    save: "Guardar",
    cancel: "Cancelar",
    confirm: "Confirmar",
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
    forgotPassword: "¿Olvidó su contraseña?",
    resetPassword: "Restablecer contraseña",
    username: "Nombre de usuario",
    loginSuccess: "¡Inicio de sesión exitoso!",
    loginError: "Error de inicio de sesión. Verifique sus credenciales.",
    logoutSuccess: "¡Cierre de sesión exitoso!",
    registrationSuccess: "¡Registro exitoso!",
    registrationError: "Error de registro.",
    passwordResetSuccess: "¡Correo electrónico de restablecimiento de contraseña enviado con éxito!",
    passwordResetError: "Error al enviar el correo electrónico de restablecimiento de contraseña.",
    passwordStrength: "La contraseña debe tener al menos 8 caracteres",
    passwordMismatch: "Las contraseñas no coinciden",
    invalidEmail: "Correo electrónico inválido",
    requiredField: "Campo obligatorio",
    // Navegação
    home: "Inicio",
    explore: "Explorar",
    bible: "Biblia",
    prayers: "Oraciones",
    community: "Comunidad",
    devotionals: "Devocionales",
    myContent: "Mi contenido",
    history: "Historial",
    // Chat
    chat: "Chat",
    chatPlaceholder: "Escribe tu mensaje aquí...",
    send: "Enviar",
    newChat: "Nuevo chat",
    newConversation: "Nueva conversación",
    deleteConversation: "Eliminar conversación",
    confirmDelete: "¿Está seguro de que desea eliminar esta conversación?",
    typeMessage: "Escribe un mensaje...",
    loadingResponse: "Escribiendo...",
    aiError: "Lo siento, no pude procesar tu mensaje en este momento. Por favor, inténtalo de nuevo.",
    noMessages: "No hay mensajes para mostrar",
    favorites: "Favoritos",
    folders: "Carpetas",
    createFolder: "Crear carpeta",
    folderName: "Nombre de la carpeta",
    renameFolder: "Renombrar carpeta",
    deleteFolder: "Eliminar carpeta",
    folderCreated: "Carpeta creada",
    folderRenamed: "Carpeta renombrada",
    folderDeleted: "Carpeta eliminada",
    emptyFolder: "Carpeta vacía",
    searchFolders: "Buscar carpetas",
    addToFolder: "Añadir a la carpeta",
    messageAlreadyInFolder: "El mensaje ya está en esta carpeta",
    addedToFolder: "Añadido a la carpeta",
    removedFromFolder: "Eliminado de la carpeta",
    favoriteMessages: "Mensajes favoritos",
    addedToFavorites: "Añadido a favoritos",
    removedFromFavorites: "Eliminado de favoritos",
    chatWelcome: "¡Hola! ¿Cómo puedo ayudarte hoy? Estoy aquí para conversar y compartir palabras de amor, fe y esperanza basadas en las Escrituras.",
    welcomeMessage: "Conversa con Dios y recibe orientación espiritual a través de palabras de amor y esperanza basadas en la Biblia.",
    // Versículo do dia
    todaysVerse: "Versículo del Día",
    verseLoadError: "No se pudo cargar el versículo del día",
    shareVerse: "Compartir",
    copyVerse: "Copiar",
    verseCopied: "Versículo copiado al portapapeles",
};

// Centraliza as traduções
const translations = {
  pt: translationsPT,
  en: translationsEN,
  es: translationsES,
};

// Cria o contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider que envolve a aplicação
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para armazenar o idioma atual
  const [language, setLanguage] = useState<string>("pt");

  // Detecta o idioma do navegador ao carregar o componente
  useEffect(() => {
    const detectBrowserLanguage = () => {
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "pt" || browserLang === "en" || browserLang === "es") {
        setLanguage(browserLang);
      }
    };

    // Verifica se já existe um idioma definido no localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage);
    } else {
      detectBrowserLanguage();
    }
  }, []);

  // Salva o idioma selecionado no localStorage quando ele mudar
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Função de tradução
  const t = (key: TranslationKey): string => {
    const currentTranslations = translations[language as keyof typeof translations];
    return currentTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar o contexto
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
