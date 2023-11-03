import './FormControl.scss';
import template from './template';

import { Block } from '../../templateUtils/Block';
import { Input } from '../../components/FormContolElements/Input/Input';
import { Validator } from '../../utils/validator';
import { MaybeArray, NeedArray } from '../../utils/NeedArray';
import { Props } from '../../templateUtils/Block.interface';
import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import { ErrorLabel } from '../../components/FormContolElements/ErrorLabel/ErrorLabel';

export class FormControl extends Block<IInputProps> {
	protected validators: Validator[] = [];
	protected errors: Record<string, string>[] = [];
	protected isTouched = false;

	constructor(props: IInputProps) {
		super(props, 'FormControl');
	}

	protected init() {
		super.init();
		this.children = {
			Input: [
				new Input({
					...this.props,
					events: {
						blur: () => this.Validate(),
						change: () => {
							this.isTouched = true;
						},
					},
				}),
			],
			ErrorLabel: [
				new ErrorLabel({
					errorText: '',
				}),
			],
		};
	}

	render() {
		return template;
	}

	public get IsValid(): boolean {
		if (!this.isTouched) {
			return false;
		}
		return !this.errors.length;
	}

	public Validate() {
		const value = this.Value;
		const errorList = [];
		for (const validator of this.validators) {
			const error = validator(value);
			if (error) {
				errorList.push(error);
			}
		}
		this.errors = errorList;

		this.children.Input[0].UpdateProps({
			...this.props,
			isError: !!this.errors.length,
			value,
		} as Props);
		this.children.ErrorLabel[0].UpdateProps({
			errorText: !this.errors.length ? '' : Object.values(this.errors[0])[0],
		} as Props);
	}

	public AddValidators(validators: MaybeArray<Validator>): this {
		this.validators = [
			...this.validators,
			...NeedArray(validators),
		];
		return this;
	}

	public get Value(): any {
		return (this.children.Input[0].Element as HTMLInputElement).value;
	}

	public get FormControlName(): string {
		return this.props.name || '';
	}
}
