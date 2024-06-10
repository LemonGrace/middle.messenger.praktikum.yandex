
export type Handler = (...args: any[]) => void;

export class EventBus<
	Event extends string = string,
	Listener extends Handler = Handler,
> {
	private readonly listeners: { [key: string]: Listener[] } = {};

	public listen(event: Event, callback: Listener) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event]?.push(callback);
	}

	public unListen(event: Event, callback: Listener) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback,
		);
	}

	public emit(event: Event, ...args: any[]) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach((listener: Listener) => {
			listener(...args);
		});
	}

	public get publicListeners(): { [key: string]: Listener[] } {
		return this.listeners;
	}
}
