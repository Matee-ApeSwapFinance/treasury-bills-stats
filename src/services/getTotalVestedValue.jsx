export default function getTotalVestedValue(contractTransactions) {
  let vestedValue = 0
  for (let i = 0; i < contractTransactions.length; i++) {
    vestedValue += contractTransactions[i].payout * contractTransactions[i].payoutTokenPrice
  }
  return vestedValue
}