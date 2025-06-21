import { Model } from "mongoose";

export interface IAddress {
  city: string;
  country: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  address: IAddress;
}

export interface UserInstanceMethods {
  hashPassword(plainPassword: string):string;
}


export interface UserStaticMethods extends Model<IUser> {
    hashPassword(plainPassword: string):string;
}