import axios from "axios";
import { userLogin } from "../types/user";

export const loginUser = async (userData: userLogin) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/usuario/login`,
    userData,
  );

  console.log(response.data);
  return response.data;
};
