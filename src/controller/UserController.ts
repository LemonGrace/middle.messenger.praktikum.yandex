import messageController from './ModalController';
import { UserAPI } from '../service/User/User.service';
import { IUserPasswordData, IUserProfileData } from '../service/User/User.interface';
import store from '../core/Store/Store';

class UserController {
	private api = new UserAPI();

	protected async handleError(error: unknown): Promise<void> {
		await messageController.showError(error instanceof Error
			? error : new Error('Что-то пошло не так, повторите попытку позже'));
	}
	public async updateUserProfile(data: IUserProfileData): Promise<void> {
		try {
			const [response] = await this.api.updateProfile(data);
			store.set('user', response);
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async updateUserPassword(data: IUserPasswordData): Promise<void> {
		try {
			await this.api.updatePassword(data);
		} catch (error) {
			await this.handleError(error);
		}
	}

	public async updateUserAvatar(avatar: File): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('avatar', avatar);
			const [response] = await this.api.updateAvatar(formData);
			store.set('user', response);
		} catch (error) {
			await this.handleError(error);
		}
	}
}

export default new UserController();
