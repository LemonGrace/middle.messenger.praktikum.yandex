import './FormControl.scss';
import template from './template';

import { Block } from '../../core/Block/Block';
import { Input } from '../../components/FormContolElements/Input/Input';
import { Validator } from '../../utils/validator';
import { MaybeArray, needArray } from '../../utils/NeedArray';
import { Props } from '../../core/Block/Block.interface';
import { IInputProps } from '../../components/FormContolElements/Input/Input.interface';
import { ErrorLabel } from '../../components/FormContolElements/ErrorLabel/ErrorLabel';

export class FormControl extends Block<IInputProps> {
	protected validators: Validator[] = [];
	protected errors: Record<string, string>[] = [];
	protected isTouched = false;

	constructor(props: IInputProps) {
		super(props, 'FormControl');
	}

	protected async init() {
		await super.init();
		this.children = {
			Input: [
				new Input({
					...this.props,
					events: {
						blur: () => this.validate(),
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

	protected render() {
		return template;
	}

	protected updateError(): void {
		this.children.ErrorLabel[0].updateProps({
			errorText: !this.errors.length ? '' : Object.values(this.errors[0])[0],
		} as Props);
	}

	protected setValue(value: unknown): void {
		(this.children.Input[0].element as HTMLInputElement).value = value as string;
	}

	public get isValid(): boolean {
		if (!this.isTouched) {
			return false;
		}
		return !this.errors.length;
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

		this.children.Input[0].updateProps({
			...this.props,
			isError: !!this.errors.length,
			value,
		} as Props);
		this.updateError();
	}

	public addValidators(validators: MaybeArray<Validator>): this {
		this.validators = [
			...this.validators,
			...needArray(validators),
		];
		return this;
	}

	public addError(error: Record<string, string>): this {
		this.errors = [
			...this.errors,
			error,
		];
		this.children.Input[0].updateProps({
			...this.props,
			isError: !!this.errors.length,
		} as Props);
		this.updateError();
		return this;
	}

	public get Value(): unknown {
		return (this.children.Input[0].element as HTMLInputElement).value;
	}

	public set Value(value: unknown) {
		(this.children.Input[0].element as HTMLInputElement).value = value as string;
	}

	public get formControlName(): string {
		return this.props.name || '';
	}
}
