import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import { EventBus } from '../EventBus/EventBus';
import { Children, DOMEvents, Props } from './Block.interface';
import { isEqual } from '../../utils/IsEqual';

export class Block<P extends Props = Props> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
		FLOW_CWUM: 'flow:component-will-unmount',
	};

	private _element: HTMLElement | null = null;

	private readonly _tagName: string = '';
	private eventBus: () => EventBus;
	protected props: P;
	protected children: Children;

	public readonly ID = makeUUID();

	constructor(propsWithChildren: P, tagName?: string) {
		const eventBus = new EventBus();
		if (tagName) {
			this._tagName = tagName;
		}
		const { props, children } = this._getPropsAndChildren(propsWithChildren);
		this.children = children;
		this.props = this._makePropsProxy(props, this);

		this.eventBus = () => eventBus;

		this.registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _getPropsAndChildren(propsWithChildren: P): { props: P, children: Children } {
		const props: P = {} as P;
		const children: Children = {};

		Object.entries(propsWithChildren).forEach(([key, value]) => {
			if (key === 'children') {
				children[key] = value as Block[];
			} else {
				props[key as keyof P] = value;
			}
		});

		return {
			props,
			children,
		};
	}

	private _makePropsProxy(props: P, block: Block) {
		return new Proxy(props, {
			set(target, prop, value) {
				const oldProps = { ...target };
				target[prop as keyof P] = value;
				if (block.eventBus) {
					block.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
				}
				return true;
			},
		});
	}

	private registerEvents(eventBus: EventBus) {
		eventBus.listen(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.listen(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.listen(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.listen(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
		eventBus.listen(Block.EVENTS.FLOW_CWUM, this._componentWillUnmount.bind(this));
	}

	private async _init() {
		this._createResources();
		await this.init();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _createResources() {
		this._element = this._createDocumentElement();
	}

	private _createDocumentElement() {
		return document.createElement(this._tagName);
	}

	private _render() {
		const renderString = this.render();
		if (!renderString) {
			return;
		}
		const fragment = this.compile(renderString, this.props);
		const newElement = fragment.firstElementChild as HTMLElement;
		const wrapper = this.createWrapper();
		if (wrapper) {
			wrapper.appendChild(newElement);
		}
		if (this._element && (wrapper || newElement)) {
			this._element.replaceWith(wrapper || newElement);
		}
		this._element = wrapper || newElement;

		this._addEventListeners();
		this.dispatchComponentDidMount();
	}

	private _componentDidMount() {
		this.componentDidMount();
	}

	private _addEventListeners() {
		const { events = {} } = this.props;
		if (!this._element) {
			return;
		}
		Object.keys(events as DOMEvents).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	private _componentDidUpdate(oldProps: P, newProps: P) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this._render();
		}
	}

	private _componentWillUnmount() {
		this.componentWillUnmount();
		this._removeEvents();
		if (this._element) {
			this._element.remove();
		}
	}

	private _removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			this._element?.removeEventListener(eventName, events[eventName]);
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function,no-empty-function
	protected async init() {}

	protected compile(template: string, context: P): DocumentFragment {
		const contextAndStubs = { ...context };
		const children = this.children;
		Object.entries(children).forEach(([name, component]) => {
			contextAndStubs[name as keyof P] = component.map(child => {
				return `<div data-id='${child.ID}'></div>`;
			}) as P[keyof P];
		});
		const html = Handlebars.compile(template)(contextAndStubs);
		const temp = document.createElement('template');
		temp.innerHTML = html;

		Object.entries(children).forEach(([, component]) => {
			component.forEach((child) => {
				const stub = temp.content.querySelector(`[data-id='${child.ID}']`);
				if (!stub) {
					return;
				}
				const _elem = child.getContent();
				_elem?.append(...Array.from(stub.childNodes));
				if (_elem) {
					stub.replaceWith(_elem);
				}
			});
		});
		return temp.content;
	}

	protected createWrapper(): HTMLElement | null {
		return null;
	}

	protected render(): string {
		return '';
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected componentDidMount() {}

	protected componentDidUpdate(oldProps: P, newProps: P) {
		return !isEqual(oldProps, newProps);
	}

	protected componentWillUnmount() {
		this._removeEvents();
	}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	public dispatchComponentDidUpdate() {
		this._render();
	}

	public updateProps(nextProps: Partial<P>): void {
		if (!nextProps) {
			return;
		}
		Object.assign(this.props, nextProps);
	}

	public dispatchComponentWillUnMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CWUM);
		Object.values(this.children).forEach(child => {
			child.forEach(subChild => subChild.dispatchComponentWillUnMount());
		});
	}

	public get element(): HTMLElement | null {
		return this._element;
	}

	public getContent() {
		return this.element;
	}

	public show(): this {
		const content = this.getContent();
		if (content) {
			content.style.display = 'block';
		}
		return this;
	}

	public hide(): this {
		const content = this.getContent();
		if (content) {
			content.style.display = 'none';
		}
		return this;
	}

	public destroy(): void {
		this._componentWillUnmount();
	}
}
