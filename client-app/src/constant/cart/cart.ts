import { NameCategory } from "../category/name";

export interface ICartItem {
  id: number;
  name: string;
  category: NameCategory;
  price: number;
  quantity: number;
}
export interface ICartState {
  itemsList: ICartItem[];
}
