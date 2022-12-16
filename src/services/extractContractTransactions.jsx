
const extractContractTransactions = (data, contractToExtract) => {
  const extractedContractTransactions = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].contractAddress == contractToExtract) {
      extractedContractTransactions.push(data[i])
    }
  }
  return extractedContractTransactions
}

export default extractContractTransactions