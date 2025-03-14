import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "pt" | "en" | "es";

type TranslationKey = 
  | "appName" 
  | "welcomeMessage" 
  | "todaysVerse" 
  | "reflectionTitle"
  | "verseLoadError"
  | "verseUnavailable"
  | "history"
  | "send"
  | "writeMessage"
  | "conversations"
  | "noConversations"
  | "close"
  | "timeAgo"
  | "justNow"
  | "minutesAgo"
  | "hoursAgo"
  | "daysAgo"
  | "weeksAgo"
  | "monthsAgo"
  | "yearsAgo";

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

const translations: Translations = {
  pt: {
    appName: "Deus é Amor",
    welcomeMessage: "Converse diretamente com Deus e receba orientação espiritual baseada na Bíblia",
    todaysVerse: "Versículo do Dia",
    reflectionTitle: "Reflexão",
    verseLoadError: "Não foi possível carregar o versículo do dia. Por favor, tente novamente mais tarde.",
    verseUnavailable: "Versículo indisponível no momento. Por favor, tente novamente mais tarde.",
    history: "Histórico",
    send: "Enviar",
    writeMessage: "Escreva sua mensagem...",
    conversations: "Conversas",
    noConversations: "Nenhuma conversa encontrada",
    close: "Fechar",
    timeAgo: "atrás",
    justNow: "agora mesmo",
    minutesAgo: "minutos",
    hoursAgo: "horas",
    daysAgo: "dias",
    weeksAgo: "semanas",
    monthsAgo: "meses",
    yearsAgo: "anos"
  },
  en: {
    appName: "God is Love",
    welcomeMessage: "Talk directly to God and receive spiritual guidance based on the Bible",
    todaysVerse: "Verse of the Day",
    reflectionTitle: "Reflection",
    verseLoadError: "Could not load today's verse. Please try again later.",
    verseUnavailable: "Verse currently unavailable. Please try again later.",
    history: "History",
    send: "Send",
    writeMessage: "Write your message...",
    conversations: "Conversations",
    noConversations: "No conversations found",
    close: "Close",
    timeAgo: "ago",
    justNow: "just now",
    minutesAgo: "minutes",
    hoursAgo: "hours",
    daysAgo: "days",
    weeksAgo: "weeks",
    monthsAgo: "months",
    yearsAgo: "years"
  },
  es: {
    appName: "Dios es Amor",
    welcomeMessage: "Habla directamente con Dios y recibe orientación espiritual basada en la Biblia",
    todaysVerse: "Versículo del Día",
    reflectionTitle: "Reflexión",
    verseLoadError: "No se pudo cargar el versículo del día. Por favor, inténtalo de nuevo más tarde.",
    verseUnavailable: "Versículo actualmente no disponible. Por favor, inténtalo de nuevo más tarde.",
    history: "Historial",
    send: "Enviar",
    writeMessage: "Escribe tu mensaje...",
    conversations: "Conversaciones", 
    noConversations: "No se encontraron conversaciones",
    close: "Cerrar",
    timeAgo: "atrás",
    justNow: "ahora mismo",
    minutesAgo: "minutos",
    hoursAgo: "horas",
    daysAgo: "días",
    weeksAgo: "semanas",
    monthsAgo: "meses",
    yearsAgo: "años"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

// Função para detectar o idioma do navegador
const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase().substring(0, 2);
  
  if (browserLang === "pt") return "pt";
  if (browserLang === "es") return "es";
  return "en"; // Default para inglês
};

// Componente LanguageProvider
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Tenta obter o idioma do localStorage
    const storedLanguage = localStorage.getItem("language") as Language | null;
    if (storedLanguage && ["pt", "en", "es"].includes(storedLanguage)) {
      return storedLanguage;
    }

    // Se não estiver no localStorage, detecta o idioma do navegador
    return detectBrowserLanguage();
  });

  useEffect(() => {
    // Atualiza o localStorage sempre que o idioma mudar
    localStorage.setItem("language", language);
  }, [language]);
  
  // Função de tradução
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook useLanguage
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
