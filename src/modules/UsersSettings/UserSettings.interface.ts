import { IChatUser } from '../../service/Chats/Chats.interface';
import { Props } from '../../core/Block/Block.interface';

export interface IUserSettings extends Props {
    users: IChatUser[],
    chatId: number,
}
