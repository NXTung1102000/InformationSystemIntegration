import { NameCategory } from "../category/name";

export interface ICartItem {
  id: string | number;
  name: string;
  category: NameCategory;
  price: number;
  quantity: number;
  star: number;
  img: string;
  description: string;
}
export interface ICartState {
  itemsList: ICartItem[];
}
