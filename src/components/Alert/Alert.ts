import './Alert.scss';
import template from './template';

import { Block } from '../../templateUtils/Block';
import { IAlertProps } from './Alert.interface';
import { Link } from '../Link/Link';
import { ILinkProps } from '../Link/Link.interface';

export class Alert extends Block<IAlertProps> {
	constructor(props: IAlertProps) {
		super(props, 'Alert');
	}

	protected init() {
		super.init();
		if (this.props.url) {
			this.children.Link = [new Link(this.props as ILinkProps)];
		}
	}

	render() {
		return template;
	}
}
