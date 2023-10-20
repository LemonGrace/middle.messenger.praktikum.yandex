import './Link.scss';
import template from './template';

import { ILinkProps } from './Link.interface';
import { Block } from '../../templateUtils/Block';

export class Link extends Block<ILinkProps> {
	constructor(props: ILinkProps) {
		super(props, 'Link');
	}

	render() {
		return template;
	}
}
