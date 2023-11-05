import { Props } from '../../core/Block/Block.interface';
import { IChatActive } from '../../service/Chats/Chats.interface';

export interface IDialogCardProps extends Props, IChatActive {
    isSelected?: boolean,
}
