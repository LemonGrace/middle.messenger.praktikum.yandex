import { Props } from '../../../templateUtils/Block.interface';

export interface IButtonProps extends Props {
	text: string,
	isDisabled?: boolean,
	events: {
		click?: () => void,
	}
}
