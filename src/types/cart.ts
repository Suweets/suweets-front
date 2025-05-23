import { FatiaType } from "./fatias";

export interface CartItemType {
  id: string | number;
  name: string;
  weight?: string;
  unitPrice: number;
  quantity: number;
}

export interface ProductRecommendationType extends FatiaType {
  id_fatia: string | number;
  nome_fatia: string;
  recheio: string;
  valor: number;
  imageUrl?: string;
}
