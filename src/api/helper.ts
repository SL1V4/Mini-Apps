export function formatSongTime(secondsDuration: number): string {
	if (isNaN(secondsDuration)) {
		return '--:--'
	}

	const [min, seconds] = [
		Math.floor(secondsDuration / 60)
			.toString()
			.padStart(2, '0'),
		Math.floor(secondsDuration % 60)
			.toString()
			.padStart(2, '0')
	]

	return `${min}:${seconds}`
}
