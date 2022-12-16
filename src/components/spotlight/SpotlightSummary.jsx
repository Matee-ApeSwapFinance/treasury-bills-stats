export default function SpotlightSummary({ contractDetails }) {
  return (
    <div className="spotlightSummary">
      <div>
        Bill Contract: { contractDetails?.contractAddress }
      </div>
      <div>
        LP Pair: { contractDetails?.lp }
      </div>
      <div>
        Payout Token: { contractDetails?.payoutToken }
      </div>
      <div>
        On Chain ID: { contractDetails?.chainId }
      </div>
      <div>
        Vesting Time: { contractDetails?.vestingTime } days
      </div>
    </div>
  )
}