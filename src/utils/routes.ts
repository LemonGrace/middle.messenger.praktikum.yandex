import Authorization from '../pages/Authorization/Authorization';
import Profile from '../pages/Profile/Profile';
import { UserEditMockProfile, UserMockProfile } from '../mock/user';
import { LOGIN_FIELDS } from '../pages/Authorization/Authorization.fields';
import Error from '../pages/Error/Error';
import Registration from '../pages/Registration/Registration';
import { ERROR_TYPE } from '../pages/Error/Error.const';
import { REGISTRATION_FIELDS } from '../pages/Registration/Registration.fields';
import EditProfile from '../pages/EditProfile/EditProfile';
import Messages from '../pages/Messages/Messages';
import { MessagesMockProps } from '../mock/messages';

export const ROUTES: Record<string, string> = {
	'/': Authorization,
	'/profile': Profile,
	'/profile-edit': EditProfile,
	'/registration': Registration,
	'/error': Error,
	'/not-found': Error,
	'/main': Messages,
};

export const ROUTES_DATA: Record<string, object> = {
	'/': { fields: LOGIN_FIELDS },
	'/profile': UserMockProfile,
	'/profile-edit': UserEditMockProfile,
	'/registration': { fields: REGISTRATION_FIELDS },
	'/error': { type: ERROR_TYPE.STATUS_5 },
	'/not-found': { type: ERROR_TYPE.STATUS_404 },
	'/main': MessagesMockProps,
};
