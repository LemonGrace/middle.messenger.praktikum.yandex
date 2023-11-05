import { Block } from '../../core/Block/Block';
import { Props } from '../../core/Block/Block.interface';
import { IsEqual } from '../../utils/IsEqual';

const render = (query: string, block: Block): Element | null => {
	const root = document.querySelector(query);

	if (root) {
		const content = block.GetContent();
		if (content) {
			root.appendChild(content);
		}
	}

	return root;
};


export class Route {
	private readonly _pathname: string;
	private readonly _blockClass: new (props: Props) => Block;
	private readonly _props: Props;
	private _block: Block | null = null;

	constructor(pathname: string, view: new (props: Props) => Block, props: Props) {
		this._pathname = pathname;
		this._blockClass = view;
		this._props = props;
	}

	public Match(pathname: string): boolean {
		return IsEqual(pathname, this._pathname);
	}

	public Render(): void {
		if (!this._block) {
			this._block = new this._blockClass(this._props);
			render(this._props.rootQuery, this._block);
		}
	}

	public Leave(): void {
		if (this._block) {
			this._block.DispatchComponentWillUnMount();
			this._block = null;
		}
	}
}
