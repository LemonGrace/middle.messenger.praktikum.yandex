import { AuthAPI } from '../service/Auth/Auth.service';
import Router from './Router/Router';
import { ROUTE } from './Router/ROUTES.const';
import { ISignInData, ISignUpData, ISignUpResponse } from '../service/Auth/Auth.interface';
import messageController from './MessageController';
import store from '../core/Store/Store';

class AuthController {
	private api = new AuthAPI();

	public async SignIn(data: ISignInData): Promise<void> {
		const [, error] = await this.api.SignIn(data);
		if (error) {
			messageController.ShowError(error);
			return;
		}
		Router.Go(ROUTE.settings);
	}

	public async SignUp(data: ISignUpData): Promise<ISignUpResponse> {
		const [response, error] = await this.api.SignUp(data);
		if (error || !response?.id) {
			messageController.ShowError(error || new Error('Что-то пошло не так, повторите попытку позже'));
			return;
		}
		Router.Go(ROUTE.settings);
	}

	public async LogOut(): Promise<ISignUpResponse> {
		const [, error] = await this.api.LogOut();
		if (error) {
			messageController.ShowError(error);
			return;
		}
		Router.Go(ROUTE.sign_in);
	}

	public async FetchUser(isShowError = false): Promise<void> {
		const [user, error] = await this.api.GetUser();
		if (error && isShowError) {
			messageController.ShowError(error);
		}
		if (user) {
			store.Set('user', user);
		}
	}

	public async IsUserActive(): Promise<boolean> {
		await this.FetchUser();
		const user = store.GetUser();
		return !!user;
	}
}

export default new AuthController();
