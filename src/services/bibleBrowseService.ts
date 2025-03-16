
import { getConfig } from "./configService";
import { ConfigKeys } from "./configService";

// Interface para os livros da Bíblia
export interface BibleBook {
  id: string;
  name: string;
  nameLong: string;
  chapters: number;
}

// Interface para os capítulos da Bíblia
export interface BibleChapter {
  id: string;
  bookId: string;
  number: number;
  verseCount: number;
}

// Interface para os versículos da Bíblia
export interface BibleVerse {
  id: string;
  bookId: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
}

// Interface para os resultados da busca
export interface SearchResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  reference: string;
}

// IDs das versões da Bíblia na API para cada idioma
const BIBLE_VERSIONS = {
  pt: "b730fb6bd36cf26a-01", // Almeida Revista e Atualizada
  en: "de4e12af7f28f599-01", // King James Version (KJV)
};

// Mapeamento de abreviações para os identificadores da API
const BOOK_ID_MAP: Record<string, string> = {
  // Antigo Testamento
  "GEN": "GEN", // Gênesis
  "EXO": "EXO", // Êxodo
  "LEV": "LEV", // Levítico
  "NUM": "NUM", // Números
  "DEU": "DEU", // Deuteronômio
  "JOS": "JOS", // Josué
  "JDG": "JDG", // Juízes
  "RUT": "RUT", // Rute
  "1SA": "1SA", // 1 Samuel
  "2SA": "2SA", // 2 Samuel
  "1KI": "1KI", // 1 Reis
  "2KI": "2KI", // 2 Reis
  "1CH": "1CH", // 1 Crônicas
  "2CH": "2CH", // 2 Crônicas
  "EZR": "EZR", // Esdras
  "NEH": "NEH", // Neemias
  "EST": "EST", // Ester
  "JOB": "JOB", // Jó
  "PSA": "PSA", // Salmos
  "PRO": "PRO", // Provérbios
  "ECC": "ECC", // Eclesiastes
  "SNG": "SNG", // Cânticos
  "ISA": "ISA", // Isaías
  "JER": "JER", // Jeremias
  "LAM": "LAM", // Lamentações
  "EZK": "EZK", // Ezequiel
  "DAN": "DAN", // Daniel
  "HOS": "HOS", // Oséias
  "JOL": "JOL", // Joel
  "AMO": "AMO", // Amós
  "OBA": "OBA", // Obadias
  "JON": "JON", // Jonas
  "MIC": "MIC", // Miquéias
  "NAM": "NAM", // Naum
  "HAB": "HAB", // Habacuque
  "ZEP": "ZEP", // Sofonias
  "HAG": "HAG", // Ageu
  "ZEC": "ZEC", // Zacarias
  "MAL": "MAL", // Malaquias
  
  // Novo Testamento
  "MAT": "MAT", // Mateus
  "MRK": "MRK", // Marcos
  "LUK": "LUK", // Lucas
  "JHN": "JHN", // João
  "ACT": "ACT", // Atos
  "ROM": "ROM", // Romanos
  "1CO": "1CO", // 1 Coríntios
  "2CO": "2CO", // 2 Coríntios
  "GAL": "GAL", // Gálatas
  "EPH": "EPH", // Efésios
  "PHP": "PHP", // Filipenses
  "COL": "COL", // Colossenses
  "1TH": "1TH", // 1 Tessalonicenses
  "2TH": "2TH", // 2 Tessalonicenses
  "1TI": "1TI", // 1 Timóteo
  "2TI": "2TI", // 2 Timóteo
  "TIT": "TIT", // Tito
  "PHM": "PHM", // Filemom
  "HEB": "HEB", // Hebreus
  "JAS": "JAS", // Tiago
  "1PE": "1PE", // 1 Pedro
  "2PE": "2PE", // 2 Pedro
  "1JN": "1JN", // 1 João
  "2JN": "2JN", // 2 João
  "3JN": "3JN", // 3 João
  "JUD": "JUD", // Judas
  "REV": "REV", // Apocalipse
};

// Lista de livros da Bíblia
const BIBLE_BOOKS: BibleBook[] = [
  // Antigo Testamento
  { id: "GEN", name: "Gênesis", nameLong: "Gênesis", chapters: 50 },
  { id: "EXO", name: "Êxodo", nameLong: "Êxodo", chapters: 40 },
  { id: "LEV", name: "Levítico", nameLong: "Levítico", chapters: 27 },
  { id: "NUM", name: "Números", nameLong: "Números", chapters: 36 },
  { id: "DEU", name: "Deuteronômio", nameLong: "Deuteronômio", chapters: 34 },
  { id: "JOS", name: "Josué", nameLong: "Josué", chapters: 24 },
  { id: "JDG", name: "Juízes", nameLong: "Juízes", chapters: 21 },
  { id: "RUT", name: "Rute", nameLong: "Rute", chapters: 4 },
  { id: "1SA", name: "1 Samuel", nameLong: "Primeiro Samuel", chapters: 31 },
  { id: "2SA", name: "2 Samuel", nameLong: "Segundo Samuel", chapters: 24 },
  { id: "1KI", name: "1 Reis", nameLong: "Primeiro Reis", chapters: 22 },
  { id: "2KI", name: "2 Reis", nameLong: "Segundo Reis", chapters: 25 },
  { id: "1CH", name: "1 Crônicas", nameLong: "Primeiro Crônicas", chapters: 29 },
  { id: "2CH", name: "2 Crônicas", nameLong: "Segundo Crônicas", chapters: 36 },
  { id: "EZR", name: "Esdras", nameLong: "Esdras", chapters: 10 },
  { id: "NEH", name: "Neemias", nameLong: "Neemias", chapters: 13 },
  { id: "EST", name: "Ester", nameLong: "Ester", chapters: 10 },
  { id: "JOB", name: "Jó", nameLong: "Jó", chapters: 42 },
  { id: "PSA", name: "Salmos", nameLong: "Salmos", chapters: 150 },
  { id: "PRO", name: "Provérbios", nameLong: "Provérbios", chapters: 31 },
  { id: "ECC", name: "Eclesiastes", nameLong: "Eclesiastes", chapters: 12 },
  { id: "SNG", name: "Cantares", nameLong: "Cântico dos Cânticos", chapters: 8 },
  { id: "ISA", name: "Isaías", nameLong: "Isaías", chapters: 66 },
  { id: "JER", name: "Jeremias", nameLong: "Jeremias", chapters: 52 },
  { id: "LAM", name: "Lamentações", nameLong: "Lamentações de Jeremias", chapters: 5 },
  { id: "EZK", name: "Ezequiel", nameLong: "Ezequiel", chapters: 48 },
  { id: "DAN", name: "Daniel", nameLong: "Daniel", chapters: 12 },
  { id: "HOS", name: "Oséias", nameLong: "Oséias", chapters: 14 },
  { id: "JOL", name: "Joel", nameLong: "Joel", chapters: 3 },
  { id: "AMO", name: "Amós", nameLong: "Amós", chapters: 9 },
  { id: "OBA", name: "Obadias", nameLong: "Obadias", chapters: 1 },
  { id: "JON", name: "Jonas", nameLong: "Jonas", chapters: 4 },
  { id: "MIC", name: "Miquéias", nameLong: "Miquéias", chapters: 7 },
  { id: "NAM", name: "Naum", nameLong: "Naum", chapters: 3 },
  { id: "HAB", name: "Habacuque", nameLong: "Habacuque", chapters: 3 },
  { id: "ZEP", name: "Sofonias", nameLong: "Sofonias", chapters: 3 },
  { id: "HAG", name: "Ageu", nameLong: "Ageu", chapters: 2 },
  { id: "ZEC", name: "Zacarias", nameLong: "Zacarias", chapters: 14 },
  { id: "MAL", name: "Malaquias", nameLong: "Malaquias", chapters: 4 },
  
  // Novo Testamento
  { id: "MAT", name: "Mateus", nameLong: "Evangelho de Mateus", chapters: 28 },
  { id: "MRK", name: "Marcos", nameLong: "Evangelho de Marcos", chapters: 16 },
  { id: "LUK", name: "Lucas", nameLong: "Evangelho de Lucas", chapters: 24 },
  { id: "JHN", name: "João", nameLong: "Evangelho de João", chapters: 21 },
  { id: "ACT", name: "Atos", nameLong: "Atos dos Apóstolos", chapters: 28 },
  { id: "ROM", name: "Romanos", nameLong: "Romanos", chapters: 16 },
  { id: "1CO", name: "1 Coríntios", nameLong: "Primeira Carta aos Coríntios", chapters: 16 },
  { id: "2CO", name: "2 Coríntios", nameLong: "Segunda Carta aos Coríntios", chapters: 13 },
  { id: "GAL", name: "Gálatas", nameLong: "Gálatas", chapters: 6 },
  { id: "EPH", name: "Efésios", nameLong: "Efésios", chapters: 6 },
  { id: "PHP", name: "Filipenses", nameLong: "Filipenses", chapters: 4 },
  { id: "COL", name: "Colossenses", nameLong: "Colossenses", chapters: 4 },
  { id: "1TH", name: "1 Tessalonicenses", nameLong: "Primeira Carta aos Tessalonicenses", chapters: 5 },
  { id: "2TH", name: "2 Tessalonicenses", nameLong: "Segunda Carta aos Tessalonicenses", chapters: 3 },
  { id: "1TI", name: "1 Timóteo", nameLong: "Primeira Carta a Timóteo", chapters: 6 },
  { id: "2TI", name: "2 Timóteo", nameLong: "Segunda Carta a Timóteo", chapters: 4 },
  { id: "TIT", name: "Tito", nameLong: "Carta a Tito", chapters: 3 },
  { id: "PHM", name: "Filemom", nameLong: "Carta a Filemom", chapters: 1 },
  { id: "HEB", name: "Hebreus", nameLong: "Carta aos Hebreus", chapters: 13 },
  { id: "JAS", name: "Tiago", nameLong: "Carta de Tiago", chapters: 5 },
  { id: "1PE", name: "1 Pedro", nameLong: "Primeira Carta de Pedro", chapters: 5 },
  { id: "2PE", name: "2 Pedro", nameLong: "Segunda Carta de Pedro", chapters: 3 },
  { id: "1JN", name: "1 João", nameLong: "Primeira Carta de João", chapters: 5 },
  { id: "2JN", name: "2 João", nameLong: "Segunda Carta de João", chapters: 1 },
  { id: "3JN", name: "3 João", nameLong: "Terceira Carta de João", chapters: 1 },
  { id: "JUD", name: "Judas", nameLong: "Carta de Judas", chapters: 1 },
  { id: "REV", name: "Apocalipse", nameLong: "Apocalipse de João", chapters: 22 },
];

// Obtém a chave de API da Bíblia
const getBibleApiKey = (): string => {
  const apiKey = getConfig(ConfigKeys.BIBLE_API_KEY);
  // Use uma chave padrão apenas para fallback se necessário
  return apiKey || "62f59770e58ad92c1e32269ea76f695e";
};

// Retorna todos os livros da Bíblia
export const getAllBooks = (): BibleBook[] => {
  return BIBLE_BOOKS;
};

// Retorna um livro específico pelo ID
export const getBookById = (bookId: string): BibleBook | undefined => {
  return BIBLE_BOOKS.find(book => book.id === bookId);
};

// Gera um array com os números dos capítulos para um livro específico
export const getChaptersForBook = (bookId: string): number[] => {
  const book = getBookById(bookId);
  if (!book) return [];
  
  // Gera um array de 1 até o número de capítulos
  return Array.from({ length: book.chapters }, (_, i) => i + 1);
};

// Busca os versículos de um capítulo específico
export const getVersesForChapter = async (
  bookId: string,
  chapterNumber: number,
  language: 'pt' | 'en' = 'pt'
): Promise<BibleVerse[]> => {
  try {
    const bibleId = BIBLE_VERSIONS[language];
    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${bookId}.${chapterNumber}/verses`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-key": getBibleApiKey(),
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar versículos: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Mapeia os versos retornados para o nosso formato
    const verses: BibleVerse[] = [];
    
    // Busca o conteúdo de cada versículo individualmente
    for (const verse of data.data) {
      const verseId = verse.id.split('.').pop() || '';
      const verseNumber = parseInt(verseId, 10);
      
      const verseContent = await getVerseContent(bookId, chapterNumber, verseNumber, language);
      
      verses.push({
        id: verse.id,
        bookId: bookId,
        chapterNumber: chapterNumber,
        verseNumber: verseNumber,
        text: verseContent || verse.reference
      });
    }
    
    // Ordena os versículos pelo número
    return verses.sort((a, b) => a.verseNumber - b.verseNumber);
  } catch (error) {
    console.error("Erro ao buscar versículos do capítulo:", error);
    return [];
  }
};

// Busca o conteúdo de um versículo específico
export const getVerseContent = async (
  bookId: string,
  chapterNumber: number,
  verseNumber: number,
  language: 'pt' | 'en' = 'pt'
): Promise<string> => {
  try {
    const bibleId = BIBLE_VERSIONS[language];
    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${bookId}.${chapterNumber}.${verseNumber}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-key": getBibleApiKey(),
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar conteúdo do versículo: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data.content.trim();
  } catch (error) {
    console.error("Erro ao buscar conteúdo do versículo:", error);
    return "";
  }
};

// Busca versículos que contenham o termo específico
export const searchBible = async (
  searchTerm: string,
  language: 'pt' | 'en' = 'pt'
): Promise<SearchResult[]> => {
  try {
    const bibleId = BIBLE_VERSIONS[language];
    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${encodeURIComponent(searchTerm)}&limit=25`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-key": getBibleApiKey(),
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    const results: SearchResult[] = data.data.verses.map((verse: any) => {
      // Extrair o ID do livro, capítulo e número do versículo da referência
      const parts = verse.reference.split(":");
      const bookChapter = parts[0].trim();
      const verseNumber = parseInt(parts[1], 10);
      
      // Separar o livro e o capítulo
      let bookName = "";
      let chapterNumber = 0;
      
      for (const book of BIBLE_BOOKS) {
        // Verifica se o nome do livro está no início da referência
        if (language === 'pt' && bookChapter.startsWith(book.name)) {
          bookName = book.name;
          // Extrai o número do capítulo após o nome do livro
          const chapterStr = bookChapter.substring(book.name.length).trim();
          chapterNumber = parseInt(chapterStr, 10);
          break;
        }
      }
      
      return {
        book: bookName,
        chapter: chapterNumber,
        verse: verseNumber,
        text: verse.text,
        reference: verse.reference
      };
    });
    
    return results;
  } catch (error) {
    console.error("Erro na busca da Bíblia:", error);
    return [];
  }
};

// Inicializa os dados de teste se necessário
export const initBibleData = () => {
  // Esta função pode ser usada para inicializar dados locais se necessário
  console.log("Dados da Bíblia inicializados");
};
