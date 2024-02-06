import './DialogCard.scss';
import { Block } from '../../core/Block/Block';
import { Avatar } from '../Avatar/Avatar';
import template from './template';
import { IDialogCardProps } from './DialogCard.interface';
import store, { IState } from '../../core/Store/Store';
import withStorePage from '../../core/Store/WithStorePage';
import { IAvatarProps } from '../Avatar/Avatar.interface';
import { beautifyDate } from '../../utils/BeautifyDate';

export class DialogCardBase extends Block<IDialogCardProps> {
	constructor(props: IDialogCardProps) {
		super(props, 'DialogCard');
	}
	protected async init() {
		await super.init();
		this.props.isSelected = store.getSelectedChat()?.id === this.cardID;
		if (this.props.last_message) {
			this.props.last_message = {
				...this.props.last_message,
				time: beautifyDate(this.props.last_message.time),
			};
		}
		this.children = {
			Avatar: [
				new Avatar({
					userImg: this.props.avatar || '',
				}),
			],
		};
	}

	protected render(): string {
		return template;
	}

	public get cardID() {
		return this.props.id;
	}

	public updateProps() {
		const chat = store.getChats()?.find(chat => chat.id === this.cardID);
		const isSelected = store.getSelectedChat()?.id === this.cardID;
		if (chat) {
			if (this.props.avatar !== chat.avatar && chat.avatar) {
				this.children.Avatar[0].updateProps({
					userImg: chat.avatar,
				} as IAvatarProps);
			}
			if (chat.last_message) {
				const data = beautifyDate(chat.last_message.time);
				this.props = {
					...this.props,
					last_message: {
						...chat.last_message,
						time: data,
						content: chat.last_message.content,
					},
				};
				this.dispatchComponentDidUpdate();
			}
		}
		super.updateProps({
			isSelected,
		});
	}
}

const mapStateToProps = (state: IState) => ({
	selectedChat: state.selectedChat,
	chats: state.chats,
});

export const DialogCard = withStorePage(DialogCardBase as typeof Block, mapStateToProps);

