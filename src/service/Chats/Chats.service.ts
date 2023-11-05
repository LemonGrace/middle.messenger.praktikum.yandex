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

	public async CreateChat(data: IChatCreate): Promise<IHTTPResult<void>> {
		return this.http.Post<void>('', {
			data,
		});
	}

	public async GetChats(): Promise<IHTTPResult<IChat[]>> {
		return this.http.Get<IChat[]>('');
	}

	public async GetChatUsers(data: IChatInfo): Promise<IHTTPResult<IChatUser[]>> {
		return this.http.Get<IChatUser[]>(`/${data.chatId}/users`);
	}

	public async GetChatToken(data: IChatInfo): Promise<IHTTPResult<IChatToken>> {
		return this.http.Post<IChatToken>(`/token/${data.chatId}`);
	}

	public async AddChatUsers(data: IChatActionUsers): Promise<IHTTPResult<void>> {
		return this.http.Put<void>('/users', {
			data,
		});
	}

	public async DeleteChatUsers(data: IChatActionUsers): Promise<IHTTPResult<void>> {
		return this.http.Delete<void>('/users', {
			data,
		});
	}

	public async UpdateAvatar(data: FormData): Promise<IHTTPResult<IChatUpdateAvatarResponse>> {
		return this.http.Put<IChatUpdateAvatarResponse>('/avatar', {
			data,
		});
	}

	public async DeleteChat(data: IChatInfo): Promise<IHTTPResult<IChatDeleteResponse>> {
		return this.http.Delete<IChatDeleteResponse>('', {
			data,
		});
	}
}
