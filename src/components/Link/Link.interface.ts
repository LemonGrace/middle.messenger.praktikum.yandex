import { Props } from '../../core/Block/Block.interface';
import { ROUTE } from '../../controller/Router/ROUTES.const';

export interface ILinkProps extends Props {
	page: ROUTE,
	text: string,
}
