import '../Button.scss';
import { Block } from '../../../core/Block/Block';
import template from './template';
import { BUTTON_TYPE, BUTTON_TYPE_ICON_SRC, IIconButtonProps } from './IconButton.interface';
import { GenerateImgUrl } from '../../../utils/GenerateImgUrl';

export class IconButton extends Block<IIconButtonProps> {
	public static ButtonIconRender(type: BUTTON_TYPE): string {
		return BUTTON_TYPE_ICON_SRC[type];
	}

	constructor(props: IIconButtonProps) {
		props.src = GenerateImgUrl(IconButton.ButtonIconRender(props.type));
		super(props, 'IconButton');
	}

	protected async init() {
		await super.init();
	}

	render() {
		return template;
	}
}
