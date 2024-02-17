import { FormControl } from '../FormControl';
import { IInputProps } from '../../../components/FormContolElements/Input/Input.interface';
import ModalController from '../../../controller/ModalController';
import { Props } from '../../../core/Block/Block.interface';
const ACCEPT_FILE = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

export class ImageFormControl extends FormControl {
	protected value: File | null = null;
	protected async init() {
		await super.init();
		const input = this.children.Input[0];
		input.updateProps({
			accept: ACCEPT_FILE.join(', '),
			events: {
				click: () => {
					this.setValue(null);
				},
				change: async (event) => {
					this.isTouched = true;
					const files = (<HTMLInputElement>event?.target).files;
					if (!files) {
						return;
					}
					if (ACCEPT_FILE.includes(files[0].type)) {
						this.value = files[0];
					} else {
						await ModalController.showError(new Error('Вы пытаетесь загрузить неверный формат'));
						return;
					}
					input.updateProps({
						value: files[0],
					} as IInputProps);
					this.dispatchComponentDidMount();
				},
			},
		});
	}

	protected componentDidMount() {
		const input = this.children.Input[0];
		input.element?.classList.add('form-control__input-file');
		if (this.value) {
			input.element?.classList.add('form-control__input-file-active');
		} else {
			input.element?.classList.remove('form-control__input-file-active');
		}
		input.dispatchComponentDidMount();
	}

	public get Value(): File | null {
		return this.value;
	}

	public set Value(value: File | null) {
		this.value = value;
		this.dispatchComponentDidMount();
	}

	public validate() {
		const value = this.Value;
		const errorList = [];
		for (const validator of this.validators) {
			const error = validator(value);
			if (error) {
				errorList.push(error);
			}
		}
		this.errors = errorList;
		if (this.errors.length) {
			this.children.Input[0].updateProps({
				...this.props,
				value,
				isError: !!this.errors.length,
			} as Props);
			this.updateError();
		}
	}
}
