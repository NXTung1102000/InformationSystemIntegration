import { ROLE } from "./role";
export interface IInputUser {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IAuthState {
  accessToken: string;
  authority: ROLE;
  user: IUser;
}
