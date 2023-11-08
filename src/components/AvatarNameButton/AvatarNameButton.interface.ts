import { Props } from '../../core/Block/Block.interface';

export interface IAvatarNameButtonProps extends Props {
	username: string,
	userImg: string,
	isCustomClick?: boolean,
}
