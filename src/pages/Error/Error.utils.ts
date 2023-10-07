import { ERROR_TYPE, ERROR_TYPE_MESSAGE } from './Error.const';

export function getErrorMessage(type: ERROR_TYPE) {
	return ERROR_TYPE_MESSAGE[type];
}
