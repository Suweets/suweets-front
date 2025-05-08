import axios from "axios";

export const getFatias = async (fatias: any) => {
  const response = await axios.get(
    `${import.meta.env.VITE_FATIAS_URL}/fatias`,
    fatias,
  );
  return response.data.fatias;
};
