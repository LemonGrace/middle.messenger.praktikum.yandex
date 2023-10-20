import { Props } from '../../templateUtils/Block.interface';
import { FormControl } from '../FormControl/FormControl';

export interface IFormProps extends Props {
	fields: FormControl[],
}
