import { Props } from './Block.interface';

import { afterEach, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon, { restore, SinonSpy } from 'sinon';

import { Block } from './Block';


interface TestBlockProps extends Props {
    text: string,
}
class TestBlock extends Block<TestBlockProps> {
	constructor(props: TestBlockProps) {
		super({
			...props,
		}, 'TestBlock');
	}

	protected render(): string {
		return `<div>
                    <span id="test-text">{{text}}</span>
                </div>`;
	}
}

describe('Block', () => {
	let testBlock: TestBlock;
	const handlerStub = sinon.stub();
	let spyCDM: SinonSpy;

	beforeEach(async () => {
		testBlock = new TestBlock({
			text: 'Hello',
			events: {
				click: handlerStub,
			},
		});
		spyCDM = sinon.spy(testBlock, 'dispatchComponentDidMount');
		await new Promise(resolve => { setTimeout(resolve, 300); });
	});

	afterEach(() => {
		testBlock.destroy();
		restore();
	});

	it('Создание компонента с состоянием из конструктора', () => {
		const spanText = testBlock.element?.querySelector('#test-text')?.innerHTML;
		expect(spanText).to.be.equal('Hello');
	});

	it('Проверка реактивного поведения', () => {
		const newText = 'new value';
		testBlock.updateProps({
			text: newText,
		});
		const spanText = testBlock.element?.querySelector('#test-text')?.innerHTML;
		expect(spanText).to.be.equal(newText);
	});

	it('Установка событий на элемент', () => {
		const event = new MouseEvent('click');
		testBlock.element?.dispatchEvent(event);
		expect(handlerStub.called).to.be.true;
	});

	describe('Взаимодействие со слушателями', () => {
		it('Вызов dispatchComponentDidMount метода', () => {
			expect(spyCDM.calledOnce).to.be.true;
		});

		it('Вызов dispatchComponentDidUpdate метода', () => {
			const spyCDU = sinon.spy(testBlock, 'dispatchComponentDidUpdate');
			testBlock.updateProps({
				text: 'new value',
			});
			testBlock.dispatchComponentDidUpdate();
			expect(spyCDU.calledOnce).to.be.true;
		});

		it('Вызов dispatchComponentWillUnMount метода', () => {
			const spyCWU = sinon.spy(testBlock, 'dispatchComponentWillUnMount');
			testBlock.dispatchComponentWillUnMount();
			expect(spyCWU.calledOnce).to.be.true;
		});
	});
});
