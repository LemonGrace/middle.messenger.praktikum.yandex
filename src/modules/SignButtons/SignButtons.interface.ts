import { Props } from '../../core/Block/Block.interface';
import { ROUTE } from '../../controller/Router/ROUTES.const';

export interface ISignButtonsProps extends Props {
	submitButtonText: string,
	submitAction: () => void,
	linkPage: ROUTE,
	linkButtonText: string,
}
