import { createContext, useContext, useState, ReactNode } from "react";

export type User = {
  cpf: string;
  nome: string;
  sobrenome: string;
  telefone: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext value={{ user, setUser, logout }}>{children}</UserContext>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um <Use>");
  }
  return context;
};
