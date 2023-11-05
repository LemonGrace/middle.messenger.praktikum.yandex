import '../Button.scss';
import { Block } from '../../../core/Block/Block';
import template from './template';
import { IButtonProps } from './Button.interface';
import { ToUpperCase } from '../../../utils/ToUpperCase';

export class Button extends Block<IButtonProps> {
	constructor(props: IButtonProps) {
		props.text = ToUpperCase(props.text);
		super(props, 'Button');
	}

	protected async init() {
		await super.init();
	}

	render() {
		return template;
	}
}
