import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface UserType {
  id: string | number;
  id_usuario: string | number;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
}

interface UserContextType {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: UserType, token?: string) => void;
  logout: () => void;
  setUserState: (user: UserType | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("authToken");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: UserType, authToken?: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (authToken) {
      setToken(authToken);
      localStorage.setItem("authToken", authToken);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
    setToken(null);
  };

  const setUserState = (updatedUser: UserType | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
  
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setToken(null);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, token, isLoading, login, logout, setUserState }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
