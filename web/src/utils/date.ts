
export function getFormattedDate(date: string | number | Date) {
	
	const dateFormat = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	
	return dateFormat.format(new Date(date));
}
