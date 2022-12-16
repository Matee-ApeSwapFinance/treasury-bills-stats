import { Link } from 'wouter'
import { toDollarFormatter } from '../../services/formatter'

export default function RankingTableRow({ bill }) {

  return(
    <Link
      to={`/spotlight/${bill?.contract}`}
    >
      <tr>
        <td>{ bill?.lp }</td>
        <td>{ bill?.lpRound }</td>
        <td>{ bill?.token }</td>
        <td>{ bill?.tokenRound }</td>
        <td>{ bill?.startDate }</td>
        <td>{ bill?.endDate }</td>
        <td>{ bill?.duration } days</td>
        <td>{ toDollarFormatter.format(bill?.acquiredValue) }</td>
        <td>{ toDollarFormatter.format(bill?.vestedValue) }</td>
        <td>{ (Math.round(bill?.ROI * 10000) / 100).toFixed(2)} %</td>
      </tr>
    </Link>
  )
}