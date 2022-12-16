import { useContext } from 'react'
import getBills from "../../services/getBills"
import BillsContext from '../../context/BillsContext'
import UpdateRankingButton from './UpdateRankingButton'
import ActiveLink from './ActiveLink'
import CsvDownloadButton from 'react-json-to-csv'
import dropUnwantedBills from '../../services/dropUnwantedBills'

export default function NavBar() {

  const handleUpdate = async() => {
    setLoading(true)
    console.log('Se fetcheo!')
    // const data = await dropUnwantedBills(await getBills())
    const data = await getBills()
    setBills(data)
    setLoading(false)
  }

  const {bills, setBills, setLoading} = useContext(BillsContext)

  return (
    <div className='navBar'>
      <ActiveLink
        to="/"
        option='Stats'
      />
      <ActiveLink
        to="/ranking"
        option='Ranking'
      />
      <UpdateRankingButton onUpdate={ handleUpdate }/>
      <CsvDownloadButton data={ bills } />
    </div>
  )
}