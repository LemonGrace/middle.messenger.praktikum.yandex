import store from '../../core/Store/Store';
import messageController from '../../controller/ModalController';
import ChatsController from '../../controller/ChatsController';

const URL = 'wss://ya-praktikum.tech/ws/chats';

export default class Socket {
	private readonly _token: string;
	private readonly _chatId: number;
	private readonly _userId: number;
	/** Для игнорирования ошибки закрытия по невалидному токену на тестах */
	private isTest = false;
	protected socket: WebSocket;

	constructor({ chatID, token, isTest }: ISocket) {
		this._chatId = chatID;
		this._token = token;
		this._userId = store.getUser()?.id || 0;
		if (isTest) {
			this.isTest = isTest;
		}
		this.socket = this.createConnection();

		this.start();
	}

	protected createConnection() {
		return new WebSocket(`${URL}/${this._userId}/${this._chatId}/${this._token}`);
	}

	protected start() {
		this.socket.addEventListener('open', () => {
			this.pingPong.bind(this);
		});

		this.socket.addEventListener('close', (event: CloseEvent) => {
			if (!event.wasClean) {
				console.warn(`Код: ${event.code}, причина: ${event.reason}`);
			}
		});

		this.socket.addEventListener('message', async (event: MessageEvent) => {
			try {
				const messages = JSON.parse(event.data);
				await ChatsController.updateMessages(messages);
			} catch (error) {
				if (!this.isTest) {
					await messageController.showError(new Error('Повторите попытку позже'));
				}
			}
		});

		this.socket.addEventListener('error', (event) => console.error('Ошибка', event));
		this.socket.onopen = (() => {
			this.getMessages();
		});
	}

	protected pingPong() {
		setInterval(() => this.socket.send(JSON.stringify({ type: 'ping' })), 10000);
	}

	public async sendMessage(content: string) {
		this.socket.send(JSON.stringify({
			content,
			type: 'message',
		}));
	}

	public getMessages(): void {
		this.socket.send(JSON.stringify({
			content: '0',
			type: 'get old',
		}));
	}

	public close(): void {
		return this.socket.close();
	}

	public get Socket(): WebSocket {
		return this.socket;
	}
}


export interface ISocket {
    chatID: number,
    token: string,
	isTest?: boolean,
}
