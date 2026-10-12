const dateFormat = new Intl.DateTimeFormat("en-GB", {day: "numeric", month: "short", year: "numeric"});

export function getFormattedDate(date: string | number | Date, options?: Intl.DateTimeFormatOptions) {
	if (typeof options !== "undefined") {
		return new Date(date).toLocaleDateString("en-GB", options);
	}

	return dateFormat.format(new Date(date));
}