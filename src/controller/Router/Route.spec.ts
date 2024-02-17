import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import type { SinonStub } from 'sinon';

import { Route } from './Route';
import { Block } from '../../core/Block/Block';
import { stub } from 'sinon';

export class TestBlock extends Block {
	constructor() {
		super({}, 'TestBlock');
	}
	protected render(): string {
		return `<div>
                  Hello, world!
                </div>`;
	}
}
describe('Route', () => {
	let route: Route;
	let routeStub: SinonStub;
	const root = global.document.querySelector('#app');

	beforeEach(() => {
		route = new Route('/test', TestBlock, { rootQuery: '#app' });
		route.render();
		routeStub = stub(route, 'render');
	});

	afterEach(() => {
		while (root?.firstChild) {
			if (root.lastChild) {
				root.removeChild(root.lastChild);
			}
		}
		routeStub.restore();
	});

	it('Проверка на совпадение полей конструктора', () => {
		expect(route.path).to.equal('/test');
		expect(route.blockClass).to.equal(TestBlock);
	});

	it('Проверка на работу метода match', () => {
		expect(route.match('/test')).to.be.true;
		expect(route.match('/new-test')).to.be.false;
	});

	it('Проверка на работу метода render', () => {
		expect(root?.childNodes.length).to.equal(1);
		expect(route.block).not.to.be.null;
	});

	it('Проверка на работу метода leave', () => {
		route.leave();
		expect(root?.childNodes.length).to.equal(0);
		expect(route.block).to.be.null;
	});
});
