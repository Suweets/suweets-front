import axios from "axios";
import { UserType } from "../contexts/userContext";

interface UpdateProfilePayload {
  nome: string;
  sobrenome?: string;
  email?: string;
  telefone?: string;
  cpf?: string;
}

interface UpdateUserResponse {
  message: string;
  user: UserType;
}

export const updateUserProfileService = async ({
  userId,
  userData,
  token,
}: {
  userId: string | number;
  userData: UpdateProfilePayload;
  token: string | null;
}): Promise<UpdateUserResponse> => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/usuario/${userId}`,
    userData,
    config,
  );

  console.log("Dados enviados:", userData);
  console.log("Configuração", userId);
  console.log("Resposta:", response.data);
  return response.data;
};
