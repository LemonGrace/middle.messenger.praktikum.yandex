import './Error.scss';

import template from './template';

import { IErrorPageProps } from './Error.interface';
import { Alert } from '../../components/Alert/Alert';
import { getErrorMessage } from './Error.utils';
import { Page } from '../../core/Page/Page';
import { ROUTE } from '../../controller/Router/ROUTES.const';


export class Error extends Page<IErrorPageProps> {
	protected init() {
		super.init();
		this.children.Alert = [
			new Alert({
				text: getErrorMessage(this.props.type),
			}),
			new Alert({
				text: 'Назад к сообщениям',
				page: ROUTE.messenger,
			}),
		];
	}

	render() {
		return template;
	}
}
