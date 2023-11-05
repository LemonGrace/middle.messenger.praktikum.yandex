type Indexed<T = any> = {
    [key in string]: T;
};

export function merge(savedAndRecordedObj: Indexed, newObj: Indexed): Indexed {
	for (const key in newObj) {
		if (!Object.prototype.hasOwnProperty.call(newObj, key)) {
			continue;
		}

		try {
			if (newObj[key].constructor === Object) {
				savedAndRecordedObj[key] = merge(savedAndRecordedObj[key] as Indexed, newObj[key] as Indexed);
			} else {
				savedAndRecordedObj[key] = newObj[key];
			}
		} catch (e) {
			savedAndRecordedObj[key] = newObj[key];
		}
	}

	return savedAndRecordedObj;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	if (typeof object !== 'object' || object === null) {
		return object;
	}

	const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
		[key]: acc,
	}), value as any);
	return merge(object as Indexed, result);
}
