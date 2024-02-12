import './Link.scss';
import template from './template';

import { ILinkProps } from './Link.interface';
import { Block } from '../../core/Block/Block';
import router from '../../controller/Router/Router';

export class Link extends Block<ILinkProps> {
	constructor(props: ILinkProps) {
		super(props, 'Link');
		this.props.events = {
			click: () => {
				router.go(props.page);
			},
		};
	}

	render() {
		return template;
	}
}
