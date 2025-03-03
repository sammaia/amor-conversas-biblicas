
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "pt" | "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  // Header
  appName: {
    pt: "Deus é Amor",
    en: "God is Love",
    es: "Dios es Amor"
  },
  // Navigation
  home: {
    pt: "Início",
    en: "Home",
    es: "Inicio"
  },
  chat: {
    pt: "Conversar",
    en: "Chat",
    es: "Chatear"
  },
  dailyVerse: {
    pt: "Versículo do Dia",
    en: "Daily Verse",
    es: "Versículo del Día"
  },
  // Daily Verse
  todaysVerse: {
    pt: "Versículo de Hoje",
    en: "Today's Verse",
    es: "Versículo de Hoy"
  },
  // Chat
  chatPlaceholder: {
    pt: "Digite sua mensagem aqui...",
    en: "Type your message here...",
    es: "Escribe tu mensaje aquí..."
  },
  send: {
    pt: "Enviar",
    en: "Send",
    es: "Enviar"
  },
  chatWelcome: {
    pt: "Olá! Estou aqui para auxiliar em sua jornada espiritual. Como posso ajudar você hoje?",
    en: "Hello! I'm here to assist you in your spiritual journey. How can I help you today?",
    es: "¡Hola! Estoy aquí para ayudarte en tu jornada espiritual. ¿Cómo puedo ayudarte hoy?"
  },
  // Footer
  footerText: {
    pt: "Deus é Amor - Guia Espiritual e Bíblico",
    en: "God is Love - Spiritual and Biblical Guide",
    es: "Dios es Amor - Guía Espiritual y Bíblica"
  },
  // Language selector
  languages: {
    pt: "Idiomas",
    en: "Languages",
    es: "Idiomas"
  },
  portuguese: {
    pt: "Português",
    en: "Portuguese",
    es: "Portugués"
  },
  english: {
    pt: "Inglês",
    en: "English",
    es: "Inglés"
  },
  spanish: {
    pt: "Espanhol",
    en: "Spanish",
    es: "Español"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get the browser language first, default to Portuguese
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'pt' || browserLang === 'en' || browserLang === 'es') {
      return browserLang as Language;
    }
    return 'pt'; // Default to Portuguese
  };

  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  const t = (key: string): string => {
    const keyPath = key.split('.');
    let result: any = translations;
    
    for (const k of keyPath) {
      if (result[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      result = result[k];
    }
    
    return result[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
