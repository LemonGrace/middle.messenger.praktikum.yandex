import './Registration.scss';
import { Page } from '../../templateUtils/Page';
import { Form } from '../../modules/Form/Form';
import { Header } from '../../components/Header/Header';
import { SignButtons } from '../../modules/SignButtons/SignButtons';
import { FormControl } from '../../modules/FormControl/FormControl';

import template from './template';
import { REGISTRATION_FIELDS } from './Registration.interface';

export class Registration extends Page {
	protected init() {
		super.init();

		const form = new Form({
			fields: this.createFields(),
		});

		this.children = {
			Header: [
				new Header({
					title: 'Регистрация',
				}),
			],
			SignButtons: [
				new SignButtons({
					submitButtonText: 'Создать пользователя',
					linkUrl: '/',
					linkButtonText: 'Уже зарегистрированы?',
					submitAction: () => form.SubmitForm(),
				}),
			],
			Form: [form],
		};
	}

	protected createFields(): FormControl[] {
		return REGISTRATION_FIELDS.map(field => {
			return new FormControl(field.inputProps).AddValidators(field.validators);
		});
	}

	render() {
		return template;
	}
}
