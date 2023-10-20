import { Props } from '../../templateUtils/Block.interface';

export interface ISignButtonsProps extends Props {
	submitButtonText: string,
	submitAction: () => void,
	linkUrl: string,
	linkButtonText: string,
}
