import { AuthAPI } from '../service/Auth/Auth.service';
import Router from './Router/Router';
import { ROUTE } from './Router/ROUTES.const';
import { ISignInData, ISignUpData } from '../service/Auth/Auth.interface';
import messageController from './ModalController';
import store from '../core/Store/Store';

class AuthController {
	private api = new AuthAPI();

	protected async handleError(error: unknown): Promise<void> {
		await messageController.showError(error instanceof Error
			? error : new Error('Что-то пошло не так, повторите попытку позже'));
	}
	public async signIn(data: ISignInData): Promise<void> {
		try {
			await this.api.signIn(data);
			await this.fetchUser();
			await Router.go(ROUTE.messenger);
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async signUp(data: ISignUpData): Promise<void> {
		try {
			const [response] = await this.api.signUp(data);
			if (!response?.id) {
				await this.handleError(new Error('Не найден id'));
			}
			await Router.go(ROUTE.messenger);
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async logOut(): Promise<void> {
		try {
			store.clean();
			await this.api.logOut();
			await Router.go(ROUTE.sign_in);
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async fetchUser(isShowError = false): Promise<void> {
		if (store.getUser()) {
			return;
		}
		try {
			const [user] = await this.api.getUser();
			if (user) {
				store.set('user', user);
			}
		} catch (error) {
			if (isShowError) {
				await this.handleError(error);
			}
		}
	}

	public async isUserActive(): Promise<boolean> {
		await this.fetchUser();
		const user = store.getUser();
		return !!user;
	}
}

export default new AuthController();
