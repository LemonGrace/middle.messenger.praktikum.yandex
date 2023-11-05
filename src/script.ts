import router from './controller/Router/Router';
import { ROUTE } from './controller/Router/ROUTES.const';
import { ROUTE_PAGE, ROUTE_PAGE_DATA } from './controller/Router/ROUTE.interface';
import AuthController from './controller/AuthController';


window.addEventListener('DOMContentLoaded', async () => {
	const root = document.getElementById('app');
	if (root) {
		for (const path of Object.values(ROUTE)) {
			router.Use(path, ROUTE_PAGE[path], ROUTE_PAGE_DATA[path]);
		}

		let isProtectedRoute = true;
		switch (window.location.pathname) {
		case ROUTE.sign_in:
		case ROUTE.sign_up:
			isProtectedRoute = false;
			break;
		default:
			break;
		}

		const isUserActive = await AuthController.IsUserActive();
		if (isUserActive) {
			router.Start();
			if (!isProtectedRoute) {
				router.Go(ROUTE.settings);
			}
			return;
		}

		router.Start();
		if (isProtectedRoute) {
			router.Go(ROUTE.sign_in);
		}
	}
});
