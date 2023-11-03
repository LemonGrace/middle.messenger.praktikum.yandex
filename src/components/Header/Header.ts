import './Header.scss';
import { Block } from '../../templateUtils/Block';
import template from './template';
import { IHeaderProps } from './Header.interface';

export class Header extends Block<IHeaderProps> {
	constructor(props: IHeaderProps) {
		super(props, 'Header');
	}

	render() {
		return template;
	}
}
