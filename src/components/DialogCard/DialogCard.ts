import './DialogCard.scss';
import { Block } from '../../core/Block/Block';
import { Avatar } from '../Avatar/Avatar';
import template from './template';
import { IDialogCardProps } from './DialogCard.interface';
import store, { IState } from '../../core/Store/Store';
import withStorePage from '../../core/Store/WithStorePage';
import { IAvatarProps } from '../Avatar/Avatar.interface';
import { BeautifyDate } from '../../utils/BeautifyDate';

export class DialogCardBase extends Block<IDialogCardProps> {
	constructor(props: IDialogCardProps) {
		super(props, 'DialogCard');
	}
	protected async init() {
		await super.init();
		this.props.isSelected = store.GetSelectedChat()?.id === this.CardID;
		if (this.props.last_message) {
			this.props.last_message = {
				...this.props.last_message,
				time: BeautifyDate(this.props.last_message.time),
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

	public get CardID() {
		return this.props.id;
	}

	public UpdateProps() {
		const chat = store.GetChats()?.find(chat => chat.id === this.CardID);
		const isSelected = store.GetSelectedChat()?.id === this.CardID;
		if (chat) {
			if (this.props.avatar !== chat.avatar && chat.avatar) {
				this.children.Avatar[0].UpdateProps({
					userImg: chat.avatar,
				} as IAvatarProps);
			}
			if (chat.last_message) {
				const data = BeautifyDate(chat.last_message.time);
				this.props = {
					...this.props,
					last_message: {
						...chat.last_message,
						time: data,
						content: chat.last_message.content,
					},
				};
				this.DispatchComponentDidUpdate();
			}
		}
		super.UpdateProps({
			isSelected,
		});
	}
}

const mapStateToProps = (state: IState) => ({
	selectedChat: state.selectedChat,
	chats: state.chats,
});

export const DialogCard = withStorePage(DialogCardBase as typeof Block, mapStateToProps);

