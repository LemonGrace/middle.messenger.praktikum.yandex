import { Props } from '../../core/Block/Block.interface';
import { ROUTE } from '../../controller/Router/ROUTES.const';

export interface IAlertProps extends Props {
	page?: ROUTE,
	text: string,
}
