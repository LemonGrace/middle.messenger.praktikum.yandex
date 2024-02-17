import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import Router from './Router';
import { TestBlock } from './Route.spec';
import { ROUTE } from './ROUTES.const';

describe('Router', () => {
	beforeEach(() => {
		Router.use(ROUTE.messenger, TestBlock);
		Router.use(ROUTE.profile, TestBlock);
		Router.use(ROUTE.sign_in, TestBlock);
		Router.use(ROUTE.error_404, TestBlock);
	});

	it('Создание и инициализация Router с защищенными путями', async () => {
		window.history.pushState({}, 'Test', ROUTE.profile);
		await Router.start();
		expect(Router.route?.path).to.equal(ROUTE.sign_in);
	});

	it('Создание и инициализация Router', async () => {
		Router.setIsTest = true;
		window.history.pushState({}, 'Test', ROUTE.profile);
		await Router.start();
		expect(Router.route?.path).to.equal(ROUTE.profile);
	});

	it('Переход по страницам без ошибок', async () => {
		Router.setIsTest = true;
		await Router.go(ROUTE.messenger);
		expect(window.location.pathname).to.equal(ROUTE.messenger);
	});

	it('Переход по страницам с ошибкой', async () => {
		Router.setIsTest = true;
		await Router.go(ROUTE.profile);
		expect(window.location.pathname).to.equal(ROUTE.profile);

		await Router.go('/not-registered' as ROUTE);
		expect(window.location.pathname).to.equal(ROUTE.error_404);
	});

	it('Возвращение на шаг назад', async () => {
		Router.setIsTest = true;
		await Router.go(ROUTE.messenger);
		await Router.go(ROUTE.profile);
		expect(window.location.pathname).to.equal(ROUTE.profile);

		await Router.back();
		expect(window.location.pathname).to.equal(ROUTE.messenger);
	});
});
