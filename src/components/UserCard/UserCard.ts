import { Block } from '../../core/Block/Block';
import { Avatar } from '../Avatar/Avatar';
import { IUserCard } from './UserCard.interface';
import template from './template';
import './UserCard.scss';
import { IconButton } from '../Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../Buttons/IconButton/IconButton.interface';

export class UserCard extends Block<IUserCard> {
	constructor(props: IUserCard) {
		super(props, 'UserCard');
	}
	protected async init(): Promise<void> {
		this.children = {
			Avatar: [
				new Avatar({
					userImg: this.props.avatar,
					size: 40,
				}),
			],
			IconButton: [
				new IconButton({
					type: BUTTON_TYPE.close,
					...this.props.events,
				}),
			],
		};
	}

	protected render(): string {
		return template;
	}

	public get UserID(): number {
		return this.props.id;
	}
}
