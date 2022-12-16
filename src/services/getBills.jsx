export default async function getBills () {
  const response = await fetch('https://api.apeswap.finance/bills/summary')
  const json = response.json()
  return json
}