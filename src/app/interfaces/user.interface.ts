export interface IAddress {
    city: string;
    country: string;
}

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    address: IAddress;
}