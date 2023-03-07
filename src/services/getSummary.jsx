export async function getSummary () {
  const response = await fetch('https://api-v2.apeswap.finance/bills/summary')
  const json = await response.json()
  
  let summary = json.summary

  // Making lowercase all summary's contract addresses and picking just the info needed for each bill
  const reducedSummary = []

  for (let i = 0; i < summary.length; i++) {
    const soldPercentage = (summary[i].tokensPurchased / (summary[i].tokensPurchased + summary[i].tokensRemaining)) * 100 
    const soldPercentageToShip = (soldPercentage > 98) ? 100 : soldPercentage

    reducedSummary.push({
      contract: summary[i].contract.toLowerCase(),
      tokensPurchased: summary[i].tokensPurchased,
      tokensRemaining: summary[i].tokensRemaining,
      soldPercentage: parseFloat(soldPercentageToShip.toFixed(1))
    })
  }

  return reducedSummary
}