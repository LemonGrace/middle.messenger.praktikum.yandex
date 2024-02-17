import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import { loginValidator, passwordValidator, requiredValidator, Validator } from '../../utils/validator';

export const LOGIN_FIELDS: Array<{
	inputProps: IInputProps,
	validators: Validator | Validator[],
}> = [
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
];
