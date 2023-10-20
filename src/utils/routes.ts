import { Authorization } from '../pages/Authorization/Authorization';
import { Profile } from '../pages/Profile/Profile';
import { UserEditMockProfile, UserMockProfile } from '../mock/user';
import { Error } from '../pages/Error/Error';
import { Registration } from '../pages/Registration/Registration';
import { ERROR_TYPE } from '../pages/Error/Error.interface';
import { EditProfile } from '../pages/EditProfile/EditProfile';
import { Chats } from '../pages/Chats/Chats';
import { MessagesMockProps } from '../mock/messages';
import { Page } from '../templateUtils/Page';

export const ROUTES: Record<string, Page> = {
	'/': new Authorization({}),
	'/profile': new Profile(UserMockProfile),
	'/profile-edit': new EditProfile(UserEditMockProfile),
	'/registration': new Registration({}),
	'/error': new Error({ type: ERROR_TYPE.STATUS_5 }),
	'/not-found': new Error({ type: ERROR_TYPE.STATUS_404 }),
	'/main': new Chats(MessagesMockProps),
};
