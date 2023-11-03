import './Profile.scss';
import { Page } from '../../templateUtils/Page';
import { Header } from '../../components/Header/Header';
import template from './template';
import { toUpperCase } from '../../utils/toUpperCase';
import { IProfileProps } from './Profile.interface';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Buttons/Button/Button';
import { UserInfo } from '../../modules/UserInfo/UserInfo';
import { IconButton } from '../../components/Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../../components/Buttons/IconButton/IconButton.interface';

export class Profile extends Page<IProfileProps> {
	protected init() {
		super.init();
		this.children = {
			Avatar: [
				new Avatar({
					userImg: this.props.userImg,
					size: 120,
				}),
			],
			Header: [
				new Header({
					title: toUpperCase(this.props.username),
				}),
			],
			UserInfo: [
				new UserInfo({
					userData: this.props.infoData,
				}),
			],
			Button: [
				new Button({
					text: 'Выйти из профиля',
					events: {
						click: () => {
							// eslint-disable-next-line no-console
							console.log('Надо сделать модалку!');
						},
					},
				}),
			],
			IconButton: [
				new IconButton({
					type: BUTTON_TYPE.edit,
					events: {
						click: () => {
							window.open('/profile-edit', '_self');
						},
					},
				}),
			],
		};
	}

	render() {
		return template;
	}
}
