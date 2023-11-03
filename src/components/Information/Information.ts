import './Information.scss';
import { Block } from '../../templateUtils/Block';
import template from './template';
import { IInformationProps } from './Information.interface';

export default class Information extends Block<IInformationProps> {
	constructor(props: IInformationProps) {
		super(props, 'Information');
	}

	protected render() {
		return template;
	}
}
