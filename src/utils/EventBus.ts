
type Handler = (...args: any[]) => void;

export class EventBus<
	Event extends string = string,
	Listener extends Handler = Handler,
> {
	private readonly listeners: { [key: string]: Listener[] } = {};

	public Listen(event: Event, callback: Listener) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event]?.push(callback);
	}

	public UnListen(event: Event, callback: Listener) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback,
		);
	}

	public Emit(event: Event, ...args: any[]) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach((listener: Listener) => {
			listener(...args);
		});
	}
}
