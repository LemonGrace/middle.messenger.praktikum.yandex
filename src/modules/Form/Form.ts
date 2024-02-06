import './Form.scss';
import { Block } from '../../core/Block/Block';
import { IFormProps } from './Form.interface';
import template from './template';
import { MaybeArray, needArray } from '../../utils/NeedArray';
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

	public addControl(control: MaybeArray<FormControl>) {
		this.children = {
			Controls: [
				...this.children.Controls,
				...needArray(control),
			],
		};
	}

	public get controls(): FormControl[] {
		return this.children.Controls as FormControl[];
	}

	public validate(): void {
		this.controls.forEach(control => control.validate());
	}

	public get isValid(): boolean {
		return this.controls.every(control => control.isValid);
	}

	public submitForm(): { [key: string]: any } {
		const data: { [key: string]: any } = {};
		for (const control of this.controls) {
			data[control.formControlName as keyof typeof data] = control.Value;
		}
		return data;
	}

	render() {
		return template;
	}
}
