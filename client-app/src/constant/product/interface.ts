export interface ICreateProduct {
  brand: string;
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  created_date: string;
}

export interface IUpdateProduct {
  brand: string;
  category: string;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  created_date: string;
  quantity: number;
}
