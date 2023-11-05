import { Props } from '../../../core/Block/Block.interface';

export interface IButtonProps extends Props {
	text: string,
	isDisabled?: boolean,
	events: {
		click?: () => void,
	}
}
