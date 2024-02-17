import { Props } from '../../../core/Block/Block.interface';

export interface IButtonProps extends Props {
	text: string,
	isLoading?: boolean,
	events: {
		click?: () => void,
	}
}
