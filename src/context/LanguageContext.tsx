
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
  },
  // Authentication
  login: {
    pt: "Entrar",
    en: "Login",
    es: "Iniciar sesión"
  },
  loggingIn: {
    pt: "Entrando...",
    en: "Logging in...",
    es: "Iniciando sesión..."
  },
  register: {
    pt: "Cadastrar",
    en: "Register",
    es: "Registrarse"
  },
  registering: {
    pt: "Cadastrando...",
    en: "Registering...",
    es: "Registrándose..."
  },
  email: {
    pt: "Email",
    en: "Email",
    es: "Correo electrónico"
  },
  password: {
    pt: "Senha",
    en: "Password",
    es: "Contraseña"
  },
  confirmPassword: {
    pt: "Confirmar senha",
    en: "Confirm password",
    es: "Confirmar contraseña"
  },
  name: {
    pt: "Nome",
    en: "Name",
    es: "Nombre"
  },
  namePlaceholder: {
    pt: "Seu nome completo",
    en: "Your full name",
    es: "Su nombre completo"
  },
  forgotPassword: {
    pt: "Esqueceu sua senha?",
    en: "Forgot password?",
    es: "¿Olvidó su contraseña?"
  },
  dontHaveAccount: {
    pt: "Não tem uma conta?",
    en: "Don't have an account?",
    es: "¿No tiene una cuenta?"
  },
  alreadyHaveAccount: {
    pt: "Já tem uma conta?",
    en: "Already have an account?",
    es: "¿Ya tiene una cuenta?"
  },
  loginMessage: {
    pt: "Entre para acessar sua jornada espiritual",
    en: "Sign in to access your spiritual journey",
    es: "Inicie sesión para acceder a su jornada espiritual"
  },
  registerMessage: {
    pt: "Crie sua conta para iniciar sua jornada espiritual",
    en: "Create your account to start your spiritual journey",
    es: "Cree su cuenta para comenzar su jornada espiritual"
  },
  passwordsDoNotMatch: {
    pt: "As senhas não coincidem",
    en: "Passwords do not match",
    es: "Las contraseñas no coinciden"
  },
  passwordTooShort: {
    pt: "A senha deve ter pelo menos 6 caracteres",
    en: "Password must be at least 6 characters",
    es: "La contraseña debe tener al menos 6 caracteres"
  },
  account: {
    pt: "Conta",
    en: "Account",
    es: "Cuenta"
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
  backToHome: {
    pt: "Voltar para o início",
    en: "Back to home",
    es: "Volver al inicio"
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
