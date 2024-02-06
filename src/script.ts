import router from './controller/Router/Router';
import { ROUTE } from './controller/Router/ROUTES.const';
import { ROUTE_PAGE, ROUTE_PAGE_DATA } from './controller/Router/ROUTE.interface';

/**
 * users:
 * testNick Ttest3546 id: 1348200
 * burburbur Ttest3546 id: 1349988
 *
 * */
window.addEventListener('DOMContentLoaded', async () => {
	const root = document.getElementById('app');
	if (root) {
		for (const path of Object.values(ROUTE)) {
			router.use(path, ROUTE_PAGE[path], ROUTE_PAGE_DATA[path]);
		}

		await router.start();
	}
});
