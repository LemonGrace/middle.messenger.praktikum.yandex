import '../../../modules/FormControl/FormControl.scss';
import template from './template';

import { IInputProps } from './Input.interface';
import { Block } from '../../../core/Block/Block';

export class Input extends Block<IInputProps> {
	constructor(props: IInputProps) {
		super(props, 'Input');
	}

	protected async init() {
		await super.init();
	}

	protected componentDidMount() {
		super.componentDidMount();
		if (this.props.isError) {
			this.element?.classList.add('form-control__input-error');
		}
	}

	render() {
		return template;
	}
}
