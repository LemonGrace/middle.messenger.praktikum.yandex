import { Navigation } from './controller/navigation.ts';

window.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('app');
	if (root) {
		const navigation = new Navigation();
		const component = navigation.OpenPage();
		root.append(component.Element as Node);
		component.DispatchComponentDidMount();
	}
});
