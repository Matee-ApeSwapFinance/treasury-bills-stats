export default function getTotalAcquiredValue(contractTransactions) {
  let acquiredValue = 0
  for (let i = 0; i < contractTransactions.length; i++) {
    acquiredValue += parseInt(contractTransactions[i].dollarValue)
  }
  return acquiredValue
}