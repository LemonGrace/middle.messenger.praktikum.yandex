import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { HTTPTransport } from './HTTPTransport';
import { expect } from 'chai';
import { IObject } from '../../utils/IObject';

describe('HTTPTransport', () => {
	let http: HTTPTransport;
	let xhr: SinonFakeXMLHttpRequestStatic;
	const requests: SinonFakeXMLHttpRequest[] = [];
	const baseURL = `${HTTPTransport.API_URL}/test`;
	const testData: IObject = {
		key: 10,
	};
	const stringTestData = JSON.stringify(testData);

	beforeEach(() => {
		http = new HTTPTransport('/test');
		xhr = sinon.useFakeXMLHttpRequest();
		xhr.onCreate = (xhr) => requests.push(xhr);
	});

	afterEach(() => {
		xhr.restore();
		requests.length = 0;
	});

	it('Тестирование метода get', async () => {
		http.get('', {
			data: {
				key1: '1',
				key2: '2',
			},
		});
		const request = requests[0];
		expect(request.method).to.equal('GET');
		expect(request.url).to.equal(`${baseURL}?key1=1&key2=2`);
	});

	it('Тестирование метода post', async () => {
		http.post('');
		const request = requests[0];
		expect(request.method).to.equal('POST');
		expect(request.url).to.equal(`${baseURL}`);
	});

	it('Тестирование метода post с телом', async () => {
		http.post('', {
			data: testData,
		});
		const request = requests[0];
		expect(request.method).to.equal('POST');
		expect(request.url).to.equal(`${baseURL}`);
		expect(request.requestBody).to.equal(stringTestData);
	});

	it('Тестирование метода put', async () => {
		http.put('', {
			data: testData,
		});
		const request = requests[0];
		expect(request.method).to.equal('PUT');
		expect(request.url).to.equal(`${baseURL}`);
		expect(request.requestBody).to.equal(stringTestData);
	});

	it('Тестирование метода delete', async () => {
		http.delete('', {
			data: testData,
		});
		const request = requests[0];
		expect(request.method).to.equal('DELETE');
		expect(request.url).to.equal(`${baseURL}`);
		expect(request.requestBody).to.equal(stringTestData);
	});

	it('Тестирование неуспешного запроса', async () => {
		const response = http.get('');
		const request = requests[0];
		request.respond(
			404,
			{ 'Content-Type': 'application/json' },
			'',
		);
		try {
			await response;
		} catch (error: unknown) {
			/** Для обхода ошибки TS1196 */
			if (error instanceof Error) {
				expect(error?.message).to.equal('Что-то пошло не так, повторите попытку позднее');
			}
		}
	});
});
