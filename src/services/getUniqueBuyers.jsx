export default function getUniqueBuyers(contractTransactions) {
  let uniqueBuyers = []
  for (let i = 0; i < contractTransactions.length; i++) {
    if (!uniqueBuyers.find(buyer => buyer.buyerAdress == contractTransactions[i].createdAddressOwner)) {
      uniqueBuyers.push(
        {
          buyerAdress: contractTransactions[i].createdAddressOwner,
          spend: parseInt(contractTransactions[i].dollarValue)
        }
      )
    } else {
      const indexOfBuyer = uniqueBuyers.findIndex(buyer => buyer.buyerAdress == contractTransactions[i].createdAddressOwner)
      uniqueBuyers[indexOfBuyer].spend += parseInt(contractTransactions[i].dollarValue)
    }
  }
  return uniqueBuyers
}