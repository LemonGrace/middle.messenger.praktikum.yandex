import { Props } from '../../core/Block/Block.interface';

export interface IUserCard extends Props {
    name: string,
    avatar: string,
    id: number,
    events: {
        click: () => void,
    }
}
