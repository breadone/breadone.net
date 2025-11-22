export function calcReadTime(wordCount: number) {
	let d = new Date()
    // avg reading rate of 184 wpm
	d.setMinutes(wordCount/184);
	if (d.getMinutes() == 0) {
		return "< 1";
	} else {
		return d.getMinutes().toLocaleString();
	}
}