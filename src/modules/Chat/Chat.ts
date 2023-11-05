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
import { BeautifyDate } from '../../utils/BeautifyDate';

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
		const chat = this.SelectedChat;
		if (!chat) {
			return;
		}
		await super.init();
		this.users = await ChatsController.GetChatUsers({
			chatId: chat.id,
		});
		this.children = {
			AvatarNameButton: [
				new AvatarNameButton({
					avatar: chat.avatar || '',
					name: chat.title || '',
					isCustomClick: true,
					events: {
						click: () => this.OpenSettings(),
					},
				}),
			],
			IconButtonSettings: [
				new IconButton({
					type: BUTTON_TYPE.chat_settings,
					events: {
						click: () => this.OpenSettings(),
					},
				}),
			],
			IconButtonDelete: [
				new IconButton({
					type: BUTTON_TYPE.delete,
					events: {
						click: () => this.DeleteChat(),
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
				}).AddValidators(requiredValidator),
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

		const token = await ChatsController.GetChatToken({
			chatId: chat.id,
		});
		if (token) {
			this.token = token;
			await this.OpenSocket();
		}
	}

	protected async OpenSocket(): Promise<void> {
		this.socket = new Socket({
			chatID: this.SelectedChat?.id || 0,
			token: this.token,
		});
	}

	protected async sendMessage(): Promise<void> {
		const messageControl = (<FormControl> this.children.FormControl[0]);
		const message = messageControl.Value;
		if (message) {
			this.socket?.SendMessage(message);
			messageControl.Value = null;
		}
	}

	protected renderMessage(messageList: ReadonlyArray<IChatMessage>): void {
		const user = store.GetUser();
		this.children.Messages = messageList.map(message => {
			const isOuterMessage = message.user_id !== user?.id;
			const chatUser = this.users.find(user => user?.id === message.user_id);
			return new Message({
				...message,
				time: BeautifyDate(message.time, true),
				isOuterMessage: isOuterMessage,
				user_avatar: chatUser?.avatar || '',
			});
		});
		this.DispatchComponentDidUpdate();
	}

	protected get SelectedChat(): IChat | null {
		return store.GetSelectedChat();
	}

	protected render(): string {
		if (!this.SelectedChat) {
			return '';
		}
		return template;
	}

	protected async OpenSettings(): Promise<void> {
		if (!this.settingsModal) {
			return;
		}
		const chatId = this.SelectedChat?.id || 0;
		const isSuccess = <boolean> await messageController.ShowModal(this.settingsModal);
		if (!isSuccess) {
			return;
		}
		const modalContent = this.settingsModal.Content;
		const imageControl = <ImageFormControl> modalContent?.[0];
		if (imageControl.Value) {
			await ChatsController.UpdateChatAvatar({
				chatId:	this.SelectedChat?.id || 0,
				avatar: imageControl.Value,
			});
			imageControl.Value = null;
		}

		const userSettings = (<UserSettings> modalContent?.[1]);
		const newUsers = userSettings.NewUsers;
		if (newUsers.length) {
			userSettings.Clean();
			const isSuccess = await ChatsController.AddChatUsers({
				users: newUsers,
				chatId,
			});
			if (isSuccess) {
				const usersData = await ChatsController.GetChatUsers({
					chatId,
				});
				this.users = usersData;
				(<UserSettings> modalContent?.[1]).UpdateProps({
					users: usersData,
				});
			}
		}
	}

	protected async DeleteChat(): Promise<void> {
		const isSuccess = <boolean> await messageController.ShowModal(this.deleteChatModal);
		if (!isSuccess) {
			return;
		}
		await ChatsController.DeleteChat({
			chatId: this.SelectedChat?.id || 0,
		});

		if (!this.SelectedChat) {
			this.DispatchComponentWillUnMount();
		}
	}

	public async UpdateInit(): Promise<void> {
		await this.init();
		this.DispatchComponentDidUpdate();
	}

	public UpdateProps(newProps: IChatProps): void {
		const selectedChat = store.GetSelectedChat();
		if (Object.keys(this.children).length !== 0) {
			this.children.AvatarNameButton[0].UpdateProps({
				avatar: selectedChat?.avatar || '',
			} as IAvatarNameButtonProps);
		}
		this.renderMessage(selectedChat?.messages || []);
		super.UpdateProps(newProps);
	}

	public CleanChat() {
		if (this.socket) {
			this.socket.Close();
			this.socket = null;
		}
	}
}

const mapStateToProps = (state: IState) => ({
	selectedChat: state.selectedChat,
});

export const Chat = withStorePage(ChatBase as typeof Block, mapStateToProps);

