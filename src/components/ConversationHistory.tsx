
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
import { format } from "date-fns";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Search, 
  PlusCircle,
  Clock,
  X,
  Star,
  Folder,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ConversationHistoryProps {
  open: boolean;
  onClose: () => void;
}

const ConversationHistory = ({ open, onClose }: ConversationHistoryProps) => {
  const { t } = useLanguage();
  const { 
    conversations, 
    loadConversation, 
    startNewConversation, 
    folders,
    getFavoritedMessages,
    getMessagesInFolder,
  } = useChat();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("history");
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  const handleSelectConversation = (conversationId: string) => {
    loadConversation(conversationId);
    onClose();
  };

  const handleStartNewConversation = () => {
    startNewConversation();
    onClose();
  };

  const filteredConversations = conversations.filter((conv) => 
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.messages.some((msg) => 
      msg.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const favoritedMessages = getFavoritedMessages();
  const filteredFavorites = favoritedMessages.filter((msg) =>
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderHistoryTab = () => (
    <div className="mt-4 space-y-2">
      <Button
        onClick={handleStartNewConversation}
        variant="outline"
        className="w-full justify-start gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        {t("newConversation")}
      </Button>
      
      {filteredConversations.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          {searchTerm ? t("noSearchResults") : t("noConversations")}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredConversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium truncate">
                    {conversation.title || t("conversation")}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(new Date(conversation.updatedAt), "PP")}
                  </div>
                  {conversation.messages.length > 1 && (
                    <div className="text-xs text-slate-500 truncate mt-1">
                      {conversation.messages[conversation.messages.length - 1].text}
                    </div>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  const renderFavoritesTab = () => (
    <div className="mt-4 space-y-2">
      {filteredFavorites.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          {searchTerm ? t("noSearchResults") : t("noFavorites")}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredFavorites.map((message) => (
            <div
              key={message.id}
              className="p-3 rounded-lg border border-slate-200 bg-white"
            >
              <div className="text-sm">{message.text}</div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs text-slate-500">
                  {format(new Date(message.timestamp), "PP")}
                </div>
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
                  <span className="text-xs text-slate-500">{t("favorite")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderFoldersTab = () => {
    if (activeFolderId) {
      const folder = folders.find(f => f.id === activeFolderId);
      const messages = getMessagesInFolder(activeFolderId);
      const filteredMessages = messages.filter(msg => 
        msg.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return (
        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="mb-2"
            onClick={() => setActiveFolderId(null)}
          >
            <X className="h-4 w-4 mr-1" /> {t("back")}
          </Button>
          
          <h3 className="font-medium mb-3">{folder?.name}</h3>
          
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              {searchTerm ? t("noSearchResults") : t("emptyFolder")}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className="p-3 rounded-lg border border-slate-200 bg-white"
                >
                  <div className="text-sm">{message.text}</div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                      {format(new Date(message.timestamp), "PP")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="mt-4 space-y-2">
        {folders.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            {t("noFolders")}
          </div>
        ) : (
          <div className="space-y-2">
            {folders.map((folder) => (
              <Button
                key={folder.id}
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => setActiveFolderId(folder.id)}
              >
                <Folder className="h-4 w-4" />
                <span>{folder.name}</span>
                <span className="ml-auto text-xs text-slate-500">
                  {folder.messageIds.length}
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>{t("conversationHistory")}</SheetTitle>
          <SheetDescription>
            {t("manageConversations")}
          </SheetDescription>
        </SheetHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder={t("search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs
          defaultValue="history"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="history">
              {t("history")}
            </TabsTrigger>
            <TabsTrigger value="favorites">
              {t("favorites")}
            </TabsTrigger>
            <TabsTrigger value="folders">
              {t("folders")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            {renderHistoryTab()}
          </TabsContent>
          
          <TabsContent value="favorites">
            {renderFavoritesTab()}
          </TabsContent>
          
          <TabsContent value="folders">
            {renderFoldersTab()}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default ConversationHistory;
