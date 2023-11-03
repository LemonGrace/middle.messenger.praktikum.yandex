import '../../../modules/FormControl/FormControl.scss';
import template from './template';

import { IInputProps } from './Input.interface';
import { Block } from '../../../templateUtils/Block';

export class Input extends Block<IInputProps> {
	constructor(props: IInputProps) {
		super(props, 'Input');
	}

	protected init() {
		super.init();
	}

	render() {
		return template;
	}
}
