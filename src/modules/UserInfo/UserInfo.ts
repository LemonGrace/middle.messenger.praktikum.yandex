import './UserInfo.scss';
import { Block } from '../../core/Block/Block';
import template from './template';
import Information from '../../components/Information/Information';
import store, { IState } from '../../core/Store/Store';
import withStorePage from '../../core/Store/WithStorePage';
import { IInformationProps } from '../../components/Information/Information.interface';

export class UserInfoBase extends Block {
	protected async init() {
		await super.init();
		this.children.Information = this.getInfoData().map((item) => {
			return new Information({ ...item });
		});
	}

	protected getInfoData(): IInformationProps[] {
		const userData = store.getUser();
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

	protected render() {
		return template;
	}
}

const mapStateToProps = (state: IState) => ({
	user: state.user,
});

export const UserInfo = withStorePage(UserInfoBase as typeof Block, mapStateToProps);
