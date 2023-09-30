import { BUTTON_TYPE, BUTTON_TYPE_ICON_SRC } from './Button.const';

export function buttonIconRender(type: BUTTON_TYPE) {
	return BUTTON_TYPE_ICON_SRC[type];
}
