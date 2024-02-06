import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import {
	emailValidator,
	loginValidator,
	nameValidator,
	passwordValidator,
	phoneValidator,
	Validator,
} from '../../utils/validator';
import { IUserPasswordData, IUserProfileData } from '../../service/User/User.interface';
import { IUser } from '../../service/Auth/Auth.interface';

export const EDIT_PROFILE_FIELDS: Array<{
	inputProps: IInputProps,
	validators: Validator | Validator[],
}> = [
	{
		inputProps: {
			type: 'file',
			label: 'Сменить аватар',
			name: 'avatar',
		},
		validators: [],
	},
	{
		inputProps: {
			label: 'Почта',
			type: 'email',
			name: 'email',
		},
		validators: emailValidator,
	},
	{
		inputProps: {
			label: 'Логин',
			type: 'text',
			name: 'login',
		},
		validators: loginValidator,
	},
	{
		inputProps: {
			label: 'Имя',
			type: 'text',
			name: 'first_name',
		},
		validators: nameValidator,
	},
	{
		inputProps: {
			label: 'Фамилия',
			type: 'text',
			name: 'second_name',
		},
		validators: nameValidator,
	},
	{
		inputProps: {
			label: 'Имя в чате',
			type: 'text',
			name: 'display_name',
		},
		validators: nameValidator,
	},
	{
		inputProps: {
			label: 'Телефон',
			type: 'phone',
			name: 'phone',
		},
		validators: phoneValidator,
	},
	{
		inputProps: {
			label: 'Старый пароль',
			type: 'password',
			name: 'oldPassword',
			placeholder: 'Введите старый пароль',
		},
		validators: passwordValidator,
	},
	{
		inputProps: {
			label: 'Новый пароль',
			type: 'password',
			name: 'newPassword',
			placeholder: 'Введите пароль',
		},
		validators: passwordValidator,
	},
];

export const FIELDS_USER_CORRELATION: Record<string, (user: IUser) => string> = {
	email: (user) => user.email,
	login: (user) => user.login,
	first_name: (user) => user.first_name,
	second_name: (user) => user.second_name,
	display_name: (user) => user.display_name,
	phone: (user) => user.phone,
	avatar: () => '',
	oldPassword: () => '',
	newPassword: () => '',
};

export type IEditProfileFormData = IUserProfileData & IUserPasswordData & {
	avatar: File,
};
