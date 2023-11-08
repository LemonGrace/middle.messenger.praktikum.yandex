import { Props } from '../../core/Block/Block.interface';
import { IInformationProps } from '../../components/Information/Information.interface';

export interface IUserInfoProps extends Props {
	userData: IInformationProps[],
}
