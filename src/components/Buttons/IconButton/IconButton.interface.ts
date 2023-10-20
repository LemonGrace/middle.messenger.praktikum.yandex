import { Props } from '../../../templateUtils/Block.interface';

const DEFAULT_PATH = 'icons/';

export enum BUTTON_TYPE {
	edit = 'edit',
	new_chat = 'new_chat',
	chat_settings = 'chat_settings',
	attachment = 'attachment',
	send = 'send',
}

export const BUTTON_TYPE_ICON_SRC: Record<BUTTON_TYPE, string> = {
	edit: `${DEFAULT_PATH}24_Edit.svg`,
	new_chat: `${DEFAULT_PATH}24_NewChat.svg`,
	chat_settings: `${DEFAULT_PATH}24_Setting.svg`,
	attachment: `${DEFAULT_PATH}24_Attachment.svg`,
	send: `${DEFAULT_PATH}24_Send.svg`,
};

export interface IIconButtonProps extends Props {
	type: BUTTON_TYPE,
	src?: string,
}
