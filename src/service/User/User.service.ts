import { API } from '../API';
import { IHTTPResult } from '../../core/HTTPTransport/HTTPTransport.interface';
import { IUserPasswordData, IUserProfileData, IUserUpdateProfileData } from './User.interface';


export class UserAPI extends API {
	constructor() {
		super('/user');
	}

	public async updateProfile(data: IUserProfileData): Promise<IHTTPResult<IUserUpdateProfileData>> {
		return this.http.put<IUserUpdateProfileData>('/profile', {
			data,
		});
	}

	public async updatePassword(data: IUserPasswordData): Promise<IHTTPResult<void>> {
		return this.http.put('/password', {
			data,
		});
	}

	public async updateAvatar(data: FormData): Promise<IHTTPResult<IUserUpdateProfileData>> {
		return this.http.put<IUserUpdateProfileData>('/profile/avatar', {
			data,
		});
	}
}
