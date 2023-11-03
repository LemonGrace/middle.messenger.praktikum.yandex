import './Form.scss';
import { Block } from '../../templateUtils/Block';
import { IFormProps } from './Form.interface';
import template from './template';
import { MaybeArray, NeedArray } from '../../utils/NeedArray';
import { FormControl } from '../FormControl/FormControl';

export class Form extends Block<IFormProps> {
	constructor(props: IFormProps) {
		super(props, 'Form');
	}

	protected init() {
		super.init();
		this.children = {
			Controls: this.props.fields,
		};
	}

	public AddControl(control: MaybeArray<FormControl>) {
		this.children = {
			Controls: [
				...this.children.Controls,
				...NeedArray(control),
			],
		};
	}

	public get Controls(): FormControl[] {
		return this.children.Controls as FormControl[];
	}

	public get IsValid(): boolean {
		return this.Controls.every(control => control.IsValid);
	}

	public SubmitForm(): void {
		const data: { [key: string]: any } = {};
		for (const control of this.Controls) {
			control.Validate();
			data[control.FormControlName as keyof typeof data] = control.Value;
		}
		// eslint-disable-next-line no-console
		console.log(['submit', data]);
	}

	render() {
		return template;
	}
}
