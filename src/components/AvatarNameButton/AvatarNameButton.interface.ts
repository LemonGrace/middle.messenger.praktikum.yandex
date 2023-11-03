import { Props } from '../../templateUtils/Block.interface';

export interface IAvatarNameButtonProps extends Props {
	username: string,
	userImg: string,
	isCustomClick?: boolean,
}
