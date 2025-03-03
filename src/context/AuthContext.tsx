
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

// Define user type
interface User {
  id: string;
  email: string;
  name: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, we're simulating a login
      // In a real app, you would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation
      if (email === "demo@example.com" && password === "password") {
        const newUser = {
          id: "user-1",
          email,
          name: "Usuário Demo",
        };
        
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        return;
      }
      
      throw new Error("Credenciais inválidas");
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, we're simulating registration
      // In a real app, you would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation (in a real app, you'd have proper validation)
      if (!name || !email || !password) {
        throw new Error("Todos os campos são obrigatórios");
      }
      
      if (password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Registro realizado com sucesso",
        description: "Bem-vindo ao Deus é Amor!",
      });
    } catch (error) {
      toast({
        title: "Erro ao registrar",
        description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logout realizado com sucesso",
      description: "Esperamos vê-lo novamente em breve!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
