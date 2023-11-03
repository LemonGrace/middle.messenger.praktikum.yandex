import './SignButtons.scss';
import { Block } from '../../templateUtils/Block';
import { ISignButtonsProps } from './SignButtons.interface';
import { Link } from '../../components/Link/Link';
import template from './template';
import { Button } from '../../components/Buttons/Button/Button';

export class SignButtons extends Block<ISignButtonsProps> {
	constructor(props: ISignButtonsProps) {
		super(props, 'SignButtons');
	}

	protected init() {
		super.init();
		this.children = {
			Button: [
				new Button({
					text: this.props.submitButtonText,
					events: {
						click: this.props.submitAction,
					},
				}),
			],
			Link: [
				new Link({
					url: this.props.linkUrl,
					text: this.props.linkButtonText,
				}),
			],
		};
	}

	render() {
		return template;
	}
}
