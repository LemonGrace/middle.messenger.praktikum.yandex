import './Profile.scss';
import { Page } from '../../core/Page/Page';
import { Header } from '../../components/Header/Header';
import template from './template';
import { toUpperCase } from '../../utils/toUpperCase';
import { IProfileProps } from './Profile.interface';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Buttons/Button/Button';
import { UserInfo } from '../../modules/UserInfo/UserInfo';
import { IconButton } from '../../components/Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../../components/Buttons/IconButton/IconButton.interface';
import router from '../../controller/Router/Router';
import { ROUTE } from '../../controller/Router/ROUTES.const';
import AuthController from '../../controller/AuthController';
import store, { State, withStore } from '../../core/Store/Store';
import { IInformationProps } from '../../components/Information/Information.interface';
import messageController from '../../controller/MessageController';

class ProfileBase extends Page<IProfileProps> {
	protected init() {
		super.init();
		const userData = store.GetUser();
		console.log(userData, this.props);
		this.children = {
			// TODO смена аватара
			Avatar: [
				new Avatar({
					userImg: this.props.userImg,
					size: 120,
				}),
			],
			Header: [
				new Header({
					title: toUpperCase(userData?.first_name || ''),
				}),
			],
			UserInfo: [
				new UserInfo({
					userData: this.getInfoData(),
				}),
			],
			Button: [
				new Button({
					text: 'Выйти из профиля',
					events: {
						click: async () => {
							messageController.ShowAlert();
							await AuthController.LogOut();
						},
					},
				}),
			],
			IconButton: [
				new IconButton({
					type: BUTTON_TYPE.edit,
					events: {
						click: () => {
							router.Go(ROUTE.settings_edit);
						},
					},
				}),
			],
		};
	}

	protected getInfoData(): IInformationProps[] {
		const userData = store.GetUser();
		if (!userData) {
			return [];
		}
		const {
			email,
			login,
			first_name: firstName,
			second_name: secondName,
			display_name: displayName,
			phone,
		} = userData;
		return [
			{
				label: 'Почта',
				value: email,
			},
			{
				label: 'Логин',
				value: login,
			},
			{
				label: 'Имя',
				value: firstName,
			},
			{
				label: 'Фамилия',
				value: secondName,
			},
			{
				label: 'Имя в чате',
				value: displayName,
			},
			{
				label: 'Телефон',
				value: phone,
			},
		];
	}

	render() {
		return template;
	}
}

function mapStateToProps(state: State) {
	return { ...state.user };
}

export const Profile = withStore(mapStateToProps)(ProfileBase);
