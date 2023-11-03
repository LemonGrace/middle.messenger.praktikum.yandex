import './DialogCard.scss';
import { Block } from '../../templateUtils/Block';
import { Avatar } from '../Avatar/Avatar';
import template from './template';
import { IDialogCardProps } from './DialogCard.interface';

export class DialogCard extends Block<IDialogCardProps> {
	constructor(props: IDialogCardProps) {
		super(props, 'DialogCard');
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
	}

	protected render(): string {
		return template;
	}

	public get DialogCardProps() {
		return this.props;
	}

	public get CardID() {
		return this.props.chatID;
	}

	public get IsSelected() {
		return this.props.isSelected;
	}
}
