export interface ICreateProduct {
  brand: string;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  update_at: string;
}

export interface IUpdateProduct {
  brand: string;
  category: string;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  update_at: string;
  quantity: number;
}
