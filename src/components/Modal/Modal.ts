import template from './template';
import { Block } from '../../core/Block/Block';
import { IModal, MODAL_TYPE, TModalReturnData } from './Modal.interface';
import './Modal.scss';
import { IconButton } from '../Buttons/IconButton/IconButton';
import { BUTTON_TYPE } from '../Buttons/IconButton/IconButton.interface';
import { Button } from '../Buttons/Button/Button';

export class Modal extends Block<IModal> {
	protected modalRoot: HTMLDialogElement | null = null;

	constructor(props: IModal) {
		super(props, 'Modal');
	}

	protected async init() {
		await super.init();
		this.children = {
			IconButton: [
				new IconButton({
					type: BUTTON_TYPE.delete,
				}),
			],
			Button: this.createButtons(),
			Content: this.props.content ? this.props.content : [],
		};
		this.modalRoot = <HTMLDialogElement> document.getElementById('modal');
	}

	protected createButtons(): Button[] {
		switch (this.props.type) {
		case MODAL_TYPE.CONFIRMATION:
			return [
				new Button({
					events: {},
					text: 'Да',
				}),
				new Button({
					events: {},
					text: 'Нет',
				}),
			];
		case MODAL_TYPE.FORM:
			return [
				new Button({
					events: {},
					text: 'Подтвердить',
				}),
				new Button({
					events: {},
					text: 'Отмена',
				}),
			];
		case MODAL_TYPE.INFO:
			return [
				new Button({
					events: {},
					text: 'Понятно',
				}),
			];
		default:
			return [
				new Button({
					events: {},
					text: 'Понятно',
				}),
			];
		}
	}

	protected closeEventCallback = (resolve: (value: TModalReturnData) => void, isSuccess = false) => {
		this.Close();
		resolve(this.getResultValue(isSuccess));
	};

	protected subscribeToButtons(): Promise<TModalReturnData> {
		return new Promise<TModalReturnData>((resolve) => {
			(this.children.IconButton[0].Element as HTMLElement)?.addEventListener(
				'click',
				() => this.closeEventCallback(resolve),
				{
					once: true,
				},
			);
			(this.children.Button[0].Element as HTMLElement)?.addEventListener(
				'click',
				() => this.closeEventCallback(resolve, true),
				{
					once: true,
				},
			);
			if (this.props.type === 'CONFIRMATION' || this.props.type === 'FORM') {
				(this.children.Button[1].Element as HTMLElement)?.addEventListener(
					'click',
					() => this.closeEventCallback(resolve),
					{
						once: true,
					},
				);
			}
		});
	}

	protected getResultValue(isSuccess = false): TModalReturnData {
		switch (this.props.type) {
		case MODAL_TYPE.CONFIRMATION:
		case MODAL_TYPE.FORM:
			return isSuccess;
		case MODAL_TYPE.INFO:
			return null;
		default:
			return null;
		}
	}

	public get Content(): Block[] | null {
		return this.props.content || null;
	}

	public async Open(): Promise<TModalReturnData> {
		if (!this.modalRoot || !this.Element) {
			return null;
		}
		this.modalRoot.appendChild(this.Element);
		(<HTMLDialogElement> this.modalRoot).showModal();
		return this.subscribeToButtons();
	}

	public Close() {
		if (!this.modalRoot || !this.Element) {
			return;
		}
		this.modalRoot.removeChild(this.Element);
		(<HTMLDialogElement> this.modalRoot).close();
	}

	render() {
		return template;
	}
}
