import { Route } from './Route';
import { Props } from '../../core/Block/Block.interface';
import { Block } from '../../core/Block/Block';
import { ROUTE } from './ROUTES.const';

class Router {
	private static __instance: Router;
	private routes: Route[] = [];
	private history = window.history;
	private _currentRoute: Route | null = null;
	private readonly _rootQuery: string;

	constructor(rootQuery: string) {
		if (!Router.__instance) {
			this._rootQuery = rootQuery;
			Router.__instance = this;
		}
	}

	protected onRoute(pathname: string) {
		const route = this.getRoute(pathname);
		if (!route) {
			return;
		}

		if (this._currentRoute) {
			this._currentRoute.Leave();
		}

		this._currentRoute = route;
		route.Render();
	}

	protected getRoute(pathname: string): Route {
		const route = this.routes.find((route) => route.Match(pathname));
		if (!route) {
			return this.routes.find((route) => route.Match('/404'));
		}
		return route;
	}

	public Use(pathname: string, block: new (props: Props) => Block, props?: Props): this {
		const route = new Route(pathname, block, {
			...props,
			rootQuery: this._rootQuery,
		});
		this.routes.push(route);
		return this;
	}

	public Start(): void {
		window.onpopstate = (event: PopStateEvent) => {
			this.onRoute((event.currentTarget as typeof window)?.location.pathname);
		};

		this.onRoute(window.location.pathname);
	}

	public Go(pathname: ROUTE): void {
		this.history.pushState({}, '', pathname);
		this.onRoute(pathname);
	}

	public Back(): void {
		this.history.back();
	}

	public Forward(): void {
		this.history.forward();
	}
}

export default new Router('#app');
