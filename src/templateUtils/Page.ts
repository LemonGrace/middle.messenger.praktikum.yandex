import { Block } from './Block';
import '../styles/general.scss';
import { Props } from './Block.interface';

export interface IPageProps extends Props {
	withoutCenterLayout?: boolean;
}

export class Page<P extends IPageProps = IPageProps> extends Block<P> {
	constructor(props: P) {
		super(props, 'Page');
	}
	protected createWrapper() {
		const page = document.createElement('main');
		page.className = `layout layout__wrapper ${ this.props.withoutCenterLayout ? '' : 'layout-center' }`;
		return page;
	}
}
