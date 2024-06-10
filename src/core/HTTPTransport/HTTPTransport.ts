import { IHTTPResult, IRequestOptions, METHOD, THTTPMethod } from './HTTPTransport.interface';

function queryStringify(data: object): string {
	if (typeof data !== 'object') {
		return '';
	}
	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key as keyof typeof data]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
}

export class HTTPTransport {
	static API_URL = 'https://ya-praktikum.tech/api/v2';
	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public request<IResult>(
		url: string,
		options: IRequestOptions = { method: METHOD.GET },
	): Promise<IHTTPResult<IResult>> {
		const { method, data } = options;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.timeout = 10000;

			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status >= 200 && xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(new Error(xhr.response?.reason || 'Что-то пошло не так, повторите попытку позднее'));
					}
				}
			};

			xhr.onabort = () => reject(new Error('Запрос был отменен'));
			xhr.onerror = () => reject(new Error('Произошла непредвиденная ошибка'));
			xhr.ontimeout = () => reject(new Error('Истекло время ожидания'));

			xhr.withCredentials = true;
			xhr.responseType = 'json';

			if (data instanceof FormData) {
				xhr.send(data);
				return;
			}
			xhr.setRequestHeader('Content-type', 'application/json');
			if (method === METHOD.GET || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		}).then(data => [data as IResult, null] as IHTTPResult<IResult>);
	}

	public get: THTTPMethod = (url, options) => {
		return this.request(
			`${this.endpoint}${url}${queryStringify(options?.data ? options.data : {})}`,
			{
				...options,
				method: METHOD.GET,
			},
		);
	};

	public post: THTTPMethod = (url, options) => {
		return this.request(
			`${this.endpoint}${url}`,
			{
				...options,
				method: METHOD.POST,
			},
		);
	};

	public put: THTTPMethod = (url, options) => {
		return this.request(
			`${this.endpoint}${url}`,
			{
				...options,
				method: METHOD.PUT,
			},
		);
	};

	public delete: THTTPMethod = (url, options) => {
		return this.request(
			`${this.endpoint}${url}`,
			{
				...options,
				method: METHOD.DELETE,
			},
		);
	};
}
