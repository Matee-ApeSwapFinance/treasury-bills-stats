import { useContext, useEffect } from "react"
import BillsContext from '../../context/BillsContext'
import getBills from "../../services/getBills"
import Lottie from 'lottie-react'
import Spinner from '../../assets/spinner.json'
import dropUnwantedBills from "../../services/dropUnwantedBills"

const options = {
  animationData: Spinner,
  autoplay: true,
  loop: false,
  style: {
    width: '20%'
  }
}

export default function Stats() {
  const {bills, setBills, loading, setLoading} = useContext(BillsContext)

  const handleUpdate = async() => {
    setLoading(true)
    console.log('Fetched!')
    // const data = await dropUnwantedBills(await getBills())
    const data = await getBills()
    setBills(data)
    setLoading(false)
  }

  useEffect(() => {
    if (bills.length == 0) {
      handleUpdate()
    } else {
      console.log("Did not fetch!")
    }
  }, [])

  return (
    loading
      ? <div className="loadingPage">
          <Lottie {...options}/>
          <h1>Fetching Data</h1>
        </div>
      : <div>
          <h1>Bill´s Overall Stats</h1>
          <div>🚧 Under construction 🚧</div>
          <div>Unique wallets who purchased Bills</div>
          <div>Total number of Bills deployed</div>
          <div>Total number of Bills purchases</div>
          <div>Total acquired USD amount</div>
          <div>Total vested USD amount</div>
          <div>Overall average ROI</div>
          {
            /*
            Further ideas:
            Evolution of unique wallets interacting over time
            Evolution of Total number of bills purchased over time
            Evolution of total acquired USD amount over time
            Evolution of total vested USD amount over time
            Evolution of overall average ROI over time
            */
          }
        </div>
  )
}