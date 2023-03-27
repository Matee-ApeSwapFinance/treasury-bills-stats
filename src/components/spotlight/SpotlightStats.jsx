import getUniqueBuyers from '../../services/getUniqueBuyers'
import getAveragePurchase from '../../services/getAveragePurchase'
import getBiggestPurchase from '../../services/getBiggestPurchase'
import getTotalAcquiredValue from '../../services/getTotalAcquiredValue'
import getTotalVestedValue from '../../services/getTotalVestedValue'
import { toCentsFormatter } from '../../services/formatter'

export default function SpotlightStats({ contractTransactions }) {
  return(
    <div className="spotlightStats">
      <div>
        Unique buyers: { getUniqueBuyers(contractTransactions).length }
      </div>
      <div>
        Number of transactions: { contractTransactions.length }
      </div>
      <div>
        Average purchase: { toCentsFormatter.format(getAveragePurchase(contractTransactions)) }
      </div>
      <div>
        Biggest purchase: { toCentsFormatter.format(getBiggestPurchase(contractTransactions)) }
      </div>
      <div>
        Total Acquired Value: { toCentsFormatter.format(getTotalAcquiredValue(contractTransactions)) }
      </div>
      <div>
        Total Vested Value: { toCentsFormatter.format(getTotalVestedValue(contractTransactions)) }
      </div>
      <div>
        R.O.E.: { (Math.round(getTotalAcquiredValue(contractTransactions) / getTotalVestedValue(contractTransactions) * 10000) / 100).toFixed(2) }%
      </div>
    </div>
  )
}