import { Props } from '../../core/Block/Block.interface';
import { IChatResponse } from '../../pages/Chats/Chats.interface';

export interface IChatProps extends Props, IChatResponse {
	selfUserName: string,
	selfUserImage: string,
}
