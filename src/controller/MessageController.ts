class MessageController {
	public ShowError(error: Error): void {
		// TODO
		console.warn(error);
	}

	public ShowAlert(): void {
		console.warn('ShowAlert');
	}
}
// TODO modal controller
export default new MessageController();
