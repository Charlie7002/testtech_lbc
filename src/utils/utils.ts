export const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

export const formatDate = (timestamp: number, param: string): string => {
	const date = new Date(timestamp * 1000);
	if (param === 'my') {
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
	}
	if (param === 'dhm') {
		return date.toLocaleDateString('en-Us', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
	}
};
