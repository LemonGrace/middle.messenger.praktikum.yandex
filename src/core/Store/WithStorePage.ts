import { Props } from '../Block/Block.interface';
import { Block } from '../Block/Block';
import store, { IState } from './Store';
import { IsEqual } from '../../utils/IsEqual';
import { DeepClone } from '../../utils/DeepClone';

type TStore = (Component: typeof Block, mapStateToProps: (state: IState) => Record<string, any>)
	=> typeof Block;

const withStorePage: TStore = (Component, mapStateToProps) => {
	return class extends Component {
		constructor(props: Props, tagName: string) {
			super(
				{
					...props,
					...mapStateToProps(store.Get()),
				}, tagName,
			);
			let state = mapStateToProps(store.Get());
			const storeUpdateListener = () => {
				const newState: Props = mapStateToProps(store.Get()) as Props;
				if (!IsEqual(state, newState)) {
					this.UpdateProps({ ...newState });
					state = DeepClone(newState);
				}
			};
			store.AddUpdateListener(storeUpdateListener);
		}

		componentWillUnmount() {
			super.componentWillUnmount();
			store.Destroy();
		}
	} as typeof Block;
};

export default withStorePage;
