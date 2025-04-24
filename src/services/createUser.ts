import axios from "axios";
import { userRegister } from "../types/user";

export const createUser = async (userData: userRegister) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/usuario`,
    userData,
  );
  return response.data;
};
