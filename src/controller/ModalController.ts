import { Modal } from '../components/Modal/Modal';
import { MODAL_TYPE, TModalReturnData } from '../components/Modal/Modal.interface';

class ModalController {
	public async showError(error: Error): Promise<void> {
		console.warn(error);
		const modal = new Modal({
			title: 'Обратите внимание!',
			text: error.message,
			type: MODAL_TYPE.INFO,
		});
		/** Ожидаем окончания инициализации */
		await new Promise(resolve => {
			setTimeout(resolve, 1000);
		});
		await modal.open();
	}

	public async showModal(modal: Modal): Promise<TModalReturnData> {
		return modal.open();
	}
}

export default new ModalController();
