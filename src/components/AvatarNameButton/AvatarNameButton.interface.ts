import { Props } from '../../core/Block/Block.interface';

export interface IAvatarNameButtonProps extends Props {
	name: string,
	avatar: string,
	isCustomClick?: boolean,
}
