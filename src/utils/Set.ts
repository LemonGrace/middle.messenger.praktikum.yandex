type Indexed<T = any> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	for (const key in rhs) {
		if (!Object.prototype.hasOwnProperty.call(rhs, key)) {
			continue;
		}

		try {
			if (rhs[key].constructor === Object) {
				rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
			} else {
				lhs[key] = rhs[key];
			}
		} catch (e) {
			lhs[key] = rhs[key];
		}
	}

	return lhs;
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
