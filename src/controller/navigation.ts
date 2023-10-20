import { Block } from '../templateUtils/Block';
import { ROUTES } from '../utils/routes';
import { ERROR_TYPE } from '../pages/Error/Error.interface';
import { Error } from '../pages/Error/Error';

export class Navigation {
	public OpenPage(): Block {
		const path = window.location.pathname;
		return ROUTES[path] || new Error({ type: ERROR_TYPE.STATUS_404 });
	}
}
