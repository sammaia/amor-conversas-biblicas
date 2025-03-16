
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Search, Book, ChevronRight, ArrowLeft } from 'lucide-react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllBooks,
  getChaptersForBook,
  getVersesForChapter,
  searchBible,
  BibleBook,
  BibleVerse,
  SearchResult
} from '@/services/bibleBrowseService';
import { useLanguage } from '@/context/LanguageContext';

const BibleBrowser = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Estados para a navegação na Bíblia
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Busca todos os livros da Bíblia
  const { data: books } = useQuery({
    queryKey: ['bible-books'],
    queryFn: () => getAllBooks(),
    initialData: []
  });

  // Busca os capítulos quando um livro é selecionado
  const { data: chapters } = useQuery({
    queryKey: ['bible-chapters', selectedBook?.id],
    queryFn: () => selectedBook ? getChaptersForBook(selectedBook.id) : [],
    enabled: !!selectedBook,
    initialData: []
  });

  // Busca os versículos quando um capítulo é selecionado
  const { 
    data: verses, 
    isLoading: versesLoading 
  } = useQuery({
    queryKey: ['bible-verses', selectedBook?.id, selectedChapter, language],
    queryFn: () => selectedBook && selectedChapter 
      ? getVersesForChapter(selectedBook.id, selectedChapter, language === 'pt-BR' ? 'pt' : 'en')
      : Promise.resolve([]),
    enabled: !!selectedBook && !!selectedChapter,
  });

  // Função para lidar com a pesquisa
  const handleSearch = async () => {
    if (!searchTerm || searchTerm.length < 3) return;
    
    setIsSearching(true);
    try {
      const results = await searchBible(searchTerm, language === 'pt-BR' ? 'pt' : 'en');
      setSearchResults(results);
    } catch (error) {
      console.error("Erro na pesquisa:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Lidar com a mudança no campo de pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Lidar com o clique no botão de pesquisa
  const handleSearchClick = () => {
    handleSearch();
  };

  // Lidar com a tecla Enter no campo de pesquisa
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Função para voltar à lista de livros
  const backToBooks = () => {
    setSelectedBook(null);
    setSelectedChapter(null);
  };

  // Função para voltar à lista de capítulos
  const backToChapters = () => {
    setSelectedChapter(null);
  };

  // Navegação hierárquica
  const renderBibleNavigation = () => {
    if (selectedBook && selectedChapter) {
      // Renderiza os versículos do capítulo selecionado
      return (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={backToChapters}
              className="mr-2"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t('back')}
            </Button>
            <h3 className="text-lg font-medium">
              {selectedBook.name} - {t('chapter')} {selectedChapter}
            </h3>
          </div>
          
          {versesLoading ? (
            <div className="py-10 text-center text-muted-foreground">
              {t('loading')}...
            </div>
          ) : (
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4">
                {verses?.map((verse) => (
                  <div key={verse.id} className="p-3 border-b">
                    <div className="flex">
                      <span className="font-bold text-primary mr-2">{verse.verseNumber}</span>
                      <p>{verse.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      );
    } else if (selectedBook) {
      // Renderiza os capítulos do livro selecionado
      return (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={backToBooks}
              className="mr-2"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t('back')}
            </Button>
            <h3 className="text-lg font-medium">{selectedBook.nameLong}</h3>
          </div>
          
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
            {chapters.map((chapter) => (
              <Button
                key={chapter}
                variant="outline"
                onClick={() => setSelectedChapter(chapter)}
                className="h-12 w-12"
              >
                {chapter}
              </Button>
            ))}
          </div>
        </div>
      );
    } else {
      // Renderiza a lista de livros
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">{t('bibleBooks')}</h3>
          
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {books.map((book) => (
              <Button
                key={book.id}
                variant="outline"
                onClick={() => setSelectedBook(book)}
                className="justify-between text-left h-auto py-3"
              >
                <div className="flex items-center">
                  <Book className="mr-2 h-4 w-4" />
                  <span>{book.name}</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      );
    }
  };

  // Renderiza os resultados da pesquisa
  const renderSearchResults = () => {
    if (searchResults.length === 0 && !isSearching) {
      return (
        <div className="py-10 text-center text-muted-foreground">
          {searchTerm ? t('noResults') : t('enterSearchTerm')}
        </div>
      );
    }

    if (isSearching) {
      return (
        <div className="py-10 text-center text-muted-foreground">
          {t('searching')}...
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('reference')}</TableHead>
            <TableHead>{t('text')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchResults.map((result, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{result.reference}</TableCell>
              <TableCell>{result.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">{t('bibleBrowser')}</h2>

      <div className="flex flex-col space-y-6 mb-8">
        <div className="flex w-full max-w-lg mx-auto">
          <Input
            type="text"
            placeholder={t('searchBible')}
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="mr-2"
          />
          <Button 
            onClick={handleSearchClick} 
            disabled={isSearching || searchTerm.length < 3}
          >
            <Search className="mr-2 h-4 w-4" />
            {t('search')}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="browse">{t('browse')}</TabsTrigger>
          <TabsTrigger value="search">{t('searchResults')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="mt-6">
          {renderBibleNavigation()}
        </TabsContent>
        
        <TabsContent value="search" className="mt-6">
          <ScrollArea className="h-[60vh]">
            {renderSearchResults()}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BibleBrowser;
