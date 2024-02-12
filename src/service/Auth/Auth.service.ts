import { API } from '../API';
import { ISignInData, ISignUpData, ISignUpResponse, IUser } from './Auth.interface';
import { IHTTPResult } from '../../core/HTTPTransport/HTTPTransport.interface';

export class AuthAPI extends API {
	constructor() {
		super('/auth');
	}

	public async signIn(data: ISignInData): Promise<IHTTPResult<ISignInData>> {
		return this.http.post<ISignInData>('/signin', {
			data,
		});
	}

	public async signUp(data: ISignUpData): Promise<IHTTPResult<ISignUpResponse>> {
		return this.http.post<ISignUpResponse>('/signup', {
			data,
		});
	}

	public async logOut(): Promise<IHTTPResult<void>> {
		return this.http.post('/logout');
	}

	public async getUser(): Promise<IHTTPResult<IUser>> {
		return this.http.get<IUser>('/user');
	}
}
