import './AvatarNameButton.scss';
import { Block } from '../../templateUtils/Block';
import { IAvatarNameButtonProps } from './AvatarNameButton.interface';
import template from './template';
import { Avatar } from '../Avatar/Avatar';

export class AvatarNameButton extends Block<IAvatarNameButtonProps> {
	constructor(props: IAvatarNameButtonProps) {
		super(props, 'AvatarNameButton');
	}
	protected init() {
		super.init();
		this.children = {
			Avatar: [
				new Avatar({
					userImg: this.props.userImg,
				}),
			],
		};
		if (!this.props.isCustomClick) {
			this.props.events = {
				click: () => {
					window.open('/profile', '_self');
				},
			};
		}
	}

	protected render(): string {
		return template;
	}
}
