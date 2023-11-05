import { FormControl } from '../FormControl';
import { IInputProps } from '../../../components/FormContolElements/Input/Input.interface';
const ACCEPT_FILE = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

export class ImageFormControl extends FormControl {
	protected value: File | null = null;
	protected async init() {
		await super.init();
		const input = this.children.Input[0];
		input.UpdateProps({
			accept: ACCEPT_FILE.join(', '),
			events: {
				click: () => {
					this.setValue(null);
				},
				change: (event) => {
					this.isTouched = true;
					const files = (<HTMLInputElement>event?.target).files;
					if (!files) {
						return;
					}
					if (ACCEPT_FILE.includes(files[0].type)) {
						this.value = files[0];
					}
					input.UpdateProps({
						value: files[0],
					} as IInputProps);
					this.DispatchComponentDidMount();
				},
			},
		});
	}

	protected componentDidMount() {
		const input = this.children.Input[0];
		input.Element?.classList.add('form-control__input-file');
		if (this.value) {
			input.Element?.classList.add('form-control__input-file-active');
		} else {
			input.Element?.classList.remove('form-control__input-file-active');
		}
		input.DispatchComponentDidMount();
	}

	public get Value(): File | null {
		return this.value;
	}

	public set Value(value: File | null) {
		this.value = value;
	}
}
