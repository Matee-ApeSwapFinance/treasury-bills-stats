import { toCentsFormatter, tokenPriceFormatter, numberWithTwoDecimalsFormatter, numberWithSixDecimalsFormatter } from '../../services/formatter'
import processDate from '../../services/processDate'

export default function SpotlightTableRow ({ transaction }) {

  return(
    <tr>
      <td>{ transaction?.createdAddressOwner }</td>
      <td>{ transaction?.billNftId }</td>
      <td>{ processDate(transaction?.createdAt) }</td>
      <td>{ numberWithSixDecimalsFormatter.format(transaction?.deposit) }</td>
      <td>{ numberWithTwoDecimalsFormatter.format(transaction?.payout) }</td>
      <td>{ tokenPriceFormatter.format(transaction?.payoutTokenPrice) }</td>
      <td>{ toCentsFormatter.format(transaction?.dollarValue) }</td>
    </tr>
  )
} 