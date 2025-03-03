
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useChat } from "@/context/ChatContext";
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
import { FolderPlus, Folder } from "lucide-react";

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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("addToFolder")}</DialogTitle>
          <DialogDescription>
            {folders.length === 0 && !showNewFolderInput 
              ? t("noFolders") 
              : t("selectFolder")}
          </DialogDescription>
        </DialogHeader>
        
        {showNewFolderInput ? (
          <div className="flex items-center gap-2 mt-4">
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder={t("folderName")}
              className="flex-1"
              autoFocus
            />
            <Button onClick={handleCreateFolder} variant="outline">
              {t("save")}
            </Button>
            <Button 
              onClick={() => setShowNewFolderInput(false)} 
              variant="ghost"
            >
              {t("cancel")}
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-2 py-4">
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSelectFolder(folder.id)}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  {folder.name}
                </Button>
              ))}
            </div>
            
            <DialogFooter>
              <Button
                onClick={() => setShowNewFolderInput(true)}
                variant="outline"
                className="gap-1.5"
              >
                <FolderPlus className="h-4 w-4" />
                {t("newFolder")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FolderSelector;
