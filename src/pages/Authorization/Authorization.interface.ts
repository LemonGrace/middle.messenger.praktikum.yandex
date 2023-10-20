import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import { loginValidator, passwordValidator, Validator } from '../../utils/validator';

export const TEST_LINK_DATA = [
	{
		url: '/',
		text: 'Вход',
	},
	{
		url: '/registration',
		text: 'Регистрация',
	},
	{
		url: '/main',
		text: 'Лента сообщений',
	},
	{
		url: '/profile',
		text: 'Профиль пользователя',
	},
	{
		url: '/profile-edit',
		text: 'Профиль пользователя редактируемый',
	},
	{
		url: '/not-found',
		text: 'Страница 404',
	},
	{
		url: '/error',
		text: 'Страницы 5**',
	},
];

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
		validators: passwordValidator,
	},
];
