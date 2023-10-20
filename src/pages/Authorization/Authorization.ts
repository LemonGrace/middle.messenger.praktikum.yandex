import './Authorization.scss';

import template from './template';
import { Header } from '../../components/Header/Header';
import { LOGIN_FIELDS, TEST_LINK_DATA } from './Authorization.interface';
import { Link } from '../../components/Link/Link';
import { Page } from '../../templateUtils/Page';
import { SignButtons } from '../../modules/SignButtons/SignButtons';
import { FormControl } from '../../modules/FormControl/FormControl';
import { Form } from '../../modules/Form/Form';

export class Authorization extends Page {
	protected init() {
		super.init();

		const form = new Form({
			fields: this.createFields(),
		});

		this.children = {
			Header: [
				new Header({
					title: 'Добро пожаловать!',
				}),
			],
			Link: TEST_LINK_DATA.map(link => {
				return new Link({
					text: link.text,
					url: link.url,
				});
			}),
			SignButtons: [
				new SignButtons({
					submitButtonText: 'Войти',
					linkUrl: '/registration',
					linkButtonText: 'Создать пользователя',
					submitAction: () => form.SubmitForm(),
				}),
			],
			Form: [form],
		};
	}

	protected createFields(): FormControl[] {
		return LOGIN_FIELDS.map(field => {
			return new FormControl(field.inputProps).AddValidators(field.validators);
		});
	}

	render() {
		return template;
	}
}
