import { IObject } from './IObject';

export function isEqual(
	a: unknown,
	b: unknown,
	depth = 5,
): boolean {
	if (a === b) {
		return true;
	}
	if (!isEqualType(a, b)) {
		return false;
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		return isEqualArray(a, b, depth - 1);
	}
	if (typeof a === 'object' && typeof b === 'object') {
		return isEqualObject(a as IObject, b as IObject, depth - 1);
	}
	return false;
}

function isEqualObject(
	obj1: IObject,
	obj2: IObject,
	depth = 5,
): boolean {
	if (!obj1 || !obj2) {
		return false;
	}
	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
		return false;
	}
	for (const key in obj1) {
		if (!Object.hasOwnProperty.call(obj1, key)) {
			continue;
		}
		if (depth <= 0) {
			if (obj1[key] !== obj2[key]) {
				return false;
			}
			continue;
		}
		if (!isEqual(obj1[key], obj2[key], depth - 1)) {
			return false;
		}
	}
	if (obj1.toString() !== '[object Object]') {
		return obj1.toString() === obj2.toString();
	}
	return true;
}
function isEqualArray(
	arr1: unknown[],
	arr2: unknown[],
	depth = 5,
): boolean {
	if (arr1.length !== arr2.length) {
		return false;
	}
	for (let index = 0; index < arr1.length; index++) {
		if (depth <= 0) {
			if (arr1[index] !== arr2[index]) {
				return false;
			}
			continue;
		}
		if (!isEqual(arr1[index], arr2[index], depth - 1)) {
			return false;
		}
	}
	return true;
}
function isEqualType(a: any, b: any): boolean {
	if (typeof a !== typeof b) {
		return false;
	}
	if (Array.isArray(a) !== Array.isArray(b)) {
		return false;
	}
	if (Number.isNaN(a) !== Number.isNaN(b)) {
		return false;
	}
	return true;
}
