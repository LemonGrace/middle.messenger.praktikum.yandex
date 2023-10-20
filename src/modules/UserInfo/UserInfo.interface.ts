import { Props } from '../../templateUtils/Block.interface';
import { IInformationProps } from '../../components/Information/Information.interface';

export interface IUserInfoProps extends Props {
	userData: IInformationProps[],
}
