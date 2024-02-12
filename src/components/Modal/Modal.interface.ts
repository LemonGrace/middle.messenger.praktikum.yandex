import { Block } from '../../core/Block/Block';

export enum MODAL_TYPE {
    'CONFIRMATION' = 'CONFIRMATION',
    'INFO' = 'INFO',
    'FORM' = 'FORM',
}
export type TModalReturnData = null | boolean;

export interface IModal {
    isOpen?: boolean,
    title: string,
    text?: string,
    content?: Block[],
    type: MODAL_TYPE,
    useTopPosition?: boolean,
}
