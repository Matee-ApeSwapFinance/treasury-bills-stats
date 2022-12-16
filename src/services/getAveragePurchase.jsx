export default function getAveragePurchase(contractTransactions) {
  let total = 0
  for (let i = 0; i < contractTransactions.length; i++) {
    total += parseInt(contractTransactions[i].dollarValue)
  }
  const average = total / contractTransactions.length
  return average
}