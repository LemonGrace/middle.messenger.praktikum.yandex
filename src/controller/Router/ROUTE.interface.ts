import { Authorization } from '../../pages/Authorization/Authorization';

import { Error } from '../../pages/Error/Error';
import { Registration } from '../../pages/Registration/Registration';
import { ERROR_TYPE } from '../../pages/Error/Error.interface';
import { EditProfile } from '../../pages/EditProfile/EditProfile';
import { Chats } from '../../pages/Chats/Chats';
import { Props } from '../../core/Block/Block.interface';
import { Block } from '../../core/Block/Block';
import { ROUTE } from './ROUTES.const';
import { Profile } from '../../pages/Profile/Profile';

export const ROUTE_PAGE: Record<ROUTE, typeof Block> = {
	[ROUTE.sign_in]: Authorization as typeof Block,
	[ROUTE.profile]: Profile,
	[ROUTE.settings]: EditProfile,
	[ROUTE.sign_up]: Registration as typeof Block,
	[ROUTE.error]: Error as typeof Block,
	[ROUTE.error_404]: Error as typeof Block,
	[ROUTE.messenger]: Chats,
};

export const ROUTE_PAGE_DATA: Record<ROUTE, Props> = {
	[ROUTE.sign_in]: {},
	[ROUTE.profile]: {},
	[ROUTE.settings]: {},
	[ROUTE.sign_up]: {},
	[ROUTE.error]: { type: ERROR_TYPE.STATUS_5 },
	[ROUTE.error_404]: { type: ERROR_TYPE.STATUS_404 },
	[ROUTE.messenger]: {},
};
