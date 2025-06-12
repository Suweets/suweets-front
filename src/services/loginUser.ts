import axios from "axios";
import { userLogin } from "../types/user";
import { UserType } from "../contexts/userContext";

export const loginUser = async (
  userData: userLogin,
): Promise<{ userInfo: UserType[]; token?: string }> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/usuario/login`,
    userData,
  );
  if (response.data && response.data.userInfo) {
    return response.data;
  } else {
    console.error("Erro na response:", response.data);
    throw new Error("Ero ao fazer login.");
  }
};
