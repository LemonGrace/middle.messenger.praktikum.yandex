import { Props } from '../../../core/Block/Block.interface';

export interface IInputProps extends Props {
	name: string,
	type: string,
	label?: string,
	placeholder?: string,
	accept?: string,
	isError?: boolean,
	value?: unknown,
}
