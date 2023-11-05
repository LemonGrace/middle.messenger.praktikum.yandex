import './Form.scss';
import { Block } from '../../core/Block/Block';
import { IFormProps } from './Form.interface';
import template from './template';
import { MaybeArray, NeedArray } from '../../utils/NeedArray';
import { FormControl } from '../FormControl/FormControl';

export class Form extends Block<IFormProps> {
	constructor(props: IFormProps) {
		super(props, 'Form');
	}

	protected async init() {
		await super.init();
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

	public Validate(): void {
		this.Controls.forEach(control => control.Validate());
	}

	public get IsValid(): boolean {
		return this.Controls.every(control => control.IsValid);
	}

	public SubmitForm(): { [key: string]: any } {
		const data: { [key: string]: any } = {};
		for (const control of this.Controls) {
			data[control.FormControlName as keyof typeof data] = control.Value;
		}
		return data;
	}

	render() {
		return template;
	}
}
