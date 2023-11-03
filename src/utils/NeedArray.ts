
export type MaybeArray<IValue> = null | IValue | ReadonlyArray<IValue>;
export function NeedArray<IValue>(value?: MaybeArray<IValue>): IValue[] {
	if (value == null) {
		return [];
	}
	if (Array.isArray(value)) {
		return value;
	}
	return [value] as IValue[];
}

