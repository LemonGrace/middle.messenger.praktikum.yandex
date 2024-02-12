import { Block } from '../../core/Block/Block';
import template from './template';
import './Message.scss';
import { Avatar } from '../Avatar/Avatar';
import { IMessageProps } from './Message.interface';

export class Message extends Block<IMessageProps> {
	constructor(props: IMessageProps) {
		super(props, 'Message');
	}

	protected async init() {
		this.children = {
			Avatar: [
				new Avatar({
					userImg: this.props.user_avatar,
				}),
			],
		};
	}

	protected render(): string {
		return template;
	}
}
