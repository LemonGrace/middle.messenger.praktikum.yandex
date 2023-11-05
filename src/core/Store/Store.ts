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
		this.Listen(Store.EVENTS.UPDATE, () => {});
	}

	public Get(): IState {
		return this.state;
	}

	public Set(path: string, value: unknown): void {
		set(this.state, path, value);
		this.Emit(Store.EVENTS.UPDATE, this.state);
	}

	public GetUser(): IUser | null {
		return this.state?.user || null;
	}

	public GetChats(): IChat[] {
		return this.state.chats;
	}

	public GetSelectedChat(): IChatActive | null {
		return this.state?.selectedChat || null;
	}

	public AddUpdateListener(listener: Handler): void {
		this.listener = listener;
		this.Listen(Store.EVENTS.UPDATE, listener);
	}

	public Clean(): void {
		this.state = {
			user: null,
			chats: [],
			selectedChat: null,
		};
	}

	public Destroy(): void {
		if (this.listener) {
			this.UnListen(Store.EVENTS.UPDATE, this.listener);
		}
	}
}

const store = new Store();

export default store;
