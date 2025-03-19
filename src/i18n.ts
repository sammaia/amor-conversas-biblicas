
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Definições de recursos de tradução
const resources = {
  en: {
    translation: {
      // Textos gerais
      appName: 'God is Love',
      welcome: 'Welcome',
      login: 'Login',
      register: 'Register',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
      email: 'Email',
      submit: 'Submit',
      logout: 'Logout',
      search: 'Search',
      back: 'Back',
      loading: 'Loading',

      // Mensagens
      loginSuccess: 'Successfully logged in',
      registerSuccess: 'Registration successful',
      enterUsername: 'Please enter a username',
      enterPassword: 'Please enter a password',
      enterEmail: 'Please enter an email',
      passwordsDoNotMatch: 'Passwords do not match',
      invalidCredentials: 'Invalid credentials',
      
      // Navegação
      home: 'Home',
      chat: 'Chat',
      bible: 'Bible',
      settings: 'Settings',
      
      // Chat
      typeMessage: 'Type your message',
      send: 'Send',
      clearChat: 'Clear chat',
      startConversation: 'Start a new conversation',

      // Página da Bíblia
      bibleBrowser: 'Bible Browser',
      bibleBooks: 'Bible Books',
      chapter: 'Chapter',
      verse: 'Verse',
      searchBible: 'Search in the Bible',
      browse: 'Browse',
      searchResults: 'Search Results',
      enterSearchTerm: 'Enter at least 3 characters to search',
      searching: 'Searching',
      noResults: 'No results found',
      reference: 'Reference',
      text: 'Text',

      // Versículo do dia
      dailyVerse: 'Verse of the Day',
      shareVerse: 'Share Verse',
      
      // Erros
      error: 'Error',
      pageNotFound: 'Page not found',
      returnToHome: 'Return to home page',
      
      // Confirmar ações
      confirm: 'Confirm',
      cancel: 'Cancel',
      
      // Configurações
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    }
  },
  pt: {
    translation: {
      // Textos gerais
      appName: 'Deus é Amor',
      welcome: 'Bem-vindo',
      login: 'Entrar',
      register: 'Cadastrar',
      username: 'Nome de usuário',
      password: 'Senha',
      confirmPassword: 'Confirmar senha',
      email: 'Email',
      submit: 'Enviar',
      logout: 'Sair',
      search: 'Buscar',
      back: 'Voltar',
      loading: 'Carregando',

      // Mensagens
      loginSuccess: 'Login realizado com sucesso',
      registerSuccess: 'Cadastro realizado com sucesso',
      enterUsername: 'Por favor, insira um nome de usuário',
      enterPassword: 'Por favor, insira uma senha',
      enterEmail: 'Por favor, insira um email',
      passwordsDoNotMatch: 'As senhas não coincidem',
      invalidCredentials: 'Credenciais inválidas',
      
      // Navegação
      home: 'Início',
      chat: 'Chat',
      bible: 'Bíblia',
      settings: 'Configurações',
      
      // Chat
      typeMessage: 'Digite sua mensagem',
      send: 'Enviar',
      clearChat: 'Limpar chat',
      startConversation: 'Iniciar uma nova conversa',

      // Página da Bíblia
      bibleBrowser: 'Navegador da Bíblia',
      bibleBooks: 'Livros da Bíblia',
      chapter: 'Capítulo',
      verse: 'Versículo',
      searchBible: 'Buscar na Bíblia',
      browse: 'Navegar',
      searchResults: 'Resultados da Busca',
      enterSearchTerm: 'Digite pelo menos 3 caracteres para buscar',
      searching: 'Buscando',
      noResults: 'Nenhum resultado encontrado',
      reference: 'Referência',
      text: 'Texto',

      // Versículo do dia
      dailyVerse: 'Versículo do Dia',
      shareVerse: 'Compartilhar Versículo',
      
      // Erros
      error: 'Erro',
      pageNotFound: 'Página não encontrada',
      returnToHome: 'Voltar para a página inicial',
      
      // Confirmar ações
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      
      // Configurações
      language: 'Idioma',
      theme: 'Tema',
      light: 'Claro',
      dark: 'Escuro',
      system: 'Sistema',
    }
  },
  es: {
    translation: {
      // Textos generales
      appName: 'Dios es Amor',
      welcome: 'Bienvenido',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      username: 'Nombre de usuario',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      email: 'Correo electrónico',
      submit: 'Enviar',
      logout: 'Cerrar sesión',
      search: 'Buscar',
      back: 'Volver',
      loading: 'Cargando',

      // Mensajes
      loginSuccess: 'Sesión iniciada con éxito',
      registerSuccess: 'Registro completado con éxito',
      enterUsername: 'Por favor, ingrese un nombre de usuario',
      enterPassword: 'Por favor, ingrese una contraseña',
      enterEmail: 'Por favor, ingrese un correo electrónico',
      passwordsDoNotMatch: 'Las contraseñas no coinciden',
      invalidCredentials: 'Credenciales inválidas',
      
      // Navegación
      home: 'Inicio',
      chat: 'Chat',
      bible: 'Biblia',
      settings: 'Configuraciones',
      
      // Chat
      typeMessage: 'Escribe tu mensaje',
      send: 'Enviar',
      clearChat: 'Limpiar chat',
      startConversation: 'Iniciar una nueva conversación',

      // Página de la Biblia
      bibleBrowser: 'Navegador de la Biblia',
      bibleBooks: 'Libros de la Biblia',
      chapter: 'Capítulo',
      verse: 'Versículo',
      searchBible: 'Buscar en la Biblia',
      browse: 'Explorar',
      searchResults: 'Resultados de la búsqueda',
      enterSearchTerm: 'Ingrese al menos 3 caracteres para buscar',
      searching: 'Buscando',
      noResults: 'No se encontraron resultados',
      reference: 'Referencia',
      text: 'Texto',

      // Versículo del día
      dailyVerse: 'Versículo del Día',
      shareVerse: 'Compartir Versículo',
      
      // Errores
      error: 'Error',
      pageNotFound: 'Página no encontrada',
      returnToHome: 'Volver a la página de inicio',
      
      // Confirmar acciones
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      
      // Configuraciones
      language: 'Idioma',
      theme: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
    }
  }
};

// Configuração do i18n
const initI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false // não é necessário para React
      },
      react: {
        useSuspense: false // evita problemas com Suspense
      }
    });

  return i18n;
};

export default {
  init: initI18n,
  changeLanguage: (lng: string) => i18n.changeLanguage(lng),
  t: (key: string) => i18n.t(key),
  language: () => i18n.language
};
