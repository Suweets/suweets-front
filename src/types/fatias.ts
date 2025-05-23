export interface FatiaType {
  id_fatia: string | number;
  nome_fatia: string;
  recheio: string;
  valor: number;
  massa?: string;
  cobertura?: string;
  peso_g?: number;
  ingredientes?: string[];
  categoria?: string;
  imageUrl?: string;
}

export interface IngredienteFormType {
  label: string;
  value: string;
}
