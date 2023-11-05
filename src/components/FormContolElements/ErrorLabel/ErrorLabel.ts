import '../../../modules/FormControl/FormControl.scss';

import { Block } from '../../../core/Block/Block';
import { IErrorLabel } from './ErrorLabel.interface';
import template from './template';

export class ErrorLabel extends Block<IErrorLabel> {
	constructor(props: IErrorLabel) {
		super(props, 'ErrorLabel');
	}

	render() {
		return template;
	}
}
