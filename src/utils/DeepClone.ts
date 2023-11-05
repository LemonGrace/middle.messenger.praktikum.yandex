export function DeepClone<T extends object = object>(obj: T): T {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	if (obj instanceof Date) {
		return new Date(obj) as any as T;
	}

	if (Array.isArray(obj)) {
		const newArr = [];
		for (let index = 0; index < obj.length; index++) {
			newArr[index] = DeepClone(obj[index]);
		}
		return newArr as any as T;
	}
	if (typeof obj === 'object') {
		const newObj: Record<string, unknown> = {};
		const keys: string[] = Object.keys(obj);
		for (const key of keys) {
			newObj[key] = DeepClone((obj as Record<string, any>)[key]);
		}
		return newObj as any as T;
	}
	return obj as any as T;
}
