import { Block } from '../../core/Block/Block';
import { IUserSettings } from './UserSettings.interface';
import template from './template';
import { FormControl } from '../FormControl/FormControl';
import './UserSettings.scss';
import { ParseNumber } from '../../utils/ParseNumber';
import { UserCard } from '../../components/UserCard/UserCard';
import { IChatUser } from '../../service/Chats/Chats.interface';
import ChatsController from '../../controller/ChatsController';

export class UserSettings extends Block<IUserSettings> {
	constructor(props: IUserSettings) {
		super(props, 'UserSettings');
	}
	protected async init() {
		this.children = {
			// Users: [
			// 	...this.props.users,
			// 	...this.props.users,
			// ].map(user => new UserCard({
			// 	name: user.display_name || user.first_name,
			// 	avatar: user.avatar || '',
			// 	id: user.id,
			// 	events: {
			// 		click: async () => this.deleteUser(user),
			// 	},
			// })),
			Users: this.props.users.map(user => new UserCard({
				name: user.display_name || user.first_name,
				avatar: user.avatar || '',
				id: user.id,
				events: {
					click: async () => this.deleteUser(user),
				},
			})),
			Input: [
				new FormControl({
					name: 'users',
					type: 'text',
					label: 'Для добавления участников введите их ID через запятую:',
				}),
			],
		};
	}

	protected async deleteUser(user: IChatUser) {
		const users = <UserCard[]> this.children.Users;
		const isSuccess = await ChatsController.DeleteChatUsers({
			users: [user.id],
			chatId: this.props.chatId,
		});
		if (isSuccess) {
			this.children.Users = users.filter(_user => _user.UserID !== user.id);
			this.DispatchComponentDidUpdate();
		}
	}

	protected render(): string {
		return template;
	}

	public get NewUsers(): number[] {
		const input = <FormControl> this.children.Input[0];
		if (!input) {
			return [];
		}
		const idsString = (<string> input.Value).split(',');
		const value = idsString.map(id => ParseNumber(id));
		return <number[]> value.filter(id => typeof id === 'number');
	}

	public Clean(): void {
		const input = <FormControl> this.children.Input[0];
		input.Value = '';
	}

	public UpdateProps(nextProps: Partial<IUserSettings>) {
		if (nextProps.users) {
			this.children = {
				...this.children,
				Users: nextProps.users.map(user => new UserCard({
					name: user.display_name || user.first_name,
					avatar: user.avatar || '',
					id: user.id,
					events: {
						click: async () => this.deleteUser(user),
					},
				})),
			};
			this.DispatchComponentDidUpdate();
		}
	}
}
