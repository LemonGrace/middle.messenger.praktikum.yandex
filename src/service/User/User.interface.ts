import { IObject } from '../../utils/IObject';

export interface IUserProfileData extends IObject {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface IUserPasswordData extends IObject {
    newPassword: string,
    oldPassword: string
}

export interface IUserUpdateProfileData extends IUserProfileData {
    id: string,
}
