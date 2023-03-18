export interface IProduct {
  product_id: number;
  product_name: string;
  quantity: number;
}

export interface IResponseHistory {
  id: number;
  user_id: number;
  created_date: string;
  data: IProduct[];
  first_name: string;
  last_name: string;
  order_state_id: number;
  total: number;
  warning_user?: number;
}
