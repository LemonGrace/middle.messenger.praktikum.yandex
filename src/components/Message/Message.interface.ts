import { Props } from '../../core/Block/Block.interface';

export interface IMessageProps extends Props {
	id: string,
	text: string,
	isOuterMessage: boolean,
	time: string,
	userImg: string,
	username: string,
}
