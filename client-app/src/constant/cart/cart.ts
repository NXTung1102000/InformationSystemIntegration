import { NameCategory } from "../tabRedirect/name";

export interface ICartItem {
  id: string | number;
  name: string;
  category: NameCategory;
  price: number;
  quantity: number;
  quantityInCart: number;
  star: number;
  image: string;
  description: string;
}
export interface ICartState {
  itemsList: ICartItem[];
}
