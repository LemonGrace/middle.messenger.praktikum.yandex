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
			return new FormControl(field.inputProps).addValidators(field.validators);
		});
	}

	protected onSubmit = async () => {
		const form = this.children.Form[0] as Form;
		form.validate();
		if (!form.isValid) {
			return;
		}
		const formData = form.submitForm() as IRegistrationFormData;
		if (formData.password !== formData.password_repeat) {
			const passwordRepeatControl = (this.children.Form[0] as Form)
				.controls.find(control => control.formControlName === 'password_repeat');
			passwordRepeatControl?.addError({
				different: 'Пароли не совпадают',
			});
			return;
		}
		delete formData.password_repeat;
		await AuthController.signUp(formData as ISignUpData);
	};

	render() {
		return template;
	}
}
