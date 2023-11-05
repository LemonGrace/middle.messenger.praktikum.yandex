import messageController from './ModalController';
import { UserAPI } from '../service/User/User.service';
import { IUserPasswordData, IUserProfileData } from '../service/User/User.interface';
import store from '../core/Store/Store';

class UserController {
	private api = new UserAPI();

	public async UpdateUserProfile(data: IUserProfileData): Promise<void> {
		const [response, error] = await this.api.UpdateProfile(data);
		if (error) {
			await messageController.ShowError(error);
			return;
		}
		store.Set('user', response);
	}

	public async UpdateUserPassword(data: IUserPasswordData): Promise<void> {
		const [, error] = await this.api.UpdatePassword(data);
		if (error) {
			await messageController.ShowError(error);
		}
	}

	public async UpdateUserAvatar(avatar: File): Promise<void> {
		const formData = new FormData();
		formData.append('avatar', avatar);
		const [response, error] = await this.api.UpdateAvatar(formData);
		if (error) {
			await messageController.ShowError(error);
		}
		store.Set('user', response);
	}
}

export default new UserController();
