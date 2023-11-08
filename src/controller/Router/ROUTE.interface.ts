import { Authorization } from '../../pages/Authorization/Authorization';
import { Profile } from '../../pages/Profile/Profile';
import { UserEditMockProfile, UserMockProfile } from '../../mock/user';
import { Error } from '../../pages/Error/Error';
import { Registration } from '../../pages/Registration/Registration';
import { ERROR_TYPE } from '../../pages/Error/Error.interface';
import { EditProfile } from '../../pages/EditProfile/EditProfile';
import { Chats } from '../../pages/Chats/Chats';
import { MessagesMockProps } from '../../mock/messages';
import { Props } from '../../core/Block/Block.interface';
import { Block } from '../../core/Block/Block';
import { ROUTE } from './ROUTES.const';

export const ROUTE_PAGE: Record<ROUTE, new (props: Props) => Block> = {
	[ROUTE.sign_in]: Authorization,
	[ROUTE.settings]: Profile,
	[ROUTE.settings_edit]: EditProfile,
	[ROUTE.sign_up]: Registration,
	[ROUTE.error]: Error,
	[ROUTE.error_404]: Error,
	[ROUTE.messenger]: Chats,
};

export const ROUTE_PAGE_DATA: Record<ROUTE, Props> = {
	[ROUTE.sign_in]: {},
	[ROUTE.settings]: UserMockProfile,
	[ROUTE.settings_edit]: UserEditMockProfile,
	[ROUTE.sign_up]: {},
	[ROUTE.error]: { type: ERROR_TYPE.STATUS_5 },
	[ROUTE.error_404]: { type: ERROR_TYPE.STATUS_404 },
	[ROUTE.messenger]: MessagesMockProps,
};
