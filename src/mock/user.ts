import { IEditProfileProps } from '../pages/EditProfile/EditProfile.interface';
import { IProfileProps } from '../pages/Profile/Profile.interface';

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

export const UserMockProfile: IProfileProps = {
	username: 'Вероника',
	userImg: 'defaultAvatar.jpg',
	infoData: USER_DATA,
};

export const UserEditMockProfile: IEditProfileProps = {
	userImg: 'defaultAvatar.jpg',
};
