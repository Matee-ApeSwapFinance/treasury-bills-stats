import { useState, useEffect, useContext } from "react"
import BillsContext from '../../context/BillsContext'
import SpotlightTable from './SpotlightTable'
import extractContractTransactions from '../../services/extractContractTransactions'
import Lottie from 'lottie-react'
import Spinner from '../../assets/spinner.json'
import getBills from "../../services/getBills"
import { Link } from 'wouter'
import left_arrow from '../../assets/left_arrow.svg'
import SpotlightSummary from "./SpotlightSummary"
import SpotlightStats from "./SpotlightStats"
import dropUnwantedBills from "../../services/dropUnwantedBills"

const options = {
  animationData: Spinner,
  autoplay: true,
  loop: false,
  style: {
    width: '20%'
  }
}

export default function({ params }) {

  const handleUpdate = async() => {
    setLoading(true)
    console.log('Se fetcheo!')
    // const data = await dropUnwantedBills(await getBills())
    const data = await getBills()
    setBills(data)
    setLoading(false)
  }

  const { contract } = params
  const {bills, setBills, loading, setLoading} = useContext(BillsContext)
  const [contractTransactions, setContractTransactions] = useState([])

  useEffect(() => {
    if (contract != 'nocontract' && bills.find(transaction => transaction.contractAddress == contract)) {
      setContractTransactions(extractContractTransactions(bills, contract))
    }
  }, [bills, contract])

  useEffect(() => {
    if (bills.length == 0) {
      handleUpdate()
    }
  }, [])

  return (
    loading
      ? <div className="loadingPage">
          <Lottie {...options}/>
          <h1>Fetching Data</h1>
        </div>
      : contract == 'nocontract'
          ? <h1>
              Please select a Bill from Ranking page !
            </h1>
          : <div className="spotlight">
              <h1>
                Bill´s Spotlight
              </h1>
              <div className="spotlightInformation">
                <SpotlightSummary
                  contractDetails={ contractTransactions[0] }
                  />
                <SpotlightStats
                  contractTransactions={ contractTransactions }
                  />
              </div>
              <div className="spotlightPlots" style={{display: 'none'}}>
                <h2>Bill's Stats</h2>
                <div>🚧 Under Construction 🚧</div>
              </div>
              <div className="arrowContainer">
                <Link className="arrowSubContainer" to="/ranking">
                  <img className="leftArrow" src={left_arrow}/>
                  <span>Back to Bills Ranking</span>
                </Link>
              </div>
              <h2>Bill's Transactions</h2>
              <div>
                <SpotlightTable
                  dataToDisplay={ contractTransactions }
                />
              </div>
              <div className="arrowContainer">
                <Link className="arrowSubContainer" to="/ranking">
                  <img className="leftArrow" src={left_arrow}/>
                  <span>Back to Bills Ranking</span>
                </Link>
              </div>
            </div>
  )
}