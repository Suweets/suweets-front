export interface userRegister {
  nome: string;
  email: string;
  password: string;
  sobrenome?: string | undefined;
  cpf?: string | undefined;
  telefone?: string | undefined;
}

export interface userLogin {
  email: string;
  password: string;
}
