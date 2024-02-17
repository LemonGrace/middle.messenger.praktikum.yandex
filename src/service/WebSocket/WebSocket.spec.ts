import { createSandbox, SinonStub } from 'sinon';
import { expect } from 'chai';
import Socket from './WebSocket';

describe('WebSocket', () => {
	let socket: Socket;
	const fakeSandbox = createSandbox();
	let socketSendStub: SinonStub;

	beforeEach(() => {
		socket = new Socket({
			chatID: 1,
			token: 'test',
			isTest: true,
		});
		socketSendStub = fakeSandbox.stub(socket.Socket, 'send').resolves();
	});

	afterEach(() => {
		fakeSandbox.restore();
	});

	it('Отправка сообщения', () => {
		const content = 'Test string!';
		socket.sendMessage(content);
		expect(socketSendStub.calledWith(JSON.stringify({
			content,
			type: 'message',
		}))).to.be.true;
	});

	it('Получение сообщений', () => {
		socket.getMessages();
		expect(socketSendStub.calledWith(JSON.stringify({
			content: '0',
			type: 'get old',
		}))).to.be.true;
	});
});
