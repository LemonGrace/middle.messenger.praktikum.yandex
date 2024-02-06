import './Chat.scss';
import { Block } from '../../core/Block/Block';
import template from './template';
import { IChatProps } from './Chat.interface';
import { AvatarNameButton } from '../../components/AvatarNameButton/AvatarNameButton';
import { IconButton } from '../../components/Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../../components/Buttons/IconButton/IconButton.interface';
import { FormControl } from '../FormControl/FormControl';
import { requiredValidator } from '../../utils/validator';
import store, { IState } from '../../core/Store/Store';
import { Modal } from '../../components/Modal/Modal';
import { MODAL_TYPE } from '../../components/Modal/Modal.interface';
import { ImageFormControl } from '../FormControl/ImageFormControl/ImageFormControl';
import messageController from '../../controller/ModalController';
import ChatsController from '../../controller/ChatsController';
import { IAvatarNameButtonProps } from '../../components/AvatarNameButton/AvatarNameButton.interface';
import withStorePage from '../../core/Store/WithStorePage';
import { IChat, IChatMessage, IChatUser } from '../../service/Chats/Chats.interface';
import { UserSettings } from '../UsersSettings/UserSettings';
import Socket from '../../service/WebSocket';
import { Message } from '../../components/Message/Message';
import { beautifyDate } from '../../utils/BeautifyDate';

export class ChatBase extends Block {
	protected users: IChatUser[] = [];
	protected token = '';
	protected socket: Socket | null = null;
	protected deleteChatModal = new Modal({
		title: 'Удаление чата',
		text: 'Вы действительно хотите удалить чат?',
		type: MODAL_TYPE.CONFIRMATION,
	});
	protected settingsModal: Modal | null = null;

	protected async init() {
		const chat = this.selectedChat;
		if (!chat) {
			return;
		}
		await super.init();
		this.users = await ChatsController.getChatUsers({
			chatId: chat.id,
		});
		this.children = {
			AvatarNameButton: [
				new AvatarNameButton({
					avatar: chat.avatar || '',
					name: chat.title || '',
					isCustomClick: true,
					events: {
						click: () => this.openSettings(),
					},
				}),
			],
			IconButtonSettings: [
				new IconButton({
					type: BUTTON_TYPE.chat_settings,
					events: {
						click: () => this.openSettings(),
					},
				}),
			],
			IconButtonDelete: [
				new IconButton({
					type: BUTTON_TYPE.delete,
					events: {
						click: () => this.deleteChat(),
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
						click: async () => {
							await this.sendMessage();
						},
					},
				}),
			],
			FormControl: [
				new FormControl({
					name: 'message',
					placeholder: 'Введите сообщение',
					type: 'text',
				}).addValidators(requiredValidator),
			],
			Messages: [],
		};
		this.settingsModal = new Modal({
			title: 'Управление чатом',
			type: MODAL_TYPE.FORM,
			useTopPosition: true,
			content: [
				new ImageFormControl({
					type: 'file',
					name: 'avatar',
				}),
				new UserSettings({
					users: this.users,
					chatId: chat.id || 0,
				}),
			],
		});

		const token = await ChatsController.getChatToken({
			chatId: chat.id,
		});
		if (token) {
			this.token = token;
			await this.openSocket();
		}
	}

	protected async openSocket(): Promise<void> {
		this.socket = new Socket({
			chatID: this.selectedChat?.id || 0,
			token: this.token,
		});
	}

	protected async sendMessage(): Promise<void> {
		const messageControl = (<FormControl> this.children.FormControl[0]);
		const message = messageControl.Value as string;
		if (message) {
			this.socket?.sendMessage(message);
			messageControl.Value = null;
		}
	}

	protected renderMessage(messageList: ReadonlyArray<IChatMessage>): void {
		const user = store.getUser();
		this.children.Messages = messageList.map(message => {
			const isOuterMessage = message.user_id !== user?.id;
			const chatUser = this.users.find(user => user?.id === message.user_id);
			return new Message({
				...message,
				time: beautifyDate(message.time, true),
				isOuterMessage: isOuterMessage,
				user_avatar: chatUser?.avatar || '',
			});
		});
		this.dispatchComponentDidUpdate();
	}

	protected get selectedChat(): IChat | null {
		return store.getSelectedChat();
	}

	protected render(): string {
		if (!this.selectedChat) {
			return '';
		}
		return template;
	}

	protected async openSettings(): Promise<void> {
		if (!this.settingsModal) {
			return;
		}
		const chatId = this.selectedChat?.id || 0;
		const isSuccess = <boolean> await messageController.showModal(this.settingsModal);
		if (!isSuccess) {
			return;
		}
		const modalContent = this.settingsModal.modalContent;
		const imageControl = <ImageFormControl> modalContent?.[0];
		if (imageControl.Value) {
			await ChatsController.updateChatAvatar({
				chatId:	this.selectedChat?.id || 0,
				avatar: imageControl.Value,
			});
			imageControl.Value = null;
		}

		const userSettings = (<UserSettings> modalContent?.[1]);
		const newUsers = userSettings.newUsers;
		if (newUsers.length) {
			userSettings.clean();
			const isSuccess = await ChatsController.addChatUsers({
				users: newUsers,
				chatId,
			});
			if (isSuccess) {
				const usersData = await ChatsController.getChatUsers({
					chatId,
				});
				this.users = usersData;
				(<UserSettings> modalContent?.[1]).updateProps({
					users: usersData,
				});
			}
		}
	}

	protected async deleteChat(): Promise<void> {
		const isSuccess = <boolean> await messageController.showModal(this.deleteChatModal);
		if (!isSuccess) {
			return;
		}
		await ChatsController.deleteChat({
			chatId: this.selectedChat?.id || 0,
		});

		if (!this.selectedChat) {
			this.dispatchComponentWillUnMount();
		}
	}

	public async updateInit(): Promise<void> {
		await this.init();
		this.dispatchComponentDidUpdate();
	}

	public updateProps(newProps: IChatProps): void {
		const selectedChat = store.getSelectedChat();
		if (Object.keys(this.children).length !== 0) {
			this.children.AvatarNameButton[0].updateProps({
				avatar: selectedChat?.avatar || '',
			} as IAvatarNameButtonProps);
		}
		this.renderMessage(selectedChat?.messages || []);
		super.updateProps(newProps);
	}

	public cleanChat() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}
}

const mapStateToProps = (state: IState) => ({
	selectedChat: state.selectedChat,
});

export const Chat = withStorePage(ChatBase as typeof Block, mapStateToProps);

