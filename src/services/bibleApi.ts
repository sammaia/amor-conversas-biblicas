
import { verses as localVerses } from "@/data/verses";
import { getConfig, saveConfig, ConfigKeys } from "./configService";

interface BibleVersions {
  pt: string;
  en: string;
}

// IDs das versões da Bíblia na API para cada idioma
const BIBLE_VERSIONS: BibleVersions = {
  pt: "b730fb6bd36cf26a-01", // Almeida Revista e Atualizada
  en: "de4e12af7f28f599-01", // King James Version (KJV)
};

// Obtém a chave de API da Bíblia do serviço de configuração
const getBibleApiKey = (): string => {
  const apiKey = getConfig(ConfigKeys.BIBLE_API_KEY);
  // Use uma chave padrão apenas para fallback se necessário
  return apiKey || "62f59770e58ad92c1e32269ea76f695e";
};

export interface BibleVerse {
  reference: {
    pt: string;
    en: string;
  };
  text: {
    pt: string;
    en: string;
  };
  context?: {
    pt: string;
    en: string;
  };
}

/**
 * Salva a chave da API da Bíblia de forma segura
 * @param key Chave da API
 */
export const saveBibleApiKey = (key: string): void => {
  saveConfig(ConfigKeys.BIBLE_API_KEY, key);
};

/**
 * Busca um versículo aleatório da API da Bíblia
 */
export const fetchRandomVerse = async (): Promise<BibleVerse | null> => {
  try {
    // Lista de livros populares e seus capítulos máximos
    const popularBooks = [
      { name: "JHN", chapters: 21, verseRange: 50 }, // João
      { name: "PSA", chapters: 150, verseRange: 20 }, // Salmos
      { name: "PRO", chapters: 31, verseRange: 30 }, // Provérbios
      { name: "ROM", chapters: 16, verseRange: 30 }, // Romanos
      { name: "MAT", chapters: 28, verseRange: 40 }, // Mateus
      { name: "1CO", chapters: 16, verseRange: 30 }, // 1 Coríntios
      { name: "EPH", chapters: 6, verseRange: 25 }, // Efésios
      { name: "PHP", chapters: 4, verseRange: 25 }, // Filipenses
      { name: "COL", chapters: 4, verseRange: 25 }, // Colossenses
      { name: "1JN", chapters: 5, verseRange: 20 }, // 1 João
    ];
    
    // Seleciona um livro aleatório
    const randomBook = popularBooks[Math.floor(Math.random() * popularBooks.length)];
    
    // Seleciona um capítulo aleatório
    const randomChapter = Math.floor(Math.random() * randomBook.chapters) + 1;
    
    // Seleciona um versículo aleatório (estimativa)
    const randomVerse = Math.floor(Math.random() * randomBook.verseRange) + 1;
    
    // Referência completa
    const reference = `${randomBook.name}.${randomChapter}.${randomVerse}`;
    
    // Busca o versículo em cada idioma
    const [ptVerse, enVerse] = await Promise.all([
      fetchVerseByReference(reference, 'pt'),
      fetchVerseByReference(reference, 'en')
    ]);
    
    if (!ptVerse || !enVerse) {
      throw new Error("Não foi possível obter o versículo em todos os idiomas");
    }
    
    // Formata os dados
    return {
      reference: {
        pt: ptVerse.reference,
        en: enVerse.reference
      },
      text: {
        pt: ptVerse.text,
        en: enVerse.text
      },
      context: {
        pt: generateVerseContext(ptVerse, 'pt'),
        en: generateVerseContext(enVerse, 'en')
      }
    };
  } catch (error) {
    console.error("Erro ao buscar versículo aleatório:", error);
    return null;
  }
};

interface VerseResponse {
  reference: string;
  text: string;
}

/**
 * Busca um versículo específico por referência
 */
const fetchVerseByReference = async (
  reference: string,
  language: keyof BibleVersions
): Promise<VerseResponse | null> => {
  try {
    const bibleId = BIBLE_VERSIONS[language];
    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/passages/${reference}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-key": getBibleApiKey(),
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar versículo: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      reference: data.data.reference,
      text: data.data.content.trim()
    };
  } catch (error) {
    console.error(`Erro ao buscar versículo em ${language}:`, error);
    return null;
  }
};

/**
 * Gera uma contextualização para o versículo
 */
const generateVerseContext = (verse: VerseResponse, language: string): string => {
  // Aqui poderia ser integrado a uma API de IA para gerar contextualizações
  // Por enquanto, usamos mensagens pré-definidas simples baseadas na referência
  
  const contextMessages = {
    pt: [
      "Este versículo nos lembra do amor incondicional de Deus e como Ele está sempre presente em nossa jornada diária.",
      "Reflita sobre estas palavras de sabedoria durante o seu dia, permitindo que elas guiem suas decisões e atitudes.",
      "Em momentos de dificuldade, este versículo oferece conforto e esperança, mostrando que o plano de Deus é perfeito.",
      "A mensagem deste versículo nos encoraja a confiar em Deus completamente, mesmo quando não entendemos Seus caminhos.",
      "Através destas palavras, somos lembrados da importância da fé, do amor e da esperança em nossa caminhada cristã."
    ],
    en: [
      "This verse reminds us of God's unconditional love and how He is always present in our daily journey.",
      "Reflect on these words of wisdom throughout your day, allowing them to guide your decisions and attitudes.",
      "In times of difficulty, this verse offers comfort and hope, showing that God's plan is perfect.",
      "The message of this verse encourages us to trust God completely, even when we don't understand His ways.",
      "Through these words, we are reminded of the importance of faith, love, and hope in our Christian walk."
    ]
  };
  
  // Seleciona uma mensagem contextual aleatória
  const randomIndex = Math.floor(Math.random() * contextMessages[language as keyof typeof contextMessages].length);
  return contextMessages[language as keyof typeof contextMessages][randomIndex];
};

/**
 * Busca o versículo do dia, primeiro tentando da API e depois do fallback local
 */
export const getDailyVerse = async (): Promise<BibleVerse> => {
  try {
    // Primeiro tenta buscar um versículo aleatório da API
    const apiVerse = await fetchRandomVerse();
    
    if (apiVerse) {
      // Se conseguiu obter da API, retorna
      return apiVerse;
    } else {
      // Se não conseguiu obter da API, usa o fallback local
      return getFallbackDailyVerse();
    }
  } catch (error) {
    console.error("Erro ao buscar versículo do dia, usando fallback:", error);
    return getFallbackDailyVerse();
  }
};

/**
 * Versículo local de fallback caso a API falhe
 */
const getFallbackDailyVerse = (): BibleVerse => {
  // Seleciona um versículo com base no dia do ano
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  
  const verse = localVerses[dayOfYear % localVerses.length];
  
  // Retorna apenas com pt e en, removendo es
  return {
    reference: {
      pt: verse.reference.pt,
      en: verse.reference.en
    },
    text: {
      pt: verse.text.pt,
      en: verse.text.en
    },
    context: verse.context ? {
      pt: verse.context.pt,
      en: verse.context.en
    } : undefined
  };
};
