import '../Button.scss';
import { Block } from '../../../templateUtils/Block';
import template from './template';
import { IButtonProps } from './Button.interface';
import { toUpperCase } from '../../../utils/toUpperCase';

export class Button extends Block<IButtonProps> {
	constructor(props: IButtonProps) {
		props.text = toUpperCase(props.text);
		super(props, 'Button');
	}

	protected init() {
		super.init();
	}

	render() {
		return template;
	}
}
