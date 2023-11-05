import './Authorization.scss';

import template from './template';
import { Header } from '../../components/Header/Header';
import { LOGIN_FIELDS } from './Authorization.interface';
import { Page } from '../../core/Page/Page';
import { SignButtons } from '../../modules/SignButtons/SignButtons';
import { FormControl } from '../../modules/FormControl/FormControl';
import { Form } from '../../modules/Form/Form';
import { ROUTE } from '../../controller/Router/ROUTES.const';
import { ISignInData } from '../../service/Auth/Auth.interface';
import AuthController from '../../controller/AuthController';

export class Authorization extends Page {
	protected init() {
		super.init();

		this.children = {
			Header: [
				new Header({
					title: 'Добро пожаловать!',
				}),
			],
			SignButtons: [
				new SignButtons({
					submitButtonText: 'Войти',
					linkPage: ROUTE.sign_up,
					linkButtonText: 'Создать пользователя',
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
		return LOGIN_FIELDS.map(field => {
			return new FormControl(field.inputProps).AddValidators(field.validators);
		});
	}

	protected onSubmit = async () => {
		const formData = (this.children.Form[0] as Form).SubmitForm();
		if (!formData) {
			return;
		}
		await AuthController.SignIn(formData as ISignInData);
	};

	render() {
		return template;
	}
}
