import { Props } from '../../templateUtils/Block.interface';
import { IChatResponse } from '../../pages/Chats/Chats.interface';

export interface IChatProps extends Props, IChatResponse {
	selfUserName: string,
	selfUserImage: string,
}
