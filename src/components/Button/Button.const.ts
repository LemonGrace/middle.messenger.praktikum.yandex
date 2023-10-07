const DEFAULT_PATH = 'icons/';

export enum BUTTON_TYPE {
	edit = 'edit',
	new_chat = 'new_chat',
}

export const BUTTON_TYPE_ICON_SRC: Record<BUTTON_TYPE, string> = {
	edit: `${DEFAULT_PATH}24_Edit_Yellow.svg`,
	new_chat: `${DEFAULT_PATH}24_NewChat.svg`,
};
