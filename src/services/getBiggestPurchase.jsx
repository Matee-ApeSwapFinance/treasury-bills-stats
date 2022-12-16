export default function getBiggestPurchase(contractTransactions) {
  const transactions = [... contractTransactions]
  const orderedTransactions = transactions.sort((a, b) => (parseInt(a.dollarValue) > parseInt(b.dollarValue)) ?  -1 : 1)
  const biggestPurchase = parseInt(orderedTransactions[0]?.dollarValue)
  return biggestPurchase
}