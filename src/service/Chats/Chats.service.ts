import { API } from '../API';
import { IHTTPResult } from '../../core/HTTPTransport/HTTPTransport.interface';
import {
	IChat, IChatActionUsers,
	IChatCreate,
	IChatDeleteResponse,
	IChatInfo, IChatToken,
	IChatUpdateAvatarResponse, IChatUser,
} from './Chats.interface';

export class ChatsAPI extends API {
	constructor() {
		super('/chats');
	}

	public async createChat(data: IChatCreate): Promise<IHTTPResult<void>> {
		return this.http.post<void>('', {
			data,
		});
	}

	public async getChats(): Promise<IHTTPResult<IChat[]>> {
		return this.http.get<IChat[]>('');
	}

	public async getChatUsers(data: IChatInfo): Promise<IHTTPResult<IChatUser[]>> {
		return this.http.get<IChatUser[]>(`/${data.chatId}/users`);
	}

	public async getChatToken(data: IChatInfo): Promise<IHTTPResult<IChatToken>> {
		return this.http.post<IChatToken>(`/token/${data.chatId}`);
	}

	public async addChatUsers(data: IChatActionUsers): Promise<IHTTPResult<void>> {
		return this.http.put<void>('/users', {
			data,
		});
	}

	public async deleteChatUsers(data: IChatActionUsers): Promise<IHTTPResult<void>> {
		return this.http.delete<void>('/users', {
			data,
		});
	}

	public async updateAvatar(data: FormData): Promise<IHTTPResult<IChatUpdateAvatarResponse>> {
		return this.http.put<IChatUpdateAvatarResponse>('/avatar', {
			data,
		});
	}

	public async deleteChat(data: IChatInfo): Promise<IHTTPResult<IChatDeleteResponse>> {
		return this.http.delete<IChatDeleteResponse>('', {
			data,
		});
	}
}
