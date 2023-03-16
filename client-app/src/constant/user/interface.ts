import { ROLE } from "./role";
export interface IInputUser {
  username: string;
  password: string;
}

export interface ICreateUser {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  phone_number: string;
  email: string;
  address: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IAuthState {
  token: string | null;
  role: ROLE;
  user: IUser;
}
