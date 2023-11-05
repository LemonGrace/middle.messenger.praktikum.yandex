import { Props } from '../../core/Block/Block.interface';
import { IUser } from '../../service/Auth/Auth.interface';

export interface IProfileProps extends Props {
	user: IUser | null;
}
