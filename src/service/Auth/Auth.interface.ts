import { IObject } from '../../utils/IObject';

export interface IUser extends IObject {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface ISignUpData extends IObject {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface ISignUpResponse extends IObject {
    id: string
}

export interface ISignInData extends IObject {
    login: string;
    password: string;
}
