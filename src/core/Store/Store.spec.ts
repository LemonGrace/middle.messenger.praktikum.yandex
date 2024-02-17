import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';

import store, { EMPTY_STATE } from './Store';
import Store from './Store';
import { spy } from 'sinon';

describe('Store', () => {
	let storeTest: typeof Store;
	const user = {
		id: 0,
		first_name: 'test',
		second_name: 'test',
		display_name: 'test',
		login: 'test',
		email: 'test',
		phone: 'test',
		avatar: 'test',
	};

	const selectedChat = {
		id: 10,
		title: 'test2',
		avatar: null,
		unread_count: 12,
		created_by: 541,
		last_message: null,
	};

	const chats = [
		{
			id: 12,
			title: 'test',
			avatar: null,
			unread_count: 0,
			created_by: 544,
			last_message: null,
		},
		selectedChat,
	];

	beforeEach(() => {
		storeTest = store;
	});

	it('Проверка изначального состояния store', () => {
		const state = storeTest.get();
		expect(state).to.be.equal(EMPTY_STATE);
	});
	describe('Проверка метода set', () => {
		it('Установка простого пути', () => {
			storeTest.set('user', user);
			const state = storeTest.get();
			expect(state).to.be.deep.equal({
				...EMPTY_STATE,
				user,
			});
		});
		it('Установка сложного пути', () => {
			storeTest.set('user', user);
			storeTest.set('user.login', 'login');
			const state = storeTest.get();
			expect(state).to.be.deep.equal({
				...EMPTY_STATE,
				user: {
					...user,
					login: 'login',
				},
			});
		});
	});

	it('Проверка очищения store', () => {
		storeTest.set('user', user);
		storeTest.clean();
		const state = storeTest.get();
		expect(state).to.be.deep.equal(EMPTY_STATE);
	});

	describe('Создание и удаление подписки на стор', () => {
		const callback = spy();
		it('Создание', () => {
			storeTest.addUpdateListener(callback);
			expect(storeTest.getListener).not.to.be.null;
		});
		it('Удаление', () => {
			storeTest.destroy();
			expect(storeTest.getListener).to.be.null;
		});
	});

	describe('Проверка на получение точечных значений store', () => {
		it('Установка значений', () => {
			storeTest.set('user', user);
			storeTest.set('chats', chats);
			storeTest.set('selectedChat', selectedChat);
		});

		it('Пользователь', () => {
			expect(storeTest.getUser()).to.be.deep.equal(user);
		});
		it('Список чатов', () => {
			expect(storeTest.getChats()).to.be.deep.equal(chats);
		});
		it('Выбранный чат', () => {
			expect(storeTest.getSelectedChat()).to.be.deep.equal(selectedChat);
		});
	});
});
