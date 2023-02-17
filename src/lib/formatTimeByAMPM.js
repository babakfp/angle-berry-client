export function formatTimeByAMPM(date) {
	let hours = date.getHours()
	let minutes = date.getMinutes()
	const ampm = hours >= 12 ? "pm" : "am"
	hours = hours % 12
	hours = hours ? hours : 12 // The hour '0' should be '12'
	minutes = minutes < 10 ? `0${minutes}` : minutes
	return `${hours}:${minutes}${ampm}`
}
