import './Chats.scss';
import { Page } from '../../templateUtils/Page';
import template from './template';
import { IconButton } from '../../components/Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../../components/Buttons/IconButton/IconButton.interface';
import { FormControl } from '../../modules/FormControl/FormControl';
import { AvatarNameButton } from '../../components/AvatarNameButton/AvatarNameButton';
import { IChatResponse, IChatsProps } from './Chats.interface';
import { DialogCard } from '../../components/DialogCard/DialogCard';
import { Header } from '../../components/Header/Header';
import { Chat } from '../../modules/Chat/Chat';

export class Chats extends Page<IChatsProps> {
	protected init() {
		super.init();
		this.props.withoutCenterLayout = true;
		this.children = {
			Header: [
				new Header({
					title: 'Выберите чат, чтобы начать общение',
				}),
			],
			AvatarNameButton: [
				new AvatarNameButton({
					username: this.props.username,
					userImg: this.props.userImg,
				}),
			],
			DialogCards: this.props.chats.map((chat) => {
				return new DialogCard({
					...chat,
					events: {
						click: () => {
							this.onDialogCardClick(chat);
							this.updateContent();
						},
					},
				});
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
						click: () => {
							// eslint-disable-next-line no-console
							console.log('Надо сделать модалку?');
						},
					},
				}),
			],
			Chat: [
				new Chat({
					...this.props.chats[0],
					selfUserName: this.props.username,
					selfUserImage: this.props.userImg,
				}).Hide(),
			],
		};
	}

	protected onDialogCardClick = (chat: IChatResponse) => {
		const cards = this.children.DialogCards as DialogCard[];
		const prevSelectedCard = cards.find(card => card.IsSelected);
		const currentCard = cards.find(card => card.CardID === chat.chatID);
		const chatElement = this.children.Chat[0] as Chat;

		if (!currentCard) {
			return;
		}
		if (prevSelectedCard) {
			prevSelectedCard.UpdateProps({
				...prevSelectedCard.DialogCardProps,
				isSelected: false,
			});
			chatElement.Hide();
		}
		if (prevSelectedCard && prevSelectedCard.CardID === currentCard.CardID) {
			return;
		}
		currentCard.UpdateProps({
			...currentCard.DialogCardProps,
			isSelected: true,
		});
		chatElement.UpdateProps({
			...chat,
			selfUserName: this.props.username,
			selfUserImage: this.props.userImg,
		});
		chatElement.Show();
	};

	protected updateContent(): void {
		const isCardSelected = (this.children.DialogCards as DialogCard[]).find(card => card.IsSelected);
		if (isCardSelected) {
			this.children.Header[0].Hide();
			return;
		}
		this.children.Header[0].Show();
	}

	protected render() {
		return template;
	}
}
