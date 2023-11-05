// eslint-disable-next-line max-classes-per-file
import { IUser } from '../../service/Auth/Auth.interface';
import { EventBus } from '../EventBus/EventBus';
import { Block } from '../Block/Block';
import { set } from '../../utils/Set';
import { Props } from '../Block/Block.interface';

export interface State {
    user?: IUser;
}

class Store extends EventBus {
	static EVENTS = {
		UPDATE: 'UPDATE',
	};
	private state: State = {};

	constructor() {
		super();
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		console.log('Store');
		this.Listen(Store.EVENTS.UPDATE, () => {});
	}

	public Get(): State {
		return this.state;
	}

	public Set(path: string, value: unknown): void {
		set(this.state, path, value);

		// console.log(this.state);
		this.Emit(Store.EVENTS.UPDATE, this.state);
	}

	public GetUser(): IUser | null {
		return this.state?.user || null;
	}
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
	return (Component: typeof Block) => {
		return class extends Component {
			constructor(props: Props, tagName: string) {
				super({
					...props,
					...mapStateToProps(store.Get()),
				}, tagName);

				store.Listen(Store.EVENTS.UPDATE, () => {
					const propsFromState = mapStateToProps(store.Get());
					this.UpdateProps(propsFromState);
				});
			}
		};
	};
}

export default store;
