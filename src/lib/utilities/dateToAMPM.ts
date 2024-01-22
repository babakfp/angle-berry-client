export const dateToAMPM = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const amPm = hours >= 12 ? "PM" : "AM"
    const hours12Format = hours % 12 || 12
    const hoursText = hours12Format < 10 ? `0${hours12Format}` : hours12Format
    const minutesText = minutes < 10 ? `0${minutes}` : minutes
    return `${hoursText}:${minutesText} ${amPm}`
}
