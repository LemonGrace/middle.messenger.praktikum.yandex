import { EDIT_PROFILE_FIELDS } from '../pages/EditProfile/EditProfile.fields';

export const USER_DATA = [
	{
		label: 'Почта',
		value: 'pochta@yandex.ru',
	},
	{
		label: 'Логин',
		value: 'ru',
	},
	{
		label: 'Имя',
		value: 'Вероника',
	},
	{
		label: 'Фамилия',
		value: 'Иванова',
	},
	{
		label: 'Имя в чате',
		value: 'Вероника',
	},
	{
		label: 'Телефон',
		value: '+7 (909) 967 30 30',
	},
];

export const UserMockProfile = {
	username: 'Вероника',
	userImg: 'defaultAvatar.jpg',
	infoData: USER_DATA,
};

export const UserEditMockProfile = {
	userImg: 'defaultAvatar.jpg',
	fields: EDIT_PROFILE_FIELDS,
};
