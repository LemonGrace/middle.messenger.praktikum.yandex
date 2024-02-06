import '../Button.scss';
import { Block } from '../../../core/Block/Block';
import template from './template';
import { IButtonProps } from './Button.interface';
import { toUpperCase } from '../../../utils/ToUpperCase';

export class Button extends Block<IButtonProps> {
	constructor(props: IButtonProps) {
		props.text = toUpperCase(props.text);
		super(props, 'Button');
	}

	protected async init() {
		await super.init();
	}

	render() {
		return template;
	}
}
