/**
 * Returns the date in the AM/PM format.
 * @param {Date} date
 * @returns {string}
 */
export function dateToAMPM(date) {
	let hours = date.getHours()
	let minutes = date.getMinutes()
	const ampm = hours >= 12 ? "PM" : "AM"
	hours = hours % 12 || 12
	minutes = minutes < 10 ? `0${minutes}` : minutes
	return `${hours}:${minutes} ${ampm}`
}
