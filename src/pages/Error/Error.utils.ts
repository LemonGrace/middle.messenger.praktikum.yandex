import { ERROR_TYPE, ERROR_TYPE_MESSAGE } from './Error.interface';

export function getErrorMessage(type: ERROR_TYPE): string {
	return ERROR_TYPE_MESSAGE[type];
}
