import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import {
	emailValidator,
	loginValidator,
	nameValidator,
	passwordValidator,
	phoneValidator, requiredValidator,
	Validator,
} from '../../utils/validator';
import { ISignUpData } from '../../service/Auth/Auth.interface';

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
		validators: [requiredValidator, nameValidator],
	},
	{
		inputProps: {
			label: 'Фамилия',
			type: 'text',
			name: 'second_name',
		},
		validators: [requiredValidator, nameValidator],
	},
	{
		inputProps: {
			label: 'Телефон',
			type: 'phone',
			name: 'phone',
		},
		validators: [requiredValidator, phoneValidator],
	},
	{
		inputProps: {
			label: 'Почта',
			type: 'email',
			name: 'email',
		},
		validators: [requiredValidator, emailValidator],
	},
	{
		inputProps: {
			label: 'Логин',
			type: 'text',
			name: 'login',
		},
		validators: [requiredValidator, loginValidator],
	},
	{
		inputProps: {
			label: 'Пароль',
			type: 'password',
			name: 'password',
			placeholder: 'Введите пароль',
		},
		validators: [requiredValidator, passwordValidator],
	},
	{
		inputProps: {
			label: 'Пароль (ещё раз)',
			type: 'password',
			name: 'password_repeat',
			placeholder: 'Повторите пароль',
		},
		validators: [requiredValidator, passwordValidator],
	},
];

export type IRegistrationFormData = ISignUpData & { password_repeat?: string };
