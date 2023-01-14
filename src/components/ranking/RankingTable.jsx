import RankingTableRow from "./RankingTableRow"
import pointer from '../../assets/pointer.svg'
import getSiblings from '../../services/getSiblings'

export default function RankingTable({ dataToDisplay, handleSort, sortMethod }) {
  const handleSelectHeader = (e, header) => {
    handleSort(header)
    if (e.target.className == 'th') {
      e.target.firstChild.className = 'pointer active descending'
    } else {
      if (e.target.firstChild.className == 'pointer active descending') {
        e.target.firstChild.className = 'pointer active'
      } else {
        e.target.firstChild.className = 'pointer active descending'
      }
    }
    getSiblings(e.target).forEach(child => child.firstChild.className = 'pointer')
    e.target.parentNode.childNodes.forEach(child => child.className = 'th')
    e.target.className = 'th active-th'
  }

  return(
    <table>
      <thead>
        <tr>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'lp')}><img className="pointer" src={pointer} />LP Pair</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'lpRound')}><img className="pointer" src={pointer} />LP Round</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'token')}><img className="pointer" src={pointer} />Payout Token</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'tokenRound')}><img className="pointer" src={pointer} />Token Round</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'startTimestamp')}><img className="pointer" src={pointer} />Started / First Purchase</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'endTimestamp')}><img className="pointer" src={pointer} />Ended / Last Purchase</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'duration')}><img className="pointer" src={pointer} />Duration</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'acquiredValue')}><img className="pointer" src={pointer} />Acquired Value</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'vestedValue')}><img className="pointer" src={pointer} />Vested Value</th>
          <th className="th" onClick={(e) => handleSelectHeader(e, 'vestingTime')}><img className="pointer" src={pointer} />Vesting Time</th>
          <th className="th active-th" onClick={(e) => handleSelectHeader(e, 'ROI')}><img className="pointer active descending" src={pointer} />ROI</th>
        </tr>
      </thead>
      <tbody>
        {
          dataToDisplay && dataToDisplay.sort((a, b) => (a[sortMethod.method] > b[sortMethod.method]) ? (sortMethod.descending ? -1 : 1) : (sortMethod.descending ? 1 : -1)).map(bill =>
            <RankingTableRow
              key={ bill?.contract }
              bill={ bill }
            />
          )
        }
      </tbody>
    </table>
  )
}