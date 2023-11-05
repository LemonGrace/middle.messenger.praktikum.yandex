import { API } from '../API';
import { ISignInData, ISignUpData, ISignUpResponse, IUser } from './Auth.interface';
import { IHTTPResult } from '../../core/HTTPTransport/HTTPTransport.interface';


export class AuthAPI extends API {
	constructor() {
		super('/auth');
	}

	public async SignIn(data: ISignInData): Promise<IHTTPResult<ISignInData>> {
		return this.http.Post<ISignInData>('/signin', {
			data,
		});
	}

	public async SignUp(data: ISignUpData): Promise<IHTTPResult<ISignUpResponse>> {
		return this.http.Post<ISignUpResponse>('/signup', {
			data,
		});
	}

	public async LogOut(): Promise<IHTTPResult<void>> {
		return this.http.Post('/logout');
	}

	public async GetUser(): Promise<IHTTPResult<IUser>> {
		return this.http.Get<IUser>('/user');
	}
}
