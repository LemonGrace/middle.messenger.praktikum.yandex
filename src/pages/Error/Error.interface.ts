import { Props } from '../../templateUtils/Block.interface';

export enum ERROR_TYPE {
	STATUS_5 = '5',
	STATUS_404 = '404',
}

export const ERROR_TYPE_MESSAGE: Record<ERROR_TYPE, string> = {
	5: 'Мы уже в процессе исправления',
	404: 'Упс, кажется вы забрели не туда',
};

export interface IErrorPageProps extends Props {
	type: ERROR_TYPE,
}
