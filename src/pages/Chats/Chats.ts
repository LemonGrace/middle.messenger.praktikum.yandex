import './Chats.scss';
import { IPageProps, Page } from '../../core/Page/Page';
import template from './template';
import { IconButton } from '../../components/Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../../components/Buttons/IconButton/IconButton.interface';
import { FormControl } from '../../modules/FormControl/FormControl';
import { AvatarNameButton } from '../../components/AvatarNameButton/AvatarNameButton';
import { DialogCard, DialogCardBase } from '../../components/DialogCard/DialogCard';
import { Header } from '../../components/Header/Header';
import { Chat, ChatBase } from '../../modules/Chat/Chat';
import store, { IState } from '../../core/Store/Store';
import withStorePage from '../../core/Store/WithStorePage';
import ChatsController from '../../controller/ChatsController';
import messageController from '../../controller/ModalController';
import { IChat } from '../../service/Chats/Chats.interface';
import { Modal } from '../../components/Modal/Modal';
import { MODAL_TYPE } from '../../components/Modal/Modal.interface';
import { requiredValidator } from '../../utils/validator';
import { Block } from '../../core/Block/Block';

export class ChatsBase extends Page {
	protected modal = new Modal({
		title: 'Создание нового чата',
		type: MODAL_TYPE.FORM,
		text: 'Введите имя чата:',
		content: [
			new FormControl({
				type: 'text',
				name: 'title',
			}).addValidators([requiredValidator]),
		],
	});

	protected chats: IChat[] = [];

	protected async init() {
		await super.init();
		await ChatsController.getChats();
		const chats = store.getChats();
		const user = store.getUser();
		this.props.withoutCenterLayout = true;
		this.children = {
			Header: [
				new Header({
					title: 'Выберите чат, чтобы начать общение',
				}),
			],
			AvatarNameButton: [
				new AvatarNameButton({
					avatar: user?.avatar || '',
					name: user?.display_name || user?.first_name || '',
				}),
			],
			DialogCards: (chats as IChat[]).map((chat) => {
				return new (DialogCard)({
					...chat as IChat,
					events: {
						click: () => this.onDialogCardClick(chat),
					},
				}, 'DialogCard');
			}),
			FormControl: [
				new FormControl({
					name: 'search',
					placeholder: 'Поиск',
					type: 'text',
				}),
			],
			IconButton: [
				new IconButton({
					type: BUTTON_TYPE.new_chat,
					events: {
						click: async () => this.createChat(),
					},
				}),
			],
			Chat: [new (Chat)({}, 'Chat')],
		};
	}

	protected createChat = async () => {
		const isSuccess = <boolean> await messageController.showModal(this.modal);
		if (!isSuccess) {
			return;
		}
		const title = (this.modal.modalContent?.[0] as FormControl).Value as string;
		if (!title) {
			return;
		}
		await ChatsController.createChat({
			title,
		});
	};

	protected onDialogCardClick = async (chat: IChat) => {
		const selectedCard = store.getSelectedChat();
		const isDelete = chat.id === selectedCard?.id;
		if (!isDelete && selectedCard !== null) {
			(this.children.Chat[0] as ChatBase).cleanChat();
			store.set('selectedChat', null);
		}
		store.set('selectedChat', isDelete ? null : chat);
		const header = this.children.Header[0];
		isDelete ? header.show() : header.hide();
		const chatComponent = this.children.Chat[0] as ChatBase;
		if (!isDelete) {
			await chatComponent.updateInit();
		}
		!isDelete ? chatComponent.show() : chatComponent.hide();
		this.dispatchComponentDidUpdate();
	};

	protected render() {
		return template;
	}

	protected updateChatsCount(): void {
		const chats = store.getChats();
		if (chats.length < this.children.DialogCards?.length) {
			this.children.DialogCards = this.children.DialogCards.filter(
				(chat) => chats.find(_chat => _chat.id === (chat as DialogCardBase).cardID),
			);
		} else {
			const unAddedChats: IChat[] = chats.filter(
				_chat => !this.children.DialogCards.find((card) => (card as DialogCardBase).cardID === _chat.id),
			);
			this.children.DialogCards = [
				...unAddedChats.map(chat => {
					return new (DialogCard)({
						...chat as IChat,
						events: {
							click: () => this.onDialogCardClick(chat),
						},
					}, 'DialogCard');
				}),
				...this.children.DialogCards,
			];
		}
	}

	public updateProps(newProps: IPageProps): void {
		const chats = store.getChats();
		if (chats && this.children.DialogCards?.length) {
			if (chats.length !== this.children.DialogCards?.length) {
				this.updateChatsCount();
			}
		}
		super.updateProps(newProps);
	}
}

// TODO loading
const mapStateToProps = (state: IState) => ({
	user: state.user,
	chats: state.chats,
});

export const Chats = withStorePage(ChatsBase as typeof Block, mapStateToProps);
