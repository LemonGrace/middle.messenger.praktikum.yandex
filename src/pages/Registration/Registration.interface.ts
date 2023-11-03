import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import {
	emailValidator,
	loginValidator,
	nameValidator,
	passwordValidator,
	phoneValidator,
	Validator,
} from '../../utils/validator';

export const REGISTRATION_FIELDS: Array<{
	inputProps: IInputProps,
	validators: Validator | Validator[],
}> = [
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
			label: 'Телефон',
			type: 'phone',
			name: 'phone',
		},
		validators: phoneValidator,
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
	// TODO валидация на совпадение
	{
		inputProps: {
			label: 'Пароль',
			type: 'password',
			name: 'password',
			placeholder: 'Введите пароль',
		},
		validators: passwordValidator,
	},
	{
		inputProps: {
			label: 'Пароль (ещё раз)',
			type: 'password',
			name: 'password_repeat',
			placeholder: 'Повторите пароль',
		},
		validators: passwordValidator,
	},
];
