import './Registration.scss';
import { Page } from '../../core/Page/Page';
import { Form } from '../../modules/Form/Form';
import { Header } from '../../components/Header/Header';
import { SignButtons } from '../../modules/SignButtons/SignButtons';
import { FormControl } from '../../modules/FormControl/FormControl';

import template from './template';
import { IRegistrationFormData, REGISTRATION_FIELDS } from './Registration.interface';
import { ROUTE } from '../../controller/Router/ROUTES.const';
import AuthController from '../../controller/AuthController';
import { ISignUpData } from '../../service/Auth/Auth.interface';

export class Registration extends Page {
	protected async init() {
		await super.init();

		this.children = {
			Header: [
				new Header({
					title: 'Регистрация',
				}),
			],
			SignButtons: [
				new SignButtons({
					submitButtonText: 'Создать пользователя',
					linkPage: ROUTE.sign_in,
					linkButtonText: 'Уже зарегистрированы?',
					submitAction: () => this.onSubmit(),
				}),
			],
			Form: [
				new Form({
					fields: this.createFields(),
				}),
			],
		};
	}

	protected createFields(): FormControl[] {
		return REGISTRATION_FIELDS.map(field => {
			return new FormControl(field.inputProps).AddValidators(field.validators);
		});
	}

	protected onSubmit = async () => {
		const form = this.children.Form[0] as Form;
		form.Validate();
		if (!form.IsValid) {
			return;
		}
		const formData = form.SubmitForm() as IRegistrationFormData;
		if (formData.password !== formData.password_repeat) {
			const passwordRepeatControl = (this.children.Form[0] as Form)
				.Controls.find(control => control.FormControlName === 'password_repeat');
			passwordRepeatControl?.AddError({
				different: 'Пароли не совпадают',
			});
			return;
		}
		delete formData.password_repeat;
		await AuthController.SignUp(formData as ISignUpData);
	};

	render() {
		return template;
	}
}
