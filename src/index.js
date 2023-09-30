import Handlebars from 'handlebars';
import { initializePartial, initializeUtils } from './utils/index.js';
import { ROUTES, ROUTES_DATA } from './utils/routes';
import { ERROR_TYPE } from './pages/Error/Error.const';
import Error from './pages/Error/Error';

initializePartial();
initializeUtils();
window.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('app');
	if (root) {
		const path = window.location.pathname;
		const component = ROUTES[path] || Error;
		const component_data = ROUTES_DATA[path] || { type: ERROR_TYPE.STATUS_404 };
		root.innerHTML = Handlebars.compile(component)(component_data);
	}
});
