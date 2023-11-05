import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import { loginValidator, passwordValidator, Validator } from '../../utils/validator';

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
		validators: loginValidator,
	},
	{
		inputProps: {
			label: 'Пароль',
			type: 'password',
			name: 'password',
			placeholder: 'Введите пароль',
		},
		// validators: passwordValidator,
		validators: null,
	},
];
// TODO вернуть валидаторы
