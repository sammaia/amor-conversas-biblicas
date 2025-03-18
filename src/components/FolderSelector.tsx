import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/chat";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderPlus, Folder, Plus, X } from "lucide-react";

interface FolderSelectorProps {
  messageId: string;
  onClose: () => void;
}

const FolderSelector = ({ messageId, onClose }: FolderSelectorProps) => {
  const { t } = useLanguage();
  const { folders, createFolder, addMessageToFolder } = useChat();
  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") return;
    
    createFolder(newFolderName);
    setNewFolderName("");
    setShowNewFolderInput(false);
  };

  const handleSelectFolder = (folderId: string) => {
    addMessageToFolder(messageId, folderId);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newFolderName.trim() !== "") {
      handleCreateFolder();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-sky-100 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-sky-50 to-white">
          <DialogTitle className="text-sky-700 text-xl">{t("addToFolder")}</DialogTitle>
          <DialogDescription>
            {folders.length === 0 && !showNewFolderInput 
              ? t("noFolders") 
              : t("selectFolder")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-2">
          {showNewFolderInput ? (
            <div className="flex items-center gap-2 mt-4 mb-2">
              <Input
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder={t("folderName")}
                className="flex-1 border-sky-100 focus-visible:ring-sky-500"
                autoFocus
                onKeyPress={handleKeyPress}
              />
              <Button 
                onClick={handleCreateFolder} 
                variant="outline"
                className="border-sky-100 hover:bg-sky-50 hover:text-sky-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t("save")}
              </Button>
              <Button 
                onClick={() => setShowNewFolderInput(false)} 
                variant="ghost"
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-2 py-4">
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant="outline"
                    className="justify-start border-sky-100 hover:bg-sky-50 hover:text-sky-700 transition-colors text-slate-700"
                    onClick={() => handleSelectFolder(folder.id)}
                  >
                    <Folder className="mr-2 h-4 w-4" />
                    {folder.name}
                  </Button>
                ))}
              </div>
              
              <DialogFooter className="mt-4">
                <Button
                  onClick={() => setShowNewFolderInput(true)}
                  variant="outline"
                  className="gap-1.5 border-sky-100 hover:bg-sky-50 hover:text-sky-700 w-full justify-center"
                >
                  <FolderPlus className="h-4 w-4" />
                  {t("newFolder")}
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderSelector;
