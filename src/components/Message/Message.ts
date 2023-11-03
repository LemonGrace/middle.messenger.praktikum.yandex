import { Block } from '../../templateUtils/Block';
import { IMessageProps } from './Message.interface';
import template from './template';
import './Message.scss';
import { Avatar } from '../Avatar/Avatar';

export class Message extends Block<IMessageProps> {
	constructor(props: IMessageProps) {
		super(props, 'Message');
	}

	protected init() {
		this.children = {
			Avatar: [
				new Avatar({
					userImg: this.props.userImg,
				}),
			],
		};
	}

	protected render(): string {
		return template;
	}
}
