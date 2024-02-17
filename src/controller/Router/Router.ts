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

	protected isTest = false;

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
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	protected async isUserActive(): Promise<boolean> {
		return AuthController.isUserActive();
	}

	protected isRouteProtected(pathname: ROUTE): boolean {
		return !Router.__notProtectedRoute.find(route => route === pathname);
	}

	public getRoute(pathname: string): Route | null {
		const route = this.routes.find((route) => route.match(pathname));
		if (!route) {
			const errorPage = this.routes.find((route) => route.match('/404')) || null;
			if (errorPage) {
				this.history.pushState({}, '', errorPage.path);
			}
			return errorPage;
		}
		return route;
	}

	public use(pathname: string, block: new (props: Props, tagName?: string) => Block, props?: Props): this {
		const route = new Route(pathname, block, {
			...props,
			rootQuery: this._rootQuery,
		});
		this.routes.push(route);
		return this;
	}

	public async start(): Promise<void> {
		window.onpopstate = (event: PopStateEvent) => {
			this.onRoute((event.currentTarget as typeof window)?.location.pathname);
		};
		await this.go(window.location.pathname as ROUTE);
	}

	public async go(pathname: ROUTE): Promise<void> {
		const isUserActive = await this.isUserActive();
		if (isUserActive && [ROUTE.sign_in, ROUTE.sign_up].includes(pathname)) {
			return this.go(ROUTE.messenger);
		}
		if (this.isRouteProtected(pathname) && !isUserActive && !this.isTest) {
			return this.go(ROUTE.sign_in);
		}
		this.history.pushState({}, '', pathname);
		return this.onRoute(pathname);
	}

	public async back(): Promise<void> {
		await this.history.back();
		if (this.isTest) {
			await new Promise(resolve => { setTimeout(resolve, 500); });
		}
	}

	public forward(): void {
		this.history.forward();
	}

	public get route(): Route | null {
		return this._currentRoute;
	}

	public set setIsTest(isTest: boolean) {
		this.isTest = isTest;
	}
}

export default new Router('#app');
