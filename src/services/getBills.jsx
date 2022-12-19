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
  return uniqueTransactions
}