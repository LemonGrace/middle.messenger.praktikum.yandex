import './Profile.scss';
import { Page } from '../../core/Page/Page';
import { Header } from '../../components/Header/Header';
import template from './template';
import { ToUpperCase } from '../../utils/ToUpperCase';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Buttons/Button/Button';
import { UserInfo } from '../../modules/UserInfo/UserInfo';
import { IconButton } from '../../components/Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../../components/Buttons/IconButton/IconButton.interface';
import router from '../../controller/Router/Router';
import Router from '../../controller/Router/Router';
import { ROUTE } from '../../controller/Router/ROUTES.const';
import AuthController from '../../controller/AuthController';
import store, { IState } from '../../core/Store/Store';
import messageController from '../../controller/ModalController';
import withStorePage from '../../core/Store/WithStorePage';
import { Modal } from '../../components/Modal/Modal';
import { MODAL_TYPE } from '../../components/Modal/Modal.interface';
import { Block } from '../../core/Block/Block';

class ProfileBase extends Page {
	protected modal = new Modal({
		title: 'Выход из профиля',
		text: 'Вы уверены, что хотите выйти?',
		type: MODAL_TYPE.CONFIRMATION,
	});

	protected async init() {
		await super.init();
		const userData = store.GetUser();
		this.children = {
			Avatar: [
				new Avatar({
					userImg: userData?.avatar || '',
					size: 120,
				}),
			],
			Header: [
				new Header({
					title: ToUpperCase(userData?.first_name || ''),
				}),
			],
			UserInfo: [new (UserInfo)({}, 'UserInfo')],
			ButtonLogout: [
				new Button({
					text: 'Выйти из профиля',
					events: {
						click: async () => this.logOut(),
					},
				}),
			],
			ButtonBack: [
				new Button({
					text: 'Вернуться к сообщениям',
					events: {
						click: async () => {
							await Router.Go(ROUTE.messenger);
						},
					},
				}),
			],
			IconButton: [
				new IconButton({
					type: BUTTON_TYPE.edit,
					events: {
						click: () => {
							router.Go(ROUTE.settings);
						},
					},
				}),
			],
		};
	}

	protected async componentDidMount() {
		await this.updateUserData();
	}

	protected async updateUserData() {
		await AuthController.FetchUser();
	}

	protected async logOut() {
		const isSuccess = <boolean> await messageController.ShowModal(this.modal);
		if (isSuccess) {
			await AuthController.LogOut();
		}
	}

	render() {
		return template;
	}
}

// TODO loading
const mapStateToProps = (state: IState) => ({
	user: state.user,
	// loading: state.loading,
});

export const Profile = withStorePage(ProfileBase as typeof Block, mapStateToProps);
