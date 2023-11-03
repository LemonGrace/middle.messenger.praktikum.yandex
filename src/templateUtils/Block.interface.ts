import { Block } from './Block';

export type Children = Record<string, Block[]>;

export type DOMEvents = Record<string, (event?: Event) => void>;
export interface Props {
	events?: DOMEvents;
	children?: Children,
	[key: string]: any,
}
