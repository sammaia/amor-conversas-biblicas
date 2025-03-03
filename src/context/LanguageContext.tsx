import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "pt");

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const translations = {
    pt: {
      appName: "Deus é Amor",
      login: "Entrar",
      register: "Cadastrar",
      logout: "Sair",
      profile: "Perfil",
      account: "Conta",
      todaysVerse: "Versículo do Dia",
      chat: "Bate-papo",
      chatWelcome: "Bem-vindo ao chat! Como posso ajudar você hoje?",
      chatPlaceholder: "Escreva sua mensagem...",
      send: "Enviar",
      history: "Histórico",
      favorites: "Favoritos",
      folders: "Pastas",
      newConversation: "Nova Conversa",
      newFolder: "Nova Pasta",
      search: "Buscar",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Deletar",
      edit: "Editar",
      addToFolder: "Adicionar à pasta",
      removeFromFolder: "Remover da pasta",
      createFolder: "Criar pasta",
      folderName: "Nome da pasta",
      addedToFavorites: "Adicionado aos favoritos",
      removedFromFavorites: "Removido dos favoritos",
      folderCreated: "Pasta criada",
      folderRenamed: "Pasta renomeada",
      folderDeleted: "Pasta deletada",
      addedToFolder: "Adicionado à pasta",
      removedFromFolder: "Removido da pasta",
      messageAlreadyInFolder: "Mensagem já está nesta pasta",
      noFavorites: "Nenhum favorito ainda",
      noFolders: "Nenhuma pasta criada",
      noConversations: "Nenhuma conversa encontrada",
      confirmDelete: "Confirmar exclusão",
      conversationHistory: "Histórico de conversas",
    },
    en: {
      appName: "God is Love",
      login: "Login",
      register: "Register",
      logout: "Logout",
      profile: "Profile",
      account: "Account",
      todaysVerse: "Today's Verse",
      chat: "Chat",
      chatWelcome: "Welcome to the chat! How can I help you today?",
      chatPlaceholder: "Write your message...",
      send: "Send",
      history: "History",
      favorites: "Favorites",
      folders: "Folders",
      newConversation: "New Conversation",
      newFolder: "New Folder",
      search: "Search",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      addToFolder: "Add to folder",
      removeFromFolder: "Remove from folder",
      createFolder: "Create folder",
      folderName: "Folder name",
      addedToFavorites: "Added to favorites",
      removedFromFavorites: "Removed from favorites",
      folderCreated: "Folder created",
      folderRenamed: "Folder renamed",
      folderDeleted: "Folder deleted",
      addedToFolder: "Added to folder",
      removedFromFolder: "Removed from folder",
      messageAlreadyInFolder: "Message is already in this folder",
      noFavorites: "No favorites yet",
      noFolders: "No folders created",
      noConversations: "No conversations found",
      confirmDelete: "Confirm deletion",
      conversationHistory: "Conversation history",
    },
    es: {
      appName: "Dios es Amor",
      login: "Iniciar sesión",
      register: "Registrarse",
      logout: "Cerrar sesión",
      profile: "Perfil",
      account: "Cuenta",
      todaysVerse: "Versículo del día",
      chat: "Chat",
      chatWelcome: "¡Bienvenido al chat! ¿Cómo puedo ayudarte hoy?",
      chatPlaceholder: "Escribe tu mensaje...",
      send: "Enviar",
      history: "Historial",
      favorites: "Favoritos",
      folders: "Carpetas",
      newConversation: "Nueva Conversación",
      newFolder: "Nueva Carpeta",
      search: "Buscar",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      addToFolder: "Añadir a carpeta",
      removeFromFolder: "Quitar de carpeta",
      createFolder: "Crear carpeta",
      folderName: "Nombre de carpeta",
      addedToFavorites: "Añadido a favoritos",
      removedFromFavorites: "Quitado de favoritos",
      folderCreated: "Carpeta creada",
      folderRenamed: "Carpeta renombrada",
      folderDeleted: "Carpeta eliminada",
      addedToFolder: "Añadido a carpeta",
      removedFromFolder: "Quitado de carpeta",
      messageAlreadyInFolder: "El mensaje ya está en esta carpeta",
      noFavorites: "Aún no hay favoritos",
      noFolders: "No hay carpetas creadas",
      noConversations: "No se encontraron conversaciones",
      confirmDelete: "Confirmar eliminación",
      conversationHistory: "Historial de conversaciones",
    },
  };

  const t = useCallback((key: string) => {
    return translations[language as keyof typeof translations][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
