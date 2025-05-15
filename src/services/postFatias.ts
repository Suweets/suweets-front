import axios from "axios";

interface Fatia {
  nome: string;
  massa: string;
  recheio: string;
  cobertura: string;
  peso_g: number;
  valor: number;
}

interface FatiasData {
  fatia: Fatia;
  ingredientes: string[];
}

export const postFatias = async (fatiasData: FatiasData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_FATIAS_URL}/fatias`,
    fatiasData,
  );

  console.log(response.data);
  return response.data;
};
