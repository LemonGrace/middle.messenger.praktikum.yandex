import { API } from '../API';
import { IHTTPResult } from '../../core/HTTPTransport/HTTPTransport.interface';
import { IUserPasswordData, IUserProfileData, IUserUpdateProfileData } from './User.interface';


export class UserAPI extends API {
	constructor() {
		super('/user');
	}

	public async UpdateProfile(data: IUserProfileData): Promise<IHTTPResult<IUserUpdateProfileData>> {
		return this.http.Put<IUserUpdateProfileData>('/profile', {
			data,
		});
	}

	public async UpdatePassword(data: IUserPasswordData): Promise<IHTTPResult<void>> {
		return this.http.Put('/password', {
			data,
		});
	}

	public async UpdateAvatar(data: FormData): Promise<IHTTPResult<IUserUpdateProfileData>> {
		return this.http.Put<IUserUpdateProfileData>('/profile/avatar', {
			data,
		});
	}
}
