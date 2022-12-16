export default function processDate(rawDate) {
  let timestamp
  if(String(rawDate).includes(' ')) {
    const date = new Date(rawDate)
    timestamp = Math.floor(date.getTime() / 1000)
  } else {
    timestamp = rawDate
  }
  const secondsTimestamp = (String(timestamp).length == 10) ? (timestamp * 1000) : timestamp
  const date = new Date(secondsTimestamp)
  const dateToDisplay = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
  return dateToDisplay
}