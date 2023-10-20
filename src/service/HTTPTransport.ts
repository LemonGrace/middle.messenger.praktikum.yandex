export enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

interface IRequestOptions {
	method: METHOD;
	data?: object;
	timeout?: number;
	headers?: Record<string, string>;
	params?: object;
}

type OptionsWithoutMethod = Omit<IRequestOptions, 'method'>;

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
	protected request(url: string, options: IRequestOptions = { method: METHOD.GET }): Promise<XMLHttpRequest> {
		const { method, data, headers } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			if (headers) {
				Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]));
			}
			xhr.onload = () => {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHOD.GET || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	}

	public Get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(
			url + `?${queryStringify(options.data || {})}`,
			{
				...options,
				method: METHOD.GET,
			},
		);
	}

	public Post(url: string, options: IRequestOptions): Promise<XMLHttpRequest> {
		return this.request(url, {
			...options,
			method: METHOD.POST,
		});
	}

	public Put(url: string, options: IRequestOptions): Promise<XMLHttpRequest> {
		return this.request(url, {
			...options,
			method: METHOD.PUT,
		});
	}

	public Delete(url: string, options: IRequestOptions): Promise<XMLHttpRequest> {
		return this.request(url, {
			...options,
			method: METHOD.DELETE,
		});
	}
}
