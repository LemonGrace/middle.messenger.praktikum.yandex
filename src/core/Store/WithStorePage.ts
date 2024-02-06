import { Props } from '../Block/Block.interface';
import { Block } from '../Block/Block';
import store, { IState } from './Store';
import { isEqual } from '../../utils/IsEqual';
import { deepClone } from '../../utils/DeepClone';

type TStore = (Component: typeof Block, mapStateToProps: (state: IState) => Record<string, unknown>)
	=> typeof Block;

const withStorePage: TStore = (Component, mapStateToProps) => {
	return class extends Component {
		constructor(props: Props, tagName: string) {
			super(
				{
					...props,
					...mapStateToProps(store.get()),
				}, tagName,
			);
			let state = mapStateToProps(store.get());
			const storeUpdateListener = () => {
				const newState: Props = mapStateToProps(store.get()) as Props;
				if (!isEqual(state, newState)) {
					this.updateProps({ ...newState });
					state = deepClone(newState);
				}
			};
			store.addUpdateListener(storeUpdateListener);
		}

		componentWillUnmount() {
			super.componentWillUnmount();
			store.destroy();
		}
	} as typeof Block;
};

export default withStorePage;
