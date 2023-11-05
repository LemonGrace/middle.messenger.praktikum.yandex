import { IChatMessage } from '../../service/Chats/Chats.interface';

export interface IMessageProps extends IChatMessage {
	isOuterMessage?: boolean,
	user_avatar: string,
}
