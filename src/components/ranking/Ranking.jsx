import { useState, useEffect, useContext } from "react"
import RankingTable from "./RankingTable"
import BillsContext from '../../context/BillsContext'
import processBillsRankingData from '../../services/processBillsRankingData'
import { getBills } from "../../services/getBills"
import SearchSlot from "./SearchSlot"
import { getSummary } from "../../services/getSummary"
import SaleStatusFilter from "./SaleStatusFilter"
import BillTypeFilter from "./BillTypeFilter"

export default function Ranking() {

  const handleUpdate = async() => {
    setLoading(true)
    console.log('Fetched!')
    // const data = await dropUnwantedBills(await getBills())
    const data = await getBills()
    setBills(data)
    const data2 = await getSummary()
    setSummary(data2)
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

  const handleFilter = (filter, selectFilter, selectBillTypeFilter, data) => {
    let filtered = data.filter(obj => String(obj.token).toLowerCase().includes(String(filter).toLowerCase()) || String(obj.lp).toLowerCase().includes(String(filter).toLowerCase()))
    filtered = filtered.filter(obj => {
      if (selectFilter == 'all') {
        return true
      } else if (selectFilter == 'onSale') {
        return obj.soldPercentage < 100
      } else if (selectFilter == 'soldOut') {
        return obj.soldPercentage == 100
      }
    })
    filtered = filtered.filter(obj => {
      if (selectBillTypeFilter == 'all') {
        return true
      } else if (selectBillTypeFilter == 'jungleBills') {
        return obj.type == 'JUNGLE BILL'
      } else if (selectBillTypeFilter == 'bananaBills') {
        return obj.type == 'BANANA BILL'
      }
    })
    return filtered
  }

  const {bills, setBills, summary, setSummary, loading, setLoading} = useContext(BillsContext)
  const [rankingData, setRankingData] = useState([])
  const [filterString, setFilterString] = useState()
  const [selectFilter, setSelectFilter] = useState('all')
  const [selectBillTypeFilter, setSelectBillTypeFilter] = useState('all')
  const [filteredRankingData, setFilteredRankingData] = useState([])
  const [sortMethod, setSortMethod] = useState({method: 'ROI', descending: true})

  useEffect(() => {
    setRankingData(processBillsRankingData(bills, summary))
  }, [bills, summary])

  useEffect(() => {
    if (bills.length == 0) {
      handleUpdate()
    } else {
      console.log("Did not fetch!")
      setRankingData(processBillsRankingData(bills, summary))
    }
  }, [])

  useEffect(() => {
    setFilteredRankingData(handleFilter(filterString, selectFilter, selectBillTypeFilter, rankingData))
  }, [filterString, selectFilter, selectBillTypeFilter])


  return(
    loading
      ? <div className="loadingPage">
          <span className="loader"></span>
          <h1>Processing Data</h1>
        </div>
      : <div className="ranking">
          <div className="searchOptions">
            <BillTypeFilter
              setSelectBillTypeFilter={ setSelectBillTypeFilter }
            />
            <SaleStatusFilter
              setSelectFilter={ setSelectFilter }
            />
            <SearchSlot
              setFilterString={ setFilterString }
            />
          </div>
          <RankingTable
            dataToDisplay={ filteredRankingData }
            handleSort={ handleSort }
            sortMethod={ sortMethod }
          />
        </div>
  )
}
