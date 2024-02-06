import './EditProfile.scss';
import { Page } from '../../core/Page/Page';
import { Form } from '../../modules/Form/Form';
import { Header } from '../../components/Header/Header';
import { FormControl } from '../../modules/FormControl/FormControl';
import template from './template';
import {
	EDIT_PROFILE_FIELDS,
	FIELDS_USER_CORRELATION,
	IEditProfileFormData,
} from './EditProfile.interface';
import { Button } from '../../components/Buttons/Button/Button';
import store, { IState } from '../../core/Store/Store';
import UserController from '../../controller/UserController';
import { IUserProfileData } from '../../service/User/User.interface';
import { ROUTE } from '../../controller/Router/ROUTES.const';
import withStorePage from '../../core/Store/WithStorePage';
import { isEqual } from '../../utils/IsEqual';
import { ImageFormControl } from '../../modules/FormControl/ImageFormControl/ImageFormControl';
import Router from '../../controller/Router/Router';
import { Block } from '../../core/Block/Block';

export class EditProfileBase extends Page {
	protected async init() {
		await super.init();

		this.children = {
			Header: [
				new Header({
					title: 'Редактирование данных',
				}),
			],
			Form: [
				new Form({
					fields: this.createFields(),
				}),
			],
			Button: [
				new Button({
					text: 'Сохранить',
					events: {
						click: () => this.onSubmit(),
					},
				}),
				new Button({
					text: 'Вернуться к профилю',
					events: {
						click: async () => {
							await Router.go(ROUTE.profile);
						},
					},
				}),
			],
		};

		await this.initControls();
	}

	protected createFields(): FormControl[] {
		return EDIT_PROFILE_FIELDS.map(field => {
			if (field.inputProps.type === 'file') {
				return new ImageFormControl(field.inputProps);
			}
			return new FormControl(field.inputProps).addValidators(field.validators);
		});
	}

	protected async initControls(): Promise<void> {
		const user = store.getUser();
		if (!user) {
			return;
		}
		const form = this.children.Form[0] as Form;
		/** Ожидаем окончания инициализации */
		await new Promise(resolve => {
			setTimeout(resolve, 1000);
		});
		form.controls.forEach(control => {
			const value = FIELDS_USER_CORRELATION[control.formControlName](user);
			if (value) {
				control.Value = value;
			}
		});
	}

	protected onSubmit = async () => {
		const form = this.children.Form[0] as Form;
		const userData = store.getUser();
		form.validate();
		const formData: IEditProfileFormData = form.submitForm() as IEditProfileFormData;
		const {
			first_name: firstName,
			second_name: secondName,
			display_name: displayName,
			login: userLogin,
			email: userEmail,
			phone: userPhone,
			newPassword,
			oldPassword,
			avatar,
		} = formData;
		const mainData: IUserProfileData = {
			first_name: firstName || userData?.first_name || '',
			second_name: secondName || userData?.second_name || '',
			display_name: displayName || userData?.display_name || '',
			login: userLogin || userData?.login || '',
			email: userEmail || userData?.email || '',
			phone: userPhone || userData?.phone || '',
		};
		if (!isEqual(userData, {
			...mainData,
			id: userData?.id,
			avatar: userData?.avatar,
		})) {
			await UserController.updateUserProfile(mainData);
		}
		if (newPassword && oldPassword) {
			await UserController.updateUserPassword({
				newPassword,
				oldPassword,
			});
		}
		if (avatar) {
			await UserController.updateUserAvatar(formData.avatar);
		}
		await Router.go(ROUTE.profile);
	};

	render() {
		return template;
	}
}

// TODO loading
const mapStateToProps = (state: IState) => ({
	user: state.user,
	// loading: state.loading,
});

export const EditProfile = withStorePage(EditProfileBase as typeof Block, mapStateToProps);
