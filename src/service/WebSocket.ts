import store from '../core/Store/Store';
import messageController from '../controller/ModalController';
import ChatsController from '../controller/ChatsController';

const URL = 'wss://ya-praktikum.tech/ws/chats';

export default class Socket {
	private readonly _token: string;
	private readonly _chatId: number;
	private readonly _userId: number;
	protected socket: WebSocket;

	constructor({ chatID, token }: ISocket) {
		this._chatId = chatID;
		this._token = token;
		this._userId = store.GetUser()?.id || 0;
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
				await ChatsController.UpdateMessages(messages);
			} catch (error) {
				await messageController.ShowError(new Error('Повторите попытку позже'));
			}
		});

		this.socket.addEventListener('error', (event) => console.error('Ошибка', event));
		this.socket.onopen = (() => {
			this.GetMessages();
		});
	}

	protected pingPong() {
		setInterval(() => this.socket.send(JSON.stringify({ type: 'ping' })), 10000);
	}

	public async SendMessage(content: string) {
		this.socket.send(JSON.stringify({
			content,
			type: 'message',
		}));

		// await chatsController.getAllChats();
		// store.set('chat.last_message', {
		// 	user: store.state.user,
		// 	time: new Date(),
		// 	content,
		// });
	}

	public GetMessages(): void {
		this.socket.send(JSON.stringify({
			content: '0',
			type: 'get old',
		}));
	}

	public Close(): void {
		return this.socket.close();
	}
}


export interface ISocket {
    chatID: number,
    token: string,
}
