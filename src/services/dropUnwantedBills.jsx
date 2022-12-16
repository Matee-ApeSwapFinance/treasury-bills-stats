export default async function dropUnwantedBills(bills = []) {
  const response = await fetch('https://raw.githubusercontent.com/ApeSwapFinance/apeswap-lists/main/config/bills.json')
  const json = await response.json()
  let unwantedBillsContracts = []
  for (let i = 0; i < json.length; i++) {
    if (json[i].inactive && json[i].inactive == true) {
      unwantedBillsContracts.push(json[i]?.contractAddress[Object.keys(json[i]?.contractAddress)[0]])
    }
  }
  const legitBills = []
  for (let i = 0; i < bills.length; i++) {
    if (!unwantedBillsContracts.find(contract => contract == bills[i].contractAddress)) {
      legitBills.push(bills[i])
    }
  }
  return legitBills
}