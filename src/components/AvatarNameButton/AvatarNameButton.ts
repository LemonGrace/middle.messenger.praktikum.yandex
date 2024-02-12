import './AvatarNameButton.scss';
import { Block } from '../../core/Block/Block';
import { IAvatarNameButtonProps } from './AvatarNameButton.interface';
import template from './template';
import { Avatar } from '../Avatar/Avatar';
import router from '../../controller/Router/Router';
import { ROUTE } from '../../controller/Router/ROUTES.const';
import { IAvatarProps } from '../Avatar/Avatar.interface';

export class AvatarNameButton extends Block<IAvatarNameButtonProps> {
	constructor(props: IAvatarNameButtonProps) {
		super(props, 'AvatarNameButton');
	}
	protected async init() {
		await super.init();
		this.children = {
			Avatar: [
				new Avatar({
					userImg: this.props.avatar,
				}),
			],
		};
		if (!this.props.isCustomClick) {
			this.props.events = {
				click: async () => {
					await router.go(ROUTE.profile);
				},
			};
		}
	}

	protected render(): string {
		return template;
	}

	public updateProps(newProps: Partial<IAvatarNameButtonProps>): void {
		if (newProps.avatar) {
			this.children.Avatar[0].updateProps({
				userImg: newProps.avatar,
			} as IAvatarProps);
		}
		super.updateProps(newProps);
	}
}
