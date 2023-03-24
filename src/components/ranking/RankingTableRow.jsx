import { Link } from 'wouter'
import { toDollarFormatter } from '../../services/formatter'
import sold from '../../assets/sold.svg'

export default function RankingTableRow({ bill }) {
  const initialTokensValue = parseFloat(bill?.initialTokensValue)

  return(
    <Link
      to={`/spotlight/${bill?.contract}`}
    >
      <tr>
        <td style={{width: '160px', height: '100%'}}>
          <div style={{margin: 'auto', width: '90%', height: '100%', border: '2px solid white', borderRadius: '3px'}}>
            <div style={{position: 'relative', width: `${bill?.soldPercentage}%`, height: '15px', backgroundColor: `rgb(${100 + bill?.soldPercentage / 150 * 255},220,100,1)`}}>
              <img style={{visibility: bill?.soldPercentage == 100 ? 'visible' : 'hidden', width: '36px', position: 'absolute', left: '54px', transform: 'translateY(-12px) rotate(0deg)', filter: 'drop-shadow(0 0 20px black)' }} src={sold} alt="sold banner" />
            </div>
          </div>
          { bill?.soldPercentage }%
        </td>
        <td>{ bill?.type }</td>
        <td>{ bill?.lp }</td>
        <td>{ bill?.lpRound }</td>
        <td>{ bill?.token }</td>
        <td>{ bill?.tokenRound }</td>
        <td>{ bill?.startDate }</td>
        <td>{ bill?.endDate }</td>
        <td>{ bill?.duration } days</td>
        <td>{ (initialTokensValue > 100) ? toDollarFormatter.format(bill?.initialTokensValue) : 'N/A'}</td>
        <td>{ toDollarFormatter.format(bill?.acquiredValue) }</td>
        <td>{ toDollarFormatter.format(bill?.vestedValue) }</td>
        <td>{ bill?.vestingTime } days</td>
        <td>{ (Math.round(bill?.ROI * 10000) / 100).toFixed(2)} %</td>
      </tr>
    </Link>
  )
}