import { Route } from './Route';
import { Props } from '../../core/Block/Block.interface';
import { Block } from '../../core/Block/Block';
import { ROUTE } from './ROUTES.const';
import AuthController from '../AuthController';

class Router {
	private static __notProtectedRoute = [ROUTE.sign_in, ROUTE.sign_up];
	private static __instance: Router;
	private routes: Route[] = [];
	private history = window.history;
	private _currentRoute: Route | null = null;
	private readonly _rootQuery: string;

	constructor(rootQuery: string) {
		if (!Router.__instance) {
			this._rootQuery = rootQuery;
			Router.__instance = this;
		} else {
			this._rootQuery = '';
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

	protected getRoute(pathname: string): Route | null {
		const route = this.routes.find((route) => route.Match(pathname));
		if (!route) {
			return this.routes.find((route) => route.Match('/404')) || null;
		}
		return route;
	}

	protected async isUserActive(): Promise<boolean> {
		return AuthController.IsUserActive();
	}

	protected isRouteProtected(pathname: ROUTE): boolean {
		return !Router.__notProtectedRoute.find(route => route === pathname);
	}

	public Use(pathname: string, block: new (props: Props, tagName?: string) => Block, props?: Props): this {
		const route = new Route(pathname, block, {
			...props,
			rootQuery: this._rootQuery,
		});
		this.routes.push(route);
		return this;
	}

	public async Start(): Promise<void> {
		window.onpopstate = (event: PopStateEvent) => {
			this.onRoute((event.currentTarget as typeof window)?.location.pathname);
		};
		await this.Go(window.location.pathname as ROUTE);
	}

	public async Go(pathname: ROUTE): Promise<void> {
		const isUserActive = await this.isUserActive();
		if (isUserActive && [ROUTE.sign_in, ROUTE.sign_up].includes(pathname)) {
			return this.Go(ROUTE.messenger);
		}
		if (this.isRouteProtected(pathname) && !isUserActive) {
			return this.Go(ROUTE.sign_in);
		}
		this.history.pushState({}, '', pathname);
		return this.onRoute(pathname);
	}

	public Back(): void {
		this.history.back();
	}

	public Forward(): void {
		this.history.forward();
	}
}

export default new Router('#app');
