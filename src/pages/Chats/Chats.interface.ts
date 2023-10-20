import { IPageProps } from '../../templateUtils/Page';

export interface IMessageResponse {
	messageID: string,
	text: string,
	// TODO отображение вложенных данных
	isOuterMessage: boolean,
	// TODO добавить утилиты для преобразования времени
	time: string,
}

export interface IChatResponse {
	chatID: string,
	unreadMessages: number,
	username: string,
	userImg: string,
	lastMessage: string,
	isOuter: boolean,
	// TODO добавить утилиты для преобразования времени
	time: string,
	isSelected: boolean,
	messageList: IMessageResponse[],
}

export interface IChatsProps extends IPageProps {
	username: string,
	userImg: string,
	chats: IChatResponse[];
}
