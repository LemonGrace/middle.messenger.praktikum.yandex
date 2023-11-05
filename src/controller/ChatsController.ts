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
import { NeedArray } from '../utils/NeedArray';

class ChatsController {
	private api = new ChatsAPI();

	protected updateChats(updatedChat: IChatActive): void {
		const updatedChats = store.GetChats()?.map(chat => chat.id === updatedChat?.id ? updatedChat : chat);
		store.Set('chats', updatedChats);
	}

	public async CreateChat(data: IChatCreate): Promise<void> {
		const [, error] = await this.api.CreateChat(data);
		if (error) {
			await messageController.ShowError(error);
			return;
		}
		await this.GetChats(true);
	}

	public async GetChats(isUpdate = false): Promise<void> {
		if (store.GetChats()?.length && !isUpdate) {
			return;
		}
		const [chats, error] = await this.api.GetChats();
		if (error) {
			await messageController.ShowError(error);
		}
		if (chats) {
			store.Set('chats', chats);
		}
	}

	public async GetChatUsers(data: IChatInfo): Promise<IChatUser[]> {
		const [users, error] = await this.api.GetChatUsers(data);
		if (error) {
			await messageController.ShowError(error);
			return [];
		}
		return users as IChatUser[];
	}

	public async GetChatToken(data: IChatInfo): Promise<string> {
		const [response, error] = await this.api.GetChatToken(data);
		if (error || response?.token === '') {
			await messageController.ShowError(error || new Error('token is empty'));
			return '';
		}
		return response?.token;
	}

	public async UpdateMessages(messages: ReadonlyArray<IChatMessage> | IChatMessage): Promise<void> {
		let chat = store.GetSelectedChat();
		if (!chat) {
			return;
		}
		let messagesArray = NeedArray(messages);
		if (messagesArray.length === 1) {
			const user = store.GetUser();
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
		store.Set('selectedChat.messages', messagesArray.sort((
			chat1, chat2,
		) => new Date(chat1.time).getTime() - new Date(chat2.time).getTime()));
	}

	public async AddChatUsers(data: IChatActionUsers): Promise<boolean> {
		const [, error] = await this.api.AddChatUsers(data);
		if (error) {
			await messageController.ShowError(error);
			return false;
		}
		return true;
	}

	public async DeleteChatUsers(data: IChatActionUsers): Promise<boolean> {
		const [, error] = await this.api.DeleteChatUsers(data);
		if (error) {
			await messageController.ShowError(error);
			return false;
		}
		return true;
	}

	public async UpdateChatAvatar(data: IChatUpdateAvatar): Promise<void> {
		const formData = new FormData();
		formData.append('chatId', data.chatId.toString());
		formData.append('avatar', data.avatar);
		const [response, error] = await this.api.UpdateAvatar(formData);
		if (error) {
			await messageController.ShowError(error);
		}

		const updatedChat = store.GetSelectedChat();
		if (!updatedChat || !response?.avatar) {
			return;
		}
		store.Set('selectedChat.avatar', response.avatar);
		this.updateChats(updatedChat);
	}

	public async DeleteChat(data: IChatInfo): Promise<void> {
		const [, error] = await this.api.DeleteChat(data);
		if (error) {
			await messageController.ShowError(error);
		}
		store.Set('chats', store.GetChats().filter(_chat => _chat.id !== data.chatId));
		store.Set('selectedChat', null);
	}
}

export default new ChatsController();
