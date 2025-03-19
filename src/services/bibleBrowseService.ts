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
  es: "592420522e16049f-01", // Reina Valera 1909
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

// Livros da Bíblia em inglês
const BIBLE_BOOKS_EN: BibleBook[] = [
  // Old Testament
  { id: "GEN", name: "Genesis", nameLong: "Genesis", chapters: 50 },
  { id: "EXO", name: "Exodus", nameLong: "Exodus", chapters: 40 },
  { id: "LEV", name: "Leviticus", nameLong: "Leviticus", chapters: 27 },
  { id: "NUM", name: "Numbers", nameLong: "Numbers", chapters: 36 },
  { id: "DEU", name: "Deuteronomy", nameLong: "Deuteronomy", chapters: 34 },
  { id: "JOS", name: "Joshua", nameLong: "Joshua", chapters: 24 },
  { id: "JDG", name: "Judges", nameLong: "Judges", chapters: 21 },
  { id: "RUT", name: "Ruth", nameLong: "Rute", chapters: 4 },
  { id: "1SA", name: "1 Samuel", nameLong: "First Samuel", chapters: 31 },
  { id: "2SA", name: "2 Samuel", nameLong: "Second Samuel", chapters: 24 },
  { id: "1KI", name: "1 Kings", nameLong: "First Kings", chapters: 22 },
  { id: "2KI", name: "2 Kings", nameLong: "Second Kings", chapters: 25 },
  { id: "1CH", name: "1 Chronicles", nameLong: "First Chronicles", chapters: 29 },
  { id: "2CH", name: "2 Chronicles", nameLong: "Second Chronicles", chapters: 36 },
  { id: "EZR", name: "Ezra", nameLong: "Ezra", chapters: 10 },
  { id: "NEH", name: "Nehemiah", nameLong: "Nehemiah", chapters: 13 },
  { id: "EST", name: "Esther", nameLong: "Esther", chapters: 10 },
  { id: "JOB", name: "Job", nameLong: "Job", chapters: 42 },
  { id: "PSA", name: "Psalms", nameLong: "Psalms", chapters: 150 },
  { id: "PRO", name: "Proverbs", nameLong: "Proverbs", chapters: 31 },
  { id: "ECC", name: "Ecclesiastes", nameLong: "Ecclesiastes", chapters: 12 },
  { id: "SNG", name: "Song of Solomon", nameLong: "Song of Solomon", chapters: 8 },
  { id: "ISA", name: "Isaiah", nameLong: "Isaiah", chapters: 66 },
  { id: "JER", name: "Jeremiah", nameLong: "Jeremiah", chapters: 52 },
  { id: "LAM", name: "Lamentations", nameLong: "Lamentations", chapters: 5 },
  { id: "EZK", name: "Ezekiel", nameLong: "Ezekiel", chapters: 48 },
  { id: "DAN", name: "Daniel", nameLong: "Daniel", chapters: 12 },
  { id: "HOS", name: "Hosea", nameLong: "Hosea", chapters: 14 },
  { id: "JOL", name: "Joel", nameLong: "Joel", chapters: 3 },
  { id: "AMO", name: "Amos", nameLong: "Amos", chapters: 9 },
  { id: "OBA", name: "Obadias", nameLong: "Obadias", chapters: 1 },
  { id: "JON", name: "Jonah", nameLong: "Jonah", chapters: 4 },
  { id: "MIC", name: "Micah", nameLong: "Micah", chapters: 7 },
  { id: "NAM", name: "Nahum", nameLong: "Nahum", chapters: 3 },
  { id: "HAB", name: "Habacuque", nameLong: "Habacuque", chapters: 3 },
  { id: "ZEP", name: "Zephaniah", nameLong: "Zephaniah", chapters: 3 },
  { id: "HAG", name: "Haggai", nameLong: "Haggai", chapters: 2 },
  { id: "ZEC", name: "Zechariah", nameLong: "Zechariah", chapters: 14 },
  { id: "MAL", name: "Malachi", nameLong: "Malachi", chapters: 4 },
  
  // New Testament
  { id: "MAT", name: "Matthew", nameLong: "Gospel of Matthew", chapters: 28 },
  { id: "MRK", name: "Mark", nameLong: "Gospel of Mark", chapters: 16 },
  { id: "LUK", name: "Luke", nameLong: "Gospel of Luke", chapters: 24 },
  { id: "JHN", name: "John", nameLong: "Gospel of John", chapters: 21 },
  { id: "ACT", name: "Acts", nameLong: "Acts of the Apostles", chapters: 28 },
  { id: "ROM", name: "Romans", nameLong: "Romans", chapters: 16 },
  { id: "1CO", name: "1 Corinthians", nameLong: "First Corinthians", chapters: 16 },
  { id: "2CO", name: "2 Corinthians", nameLong: "Second Corinthians", chapters: 13 },
  { id: "GAL", name: "Galatians", nameLong: "Galatians", chapters: 6 },
  { id: "EPH", name: "Ephesians", nameLong: "Ephesians", chapters: 6 },
  { id: "PHP", name: "Philippians", nameLong: "Philippians", chapters: 4 },
  { id: "COL", name: "Colossians", nameLong: "Colossians", chapters: 4 },
  { id: "1TH", name: "1 Thessalonians", nameLong: "First Thessalonians", chapters: 5 },
  { id: "2TH", name: "2 Thessalonians", nameLong: "Second Thessalonians", chapters: 3 },
  { id: "1TI", name: "1 Timothy", nameLong: "First Timothy", chapters: 6 },
  { id: "2TI", name: "2 Timothy", nameLong: "Second Timothy", chapters: 4 },
  { id: "TIT", name: "Titus", nameLong: "Titus", chapters: 3 },
  { id: "PHM", name: "Philemon", nameLong: "Philemon", chapters: 1 },
  { id: "HEB", name: "Hebrews", nameLong: "Hebrews", chapters: 13 },
  { id: "JAS", name: "James", nameLong: "James", chapters: 5 },
  { id: "1PE", name: "1 Peter", nameLong: "First Peter", chapters: 5 },
  { id: "2PE", name: "2 Peter", nameLong: "Second Peter", chapters: 3 },
  { id: "1JN", name: "1 John", nameLong: "First John", chapters: 5 },
  { id: "2JN", name: "2 John", nameLong: "Second John", chapters: 1 },
  { id: "3JN", name: "3 John", nameLong: "Third John", chapters: 1 },
  { id: "JUD", name: "Jude", nameLong: "Jude", chapters: 1 },
  { id: "REV", name: "Revelation", nameLong: "Revelation", chapters: 22 },
];

// Livros da Bíblia em português
const BIBLE_BOOKS_PT: BibleBook[] = [
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
  { id: "NEH", name: "Nehemias", nameLong: "Nehemias", chapters: 13 },
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

// Livros da Bíblia em espanhol
const BIBLE_BOOKS_ES: BibleBook[] = [
  // Antiguo Testamento
  { id: "GEN", name: "Génesis", nameLong: "Génesis", chapters: 50 },
  { id: "EXO", name: "Éxodo", nameLong: "Éxodo", chapters: 40 },
  { id: "LEV", name: "Levítico", nameLong: "Levítico", chapters: 27 },
  { id: "NUM", name: "Números", nameLong: "Números", chapters: 36 },
  { id: "DEU", name: "Deuteronomio", nameLong: "Deuteronomio", chapters: 34 },
  { id: "JOS", name: "Josué", nameLong: "Josué", chapters: 24 },
  { id: "JDG", name: "Jueces", nameLong: "Jueces", chapters: 21 },
  { id: "RUT", name: "Rut", nameLong: "Rut", chapters: 4 },
  { id: "1SA", name: "1 Samuel", nameLong: "Primer Samuel", chapters: 31 },
  { id: "2SA", name: "2 Samuel", nameLong: "Segundo Samuel", chapters: 24 },
  { id: "1KI", name: "1 Reyes", nameLong: "Primer Reyes", chapters: 22 },
  { id: "2KI", name: "2 Reyes", nameLong: "Segundo Reyes", chapters: 25 },
  { id: "1CH", name: "1 Crónicas", nameLong: "Primer Crónicas", chapters: 29 },
  { id: "2CH", name: "2 Crónicas", nameLong: "Segundo Crónicas", chapters: 36 },
  { id: "EZR", name: "Esdras", nameLong: "Esdras", chapters: 10 },
  { id: "NEH", name: "Nehemías", nameLong: "Nehemías", chapters: 13 },
  { id: "EST", name: "Ester", nameLong: "Ester", chapters: 10 },
  { id: "JOB", name: "Job", nameLong: "Job", chapters: 42 },
  { id: "PSA", name: "Salmos", nameLong: "Salmos", chapters: 150 },
  { id: "PRO", name: "Proverbios", nameLong: "Proverbios", chapters: 31 },
  { id: "ECC", name: "Eclesiastés", nameLong: "Eclesiastés", chapters: 12 },
  { id: "SNG", name: "Cantares", nameLong: "Cantar de los Cantares", chapters: 8 },
  { id: "ISA", name: "Isaías", nameLong: "Isaías", chapters: 66 },
  { id: "JER", name: "Jeremías", nameLong: "Jeremías", chapters: 52 },
  { id: "LAM", name: "Lamentaciones", nameLong: "Lamentaciones", chapters: 5 },
  { id: "EZK", name: "Ezequiel", nameLong: "Ezequiel", chapters: 48 },
  { id: "DAN", name: "Daniel", nameLong: "Daniel", chapters: 12 },
  { id: "HOS", name: "Oseas", nameLong: "Oseas", chapters: 14 },
  { id: "JOL", name: "Joel", nameLong: "Joel", chapters: 3 },
  { id: "AMO", name: "Amós", nameLong: "Amós", chapters: 9 },
  { id: "OBA", name: "Abdías", nameLong: "Abdías", chapters: 1 },
  { id: "JON", name: "Jonás", nameLong: "Jonás", chapters: 4 },
  { id: "MIC", name: "Miqueas", nameLong: "Miqueas", chapters: 7 },
  { id: "NAM", name: "Nahúm", nameLong: "Nahúm", chapters: 3 },
  { id: "HAB", name: "Habacuc", nameLong: "Habacuc", chapters: 3 },
  { id: "ZEP", name: "Sofonías", nameLong: "Sofonías", chapters: 3 },
  { id: "HAG", name: "Hageo", nameLong: "Hageo", chapters: 2 },
  { id: "ZEC", name: "Zacarías", nameLong: "Zacarías", chapters: 14 },
  { id: "MAL", name: "Malaquías", nameLong: "Malaquías", chapters: 4 },
  
  // Nuevo Testamento
  { id: "MAT", name: "Mateo", nameLong: "Evangelio según Mateo", chapters: 28 },
  { id: "MRK", name: "Marcos", nameLong: "Evangelio según Marcos", chapters: 16 },
  { id: "LUK", name: "Lucas", nameLong: "Evangelio según Lucas", chapters: 24 },
  { id: "JHN", name: "Juan", nameLong: "Evangelio según Juan", chapters: 21 },
  { id: "ACT", name: "Hechos", nameLong: "Hechos de los Apóstoles", chapters: 28 },
  { id: "ROM", name: "Romanos", nameLong: "Romanos", chapters: 16 },
  { id: "1CO", name: "1 Corintios", nameLong: "Primera Carta a los Corintios", chapters: 16 },
  { id: "2CO", name: "2 Corintios", nameLong: "Segunda Carta a los Corintios", chapters: 13 },
  { id: "GAL", name: "Gálatas", nameLong: "Gálatas", chapters: 6 },
  { id: "EPH", name: "Efesios", nameLong: "Efesios", chapters: 6 },
  { id: "PHP", name: "Filipenses", nameLong: "Filipenses", chapters: 4 },
  { id: "COL", name: "Colosenses", nameLong: "Colosenses", chapters: 4 },
  { id: "1TH", name: "1 Tesalonicenses", nameLong: "Primera Carta a los Tesalonicenses", chapters: 5 },
  { id: "2TH", name: "2 Tesalonicenses", nameLong: "Segunda Carta a los Tesalonicenses", chapters: 3 },
  { id: "1TI", name: "1 Timoteo", nameLong: "Primera Carta a Timoteo", chapters: 6 },
  { id: "2TI", name: "2 Timoteo", nameLong: "Segunda Carta a Timoteo", chapters: 4 },
  { id: "TIT", name: "Tito", nameLong: "Carta a Tito", chapters: 3 },
  { id: "PHM", name: "Filemón", nameLong: "Carta a Filemón", chapters: 1 },
  { id: "HEB", name: "Hebreos", nameLong: "Carta a los Hebreos", chapters: 13 },
  { id: "JAS", name: "Santiago", nameLong: "Carta de Santiago", chapters: 5 },
  { id: "1PE", name: "1 Pedro", nameLong: "Primera Carta de Pedro", chapters: 5 },
  { id: "2PE", name: "2 Pedro", nameLong: "Segunda Carta de Pedro", chapters: 3 },
  { id: "1JN", name: "1 Juan", nameLong: "Primera Carta de Juan", chapters: 5 },
  { id: "2JN", name: "2 Juan", nameLong: "Segunda Carta de Juan", chapters: 1 },
  { id: "3JN", name: "3 Juan", nameLong: "Tercera Carta de Juan", chapters: 1 },
  { id: "JUD", name: "Judas", nameLong: "Carta de Judas", chapters: 1 },
  { id: "REV", name: "Apocalipsis", nameLong: "Apocalipsis", chapters: 22 },
];

// Obtém a chave de API da Bíblia
const getBibleApiKey = (): string => {
  const apiKey = getConfig(ConfigKeys.BIBLE_API_KEY);
  // Use uma chave padrão apenas para fallback se necessário
  return apiKey || "62f59770e58ad92c1e32269ea76f695e";
};

// Retorna todos os livros da Bíblia no idioma selecionado
export const getAllBooks = (language: string = 'pt'): BibleBook[] => {
  if (language.startsWith('es')) {
    return BIBLE_BOOKS_ES;
  }
  if (language.startsWith('en')) {
    return BIBLE_BOOKS_EN;
  }
  return BIBLE_BOOKS_PT; // padrão para pt
};

// Retorna um livro específico pelo ID
export const getBookById = (bookId: string, language: string = 'pt'): BibleBook | undefined => {
  return getAllBooks(language).find(book => book.id === bookId);
};

// Gera um array com os números dos capítulos para um livro específico
export const getChaptersForBook = (bookId: string): number[] => {
  const book = getBookById(bookId);
  if (!book) return [];
  
  // Gera um array de 1 até o número de capítulos
  return Array.from({ length: book.chapters }, (_, i) => i + 1);
};

// Determina o idioma para a API da Bíblia baseado no idioma da UI
const getBibleApiLanguage = (language: string): 'pt' | 'en' | 'es' => {
  if (language.startsWith('es')) return 'es';
  if (language.startsWith('en')) return 'en';
  return 'pt';
};

// Busca os versículos de um capítulo específico
export const getVersesForChapter = async (
  bookId: string,
  chapterNumber: number,
  language: string = 'pt'
): Promise<BibleVerse[]> => {
  try {
    const apiLanguage = getBibleApiLanguage(language);
    const bibleId = BIBLE_VERSIONS[apiLanguage];
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
  language: string = 'pt'
): Promise<string> => {
  try {
    const apiLanguage = getBibleApiLanguage(language);
    const bibleId = BIBLE_VERSIONS[apiLanguage];
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

// Função para buscar na Bíblia
export const searchBible = async (
  searchTerm: string,
  language: string = 'pt'
): Promise<SearchResult[]> => {
  try {
    const apiLanguage = getBibleApiLanguage(language);
    const bibleId = BIBLE_VERSIONS[apiLanguage];
    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${encodeURIComponent(searchTerm)}&limit=20`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-key": getBibleApiKey(),
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao realizar busca: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Verifica se há resultados antes de processá-los
    if (!data.data || !data.data.verses || data.data.verses.length === 0) {
      return [];
    }
    
    // Mapeia os resultados para o formato esperado
    const results: SearchResult[] = data.data.verses.map((verse: any) => {
      // Extrai o ID do livro, capítulo e versículo da referência
      const [bookId, chapter, verseNum] = verse.reference.split('.');
      const book = getBookById(bookId, language);
      
      return {
        book: book?.name || bookId,
        chapter: parseInt(chapter, 10),
        verse: parseInt(verseNum, 10),
        text: verse.text,
        reference: `${book?.name || bookId} ${chapter}:${verseNum}`
      };
    });
    
    return results;
  } catch (error) {
    console.error("Erro ao buscar na Bíblia:", error);
    return [];
  }
};
