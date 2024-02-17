import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { SinonSpy, spy } from 'sinon';

import { EventBus } from './EventBus';


describe('EventBus', () => {
	let eventTestCallback: SinonSpy;
	let eventBus: EventBus;
	const testEventName = 'test';
	const testEventNameNotExisting = 'hello';

	beforeEach(() => {
		eventTestCallback = spy();
		eventBus = new EventBus();
		eventBus.listen(testEventName, eventTestCallback);
	});

	afterEach(() => {
		eventBus.unListen(testEventName, eventTestCallback);
	});

	it('Проверяем наличие подписки у EventBus', () => {
		expect(eventBus.publicListeners[testEventName]).to.include(eventTestCallback);
	});

	describe('Проверка emit для события', () => {
		it('Базовый тригер события', () => {
			eventBus.emit(testEventName, 'args');
			expect(eventTestCallback.calledWith('args')).to.be.true;
		});

		it('Проверка нескольких подписчиков на событие', () => {
			const eventTestCallback2 = spy();
			const data = {
				test: 10,
			};
			eventBus.listen(testEventName, eventTestCallback2);
			eventBus.emit(testEventName, data);
			expect(eventTestCallback.calledWith(data) && eventTestCallback2.calledWith(data)).to.be.true;
		});

		it('Тригер несуществующего события', () => {
			try {
				eventBus.emit(testEventNameNotExisting, 'args');
			} catch (error: unknown) {
				/** Для обхода ошибки TS1196 */
				if (error instanceof Error) {
					expect(error?.message).to.equal(`Нет события: ${ testEventNameNotExisting }`);
					expect(eventTestCallback.called).to.be.false;
				}
			}
		});
	});

	describe('Проверка отписки от события', () => {
		it('Удаление существующего события', () => {
			eventBus.unListen(testEventName, eventTestCallback);
			expect(eventBus.publicListeners[testEventName]).to.not.include(eventTestCallback);
		});

		it('Удаление несуществующего события', () => {
			try {
				eventBus.unListen(testEventNameNotExisting, eventTestCallback);
			} catch (error: unknown) {
				/** Для обхода ошибки TS1196 */
				if (error instanceof Error) {
					expect(error?.message).to.equal(`Нет события: ${ testEventNameNotExisting }`);
				}
			}
		});
	});
});
