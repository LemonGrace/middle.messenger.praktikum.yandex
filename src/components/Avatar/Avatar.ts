import './Avatar.scss';

import template from './template';

import { Block } from '../../core/Block/Block';
import { IAvatarProps } from './Avatar.interface';
import { generateImgUrl } from '../../utils/GenerateImgUrl';
import { HTTPTransport } from '../../core/HTTPTransport/HTTPTransport';

export class Avatar extends Block<IAvatarProps> {
	constructor(props: IAvatarProps) {
		const propsFormatted = props;
		propsFormatted.userImg = !propsFormatted.userImg
			? generateImgUrl('defaultAvatar.jpg')
			: `${HTTPTransport.API_URL}/resources${propsFormatted.userImg}`;
		super(propsFormatted, 'Avatar');
	}

	render() {
		return template;
	}

	public updateProps(nextProps: Partial<IAvatarProps>) {
		nextProps.userImg = !nextProps.userImg
			? generateImgUrl('defaultAvatar.jpg')
			: `${HTTPTransport.API_URL}/resources${nextProps.userImg}`;
		super.updateProps(nextProps);
	}
}
