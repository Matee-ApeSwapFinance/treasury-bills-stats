import SpotlightTableRow from "./SpotlightTableRow"

export default function SpotlightTable ({ dataToDisplay }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Buyer Adress</th>
          <th>Bill NFT ID</th>
          <th>Created</th>
          <th>LPs deposited</th>
          <th>Tokens Payed Out</th>
          <th>Token Price at Payout</th>
          <th>Dollar Value of Purchase</th>
        </tr>
      </thead>
      <tbody>
        {
          dataToDisplay && dataToDisplay.map(transaction =>
            <SpotlightTableRow
              key={ transaction?.createdAt + transaction?.createdAddressOwner }
              transaction={ transaction }
            />
          )
        }
      </tbody>
    </table>
  )
}