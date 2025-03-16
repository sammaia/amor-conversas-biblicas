
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-sky-100 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-serif text-sky-700 text-xl font-medium flex items-center">
          <Heart className="h-5 w-5 mr-2 text-sky-600 fill-sky-100" />
          {t("appName")}
        </Link>

        <nav className="flex items-center gap-3">
          <LanguageSelector />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 px-3 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium truncate max-w-[100px]">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-sky-100">
                <DropdownMenuLabel className="text-sky-700">{t("account")}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-sky-100" />
                <DropdownMenuItem disabled className="hover:bg-sky-50 hover:text-sky-700 cursor-pointer transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("profile")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-sky-100" />
                <DropdownMenuItem 
                  onClick={logout} 
                  className="text-red-500 focus:text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="h-9 px-3 text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                <span className="font-medium">{t("login")}</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
