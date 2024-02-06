import { IUser } from '../../service/Auth/Auth.interface';
import { EventBus, Handler } from '../EventBus/EventBus';
import { set } from '../../utils/Set';
import { IChat, IChatActive } from '../../service/Chats/Chats.interface';

export interface IState {
    user: IUser | null;
	chats: IChat[];
	selectedChat: IChatActive | null;
}

class Store extends EventBus {
	static EVENTS = {
		UPDATE: 'UPDATE',
	};
	private state: IState = {
		user: null,
		chats: [],
		selectedChat: null,
	};
	private listener: Handler | null = null;

	constructor() {
		super();
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		this.listen(Store.EVENTS.UPDATE, () => {});
	}

	public get(): IState {
		return this.state;
	}

	public set(path: string, value: unknown): void {
		set(this.state, path, value);
		this.emit(Store.EVENTS.UPDATE, this.state);
	}

	public getUser(): IUser | null {
		return this.state?.user || null;
	}

	public getChats(): IChat[] {
		return this.state.chats;
	}

	public getSelectedChat(): IChatActive | null {
		return this.state?.selectedChat || null;
	}

	public addUpdateListener(listener: Handler): void {
		this.listener = listener;
		this.listen(Store.EVENTS.UPDATE, listener);
	}

	public clean(): void {
		this.state = {
			user: null,
			chats: [],
			selectedChat: null,
		};
	}

	public destroy(): void {
		if (this.listener) {
			this.unListen(Store.EVENTS.UPDATE, this.listener);
		}
	}
}

const store = new Store();

export default store;
