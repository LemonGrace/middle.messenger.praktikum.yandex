
export interface IUserProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface IUserPasswordData {
    newPassword: string,
    oldPassword: string
}

export interface IUserUpdateProfileData extends IUserProfileData {
    id: string,
}
