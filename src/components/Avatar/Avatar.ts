import './Avatar.scss';

import template from './template';

import { Block } from '../../templateUtils/Block';
import { IAvatarProps } from './Avatar.interface';
import { GenerateImgUrl } from '../../utils/GenerateImgUrl';

export class Avatar extends Block<IAvatarProps> {
	constructor(props: IAvatarProps) {
		props.userImg = GenerateImgUrl(props.userImg);
		super(props, 'Avatar');
	}

	render() {
		return template;
	}
}
