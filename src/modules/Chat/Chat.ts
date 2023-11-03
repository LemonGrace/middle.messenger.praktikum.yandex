import './Chat.scss';
import { Block } from '../../templateUtils/Block';
import template from './template';
import { IChatProps } from './Chat.interface';
import { AvatarNameButton } from '../../components/AvatarNameButton/AvatarNameButton';
import { IconButton } from '../../components/Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../../components/Buttons/IconButton/IconButton.interface';
import { Message } from '../../components/Message/Message';
import { IMessageResponse } from '../../pages/Chats/Chats.interface';
import { FormControl } from '../FormControl/FormControl';
import { messageValidator } from '../../utils/validator';

export class Chat extends Block<IChatProps> {
	constructor(props: IChatProps) {
		super(props, 'Chat');
	}
	protected init() {
		super.init();
		this.children = {
			AvatarNameButton: [
				new AvatarNameButton({
					userImg: this.props.userImg,
					username: this.props.username,
					isCustomClick: true,
					events: {
						click: () => {
							// eslint-disable-next-line no-console
							console.log('перейти в настройки или изменить название чата');
						},
					},
				}),
			],
			IconButtonSettings: [
				new IconButton({
					type: BUTTON_TYPE.chat_settings,
					events: {
						click: () => {
							// eslint-disable-next-line no-console
							console.log('открыть модалку');
						},
					},
				}),
			],
			IconButtonAttach: [
				new IconButton({
					type: BUTTON_TYPE.attachment,
					events: {
						click: () => {
							// eslint-disable-next-line no-console
							console.log('открыть модалку');
						},
					},
				}),
			],
			IconButtonSend: [
				new IconButton({
					type: BUTTON_TYPE.send,
					events: {
						click: () => {
							// eslint-disable-next-line no-console
							console.log('открыть модалку');
						},
					},
				}),
			],
			FormControl: [
				new FormControl({
					name: 'message',
					placeholder: 'Введите сообщение',
					type: 'text',
				}).AddValidators(messageValidator),
			],
		};
		this.initMessage(this.props.messageList);
	}

	protected initMessage(messageList: IMessageResponse[]): void {
		this.children.Messages = messageList.map(message => {
			return new Message({
				id: message.messageID,
				text: message.text,
				username: this.props.username,
				isOuterMessage: message.isOuterMessage,
				time: message.time,
				userImg: message.isOuterMessage ? this.props.userImg : this.props.selfUserImage,
			});
		});
	}

	protected render(): string {
		return template;
	}

	public UpdateProps(newProps: IChatProps): void {
		this.initMessage(newProps.messageList);
		this.children.AvatarNameButton[0].UpdateProps(newProps);
		super.UpdateProps(newProps);
	}
}
