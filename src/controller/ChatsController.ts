import messageController from './ModalController';
import store from '../core/Store/Store';
import { ChatsAPI } from '../service/Chats/Chats.service';
import {
	IChatActionUsers, IChatActive,
	IChatCreate,
	IChatInfo, IChatMessage,
	IChatUpdateAvatar,
	IChatUser,
} from '../service/Chats/Chats.interface';
import { needArray } from '../utils/NeedArray';

class ChatsController {
	private api = new ChatsAPI();

	protected async handleError(error: unknown): Promise<void> {
		await messageController.showError(error instanceof Error
			? error : new Error('Что-то пошло не так, повторите попытку позже'));
	}

	protected updateChats(updatedChat: IChatActive): void {
		const updatedChats = store.getChats()?.map(chat => chat.id === updatedChat?.id ? updatedChat : chat);
		store.set('chats', updatedChats);
	}

	public async createChat(data: IChatCreate): Promise<void> {
		try {
			await this.api.createChat(data);
			await this.getChats(true);
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async getChats(isUpdate = false): Promise<void> {
		if (store.getChats()?.length && !isUpdate) {
			return;
		}
		try {
			const [chats] = await this.api.getChats();
			if (chats) {
				store.set('chats', chats);
			}
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async getChatUsers(data: IChatInfo): Promise<IChatUser[]> {
		try {
			const [users] = await this.api.getChatUsers(data);
			return users as IChatUser[];
		} catch (error) {
			await this.handleError(error);
			return [];
		}
	}

	public async getChatToken(data: IChatInfo): Promise<string> {
		try {
			const [response] = await this.api.getChatToken(data);
			if (!response || !response?.token) {
				await this.handleError(new Error('token is empty'));
			}
			return response?.token || '';
		} catch (error) {
			await this.handleError(error);
			return '';
		}
	}

	public async updateMessages(messages: ReadonlyArray<IChatMessage> | IChatMessage): Promise<void> {
		let chat = store.getSelectedChat();
		if (!chat) {
			return;
		}
		let messagesArray = needArray(messages);
		if (messagesArray.length === 1) {
			const user = store.getUser();
			if (user) {
				chat = {
					...chat,
					last_message: {
						user: user,
						time: messagesArray[0].time,
						content: messagesArray[0].content,
					},
				};
				this.updateChats(chat);
			}
		}
		if (!chat.messages) {
			chat = {
				...chat,
				messages: [],
			};
		}
		messagesArray = [
			...chat.messages,
			...messagesArray,
		];
		store.set('selectedChat.messages', messagesArray.sort((
			chat1, chat2,
		) => new Date(chat1.time).getTime() - new Date(chat2.time).getTime()));
	}

	public async addChatUsers(data: IChatActionUsers): Promise<boolean> {
		try {
			await this.api.addChatUsers(data);
			return true;
		} catch (error) {
			await this.handleError(error);
			return false;
		}
	}

	public async deleteChatUsers(data: IChatActionUsers): Promise<boolean> {
		try {
			await this.api.deleteChatUsers(data);
			return true;
		} catch (error) {
			await this.handleError(error);
			return false;
		}
	}

	public async updateChatAvatar(data: IChatUpdateAvatar): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('chatId', data.chatId.toString());
			formData.append('avatar', data.avatar);
			const [response] = await this.api.updateAvatar(formData);
			const updatedChat = store.getSelectedChat();
			if (!updatedChat || !response?.avatar) {
				return;
			}
			store.set('selectedChat.avatar', response.avatar);
			this.updateChats(updatedChat);
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async deleteChat(data: IChatInfo): Promise<void> {
		try {
			await this.api.deleteChat(data);
			store.set('chats', store.getChats().filter(_chat => _chat.id !== data.chatId));
			store.set('selectedChat', null);
		} catch (error) {
			await this.handleError(error);
		}
	}
}

export default new ChatsController();
