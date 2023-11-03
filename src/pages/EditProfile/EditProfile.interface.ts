import { Props } from '../../templateUtils/Block.interface';
import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import {
	emailValidator,
	loginValidator,
	nameValidator,
	passwordValidator,
	phoneValidator,
	Validator,
} from '../../utils/validator';

export interface IEditProfileProps extends Props {
	userImg: string,
}

export const EDIT_PROFILE_FIELDS: Array<{
	inputProps: IInputProps,
	validators: Validator | Validator[],
}> = [
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
