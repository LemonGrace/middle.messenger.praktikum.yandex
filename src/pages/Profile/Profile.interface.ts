import { Props } from '../../templateUtils/Block.interface';

export interface IProfileProps extends Props {
	username: string,
	userImg: string,
	infoData: Array<{
		label: string,
		value: string,
	}>,
}
