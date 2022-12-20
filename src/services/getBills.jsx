import processBillsRankingData from "./processBillsRankingData"

export default async function getBills () {
  const response = await fetch('https://api.apeswap.finance/bills/summary')
  const json = await response.json()
  // Removing duplicate transactions - Just in case, since sometimes the api brings duplicates
  const uniqueTransactions = []
  function shallowCompare(obj1, obj2) {
    if (Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every(key => obj1[key] === obj2[key])) {
      return true
    }
  }
  for (let i = 0; i < json.length; i++) {
    if (!uniqueTransactions.find(transaction => shallowCompare(transaction, json[i]))) {
      uniqueTransactions.push(json[i])
    }
  }
  // Filtering out bills with more than 7 days "end date / last purchase" from now, and < 1k acquired value and < 5 days of duration
  const processedBills = processBillsRankingData(uniqueTransactions)
  let contractsToFilter = []
  for (let i = 0; i < processedBills.length; i++) {
    let timestamp = processedBills[i].endTimestamp
      if (String(timestamp).includes(' ')) {
        const date = new Date(timestamp)
        timestamp = Math.floor(date.getTime() / 1000)
      }
      const secondsTimestamp = (String(timestamp).length == 10) ? (timestamp * 1000) : timestamp
    if (secondsTimestamp < (Date.now() - 7 * 86400000)) {
      if (processedBills[i].acquiredValue < 1000 || processedBills[i].duration < 5) {
        contractsToFilter.push(processedBills[i].contract)
      }
    }
  }
  const uniqueLegitTransactions = []
  for (let i = 0; i < uniqueTransactions.length; i++) {
    if (!contractsToFilter.find(contract => contract == uniqueTransactions[i].contractAddress)) {
      uniqueLegitTransactions.push(uniqueTransactions[i])
    }
  }
  return uniqueLegitTransactions
}