import { AuthAPI } from '../service/Auth/Auth.service';
import Router from './Router/Router';
import { ROUTE } from './Router/ROUTES.const';
import { ISignInData, ISignUpData } from '../service/Auth/Auth.interface';
import messageController from './ModalController';
import store from '../core/Store/Store';

class AuthController {
	private api = new AuthAPI();

	public async SignIn(data: ISignInData): Promise<void> {
		const [, error] = await this.api.SignIn(data);
		if (error) {
			await messageController.ShowError(error);
			return;
		}
		await this.FetchUser();
		await Router.Go(ROUTE.messenger);
	}

	public async SignUp(data: ISignUpData): Promise<void> {
		const [response, error] = await this.api.SignUp(data);
		if (error || !response?.id) {
			await messageController.ShowError(error || new Error('Что-то пошло не так, повторите попытку позже'));
			return;
		}
		await Router.Go(ROUTE.messenger);
	}

	public async LogOut(): Promise<void> {
		store.Clean();
		const [, error] = await this.api.LogOut();
		if (error) {
			await messageController.ShowError(error);
			return;
		}
		await Router.Go(ROUTE.sign_in);
	}

	public async FetchUser(isShowError = false): Promise<void> {
		if (store.GetUser()) {
			return;
		}
		const [user, error] = await this.api.GetUser();
		if (error && isShowError) {
			await messageController.ShowError(error);
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
