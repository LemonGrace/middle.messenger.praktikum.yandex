import './Error.scss';

import template from './template';

import { ERROR_TYPE_MESSAGE, IErrorPageProps } from './Error.interface';
import { Alert } from '../../components/Alert/Alert';
import { Page } from '../../core/Page/Page';
import { ROUTE } from '../../controller/Router/ROUTES.const';


export class Error extends Page<IErrorPageProps> {
	protected async init() {
		await super.init();
		this.children.Alert = [
			new Alert({
				text: ERROR_TYPE_MESSAGE[this.props.type],
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
