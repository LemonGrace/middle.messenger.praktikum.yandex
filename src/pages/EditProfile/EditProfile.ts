import './EditProfile.scss';
import { Page } from '../../templateUtils/Page';
import { Form } from '../../modules/Form/Form';
import { Header } from '../../components/Header/Header';
import { FormControl } from '../../modules/FormControl/FormControl';
import template from './template';
import { Avatar } from '../../components/Avatar/Avatar';
import { EDIT_PROFILE_FIELDS, IEditProfileProps } from './EditProfile.interface';
import { Button } from '../../components/Buttons/Button/Button';

export class EditProfile extends Page<IEditProfileProps> {
	protected init() {
		super.init();

		const form = new Form({
			fields: this.createFields(),
		});

		this.children = {
			Header: [
				new Header({
					title: 'Редактирование данных',
				}),
			],
			Avatar: [
				new Avatar({
					userImg: this.props.userImg,
					size: 120,
				}),
			],
			Form: [form],
			Button: [
				new Button({
					text: 'Сохранить',
					events: {
						click: () => form.SubmitForm(),
					},
				}),
			],
		};
	}

	protected createFields(): FormControl[] {
		return EDIT_PROFILE_FIELDS.map(field => {
			return new FormControl(field.inputProps).AddValidators(field.validators);
		});
	}

	render() {
		return template;
	}
}
