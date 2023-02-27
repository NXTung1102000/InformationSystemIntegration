export interface IProduct {
  product_id: number;
  product_name: string;
  quantity: number;
}

export interface IResponseHistory {
  id: number;
  user_id: number;
  cart_id: number;
  created_at: string;
  data: IProduct[];
  first_name: string;
  last_name: string;
  status: string;
  total: number;
}
