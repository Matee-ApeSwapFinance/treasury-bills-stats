import { useState, useEffect, useContext } from "react"
import RankingTable from "./RankingTable"
import BillsContext from '../../context/BillsContext'
import processBillsRankingData from '../../services/processBillsRankingData'
import getBills from "../../services/getBills"
import SearchSlot from "./SearchSlot"

export default function Ranking() {

  const handleUpdate = async() => {
    setLoading(true)
    console.log('Fetched!')
    // const data = await dropUnwantedBills(await getBills())
    const data = await getBills()
    setBills(data)
    setLoading(false)
  }

  const handleSort = (sortBy) => {
    console.log('Sorted !')
    if (sortBy == sortMethod.method) {
      setSortMethod({method: sortBy, descending: !sortMethod.descending})
    } else {
      setSortMethod({method: sortBy, descending: true})
    }
  }

  const handleFilter = (filter, data) => {
    const filtered = data.filter(obj => String(obj.token).toLowerCase().includes(String(filter).toLowerCase()) || String(obj.lp).toLowerCase().includes(String(filter).toLowerCase()))
    return filtered
  }

  const {bills, setBills, loading, setLoading} = useContext(BillsContext)
  const [rankingData, setRankingData] = useState([])
  const [filterString, setFilterString] = useState()
  const [filteredRankingData, setFilteredRankingData] = useState([])
  const [sortMethod, setSortMethod] = useState({method: 'ROI', descending: true})

  useEffect(() => {
    setRankingData(processBillsRankingData(bills))
  }, [bills])

  useEffect(() => {
    if (bills.length == 0) {
      handleUpdate()
    } else {
      console.log("Did not fetch!")
      setRankingData(processBillsRankingData(bills))
    }
  }, [])

  useEffect(() => {
    setFilteredRankingData(handleFilter(filterString, rankingData))
  }, [filterString])

  return(
    loading
      ? <div className="loadingPage">
          <span className="loader"></span>
          <h1>Fetching Data</h1>
        </div>
      : <div className="ranking">
          <SearchSlot
            setFilterString={ setFilterString }
          />
          <RankingTable
            dataToDisplay={ filteredRankingData }
            handleSort={ handleSort }
            sortMethod={ sortMethod }
          />
        </div>
  )
}
