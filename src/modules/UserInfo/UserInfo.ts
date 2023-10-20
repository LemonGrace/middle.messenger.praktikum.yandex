import './UserInfo.scss';
import { Block } from '../../templateUtils/Block';
import { IUserInfoProps } from './UserInfo.interface';
import template from './template';
import Information from '../../components/Information/Information';

export class UserInfo extends Block<IUserInfoProps> {
	constructor(props: IUserInfoProps) {
		super(props, 'UserInfo');
	}

	protected init() {
		super.init();
		this.children.Information = this.props.userData.map((item) => {
			return new Information({ ...item });
		});
	}

	protected render() {
		return template;
	}
}
