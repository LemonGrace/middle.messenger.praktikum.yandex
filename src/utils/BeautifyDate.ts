const DAY = 1000 * 3600 * 24;
const NOW = new Date();
export function BeautifyDate(date: string, withDay = false): string {
	if (!date) {
		return '';
	}
	const dateFormatted = new Date(date);
	const diff = NOW.getDate() - dateFormatted.getTime();
	if (diff < DAY) {
		if (withDay) {
			return dateFormatted.toLocaleTimeString(
				[],
				{
					hour: '2-digit',
					minute: '2-digit',
					day: '2-digit',
					month: '2-digit',
				},
			);
		}
		return dateFormatted.toLocaleTimeString(
			[],
			{
				hour: '2-digit',
				minute: '2-digit',
			},
		);
	}
	return dateFormatted.toLocaleDateString(
		[],
		{
			day: '2-digit',
			month: '2-digit',
		},
	);
}
