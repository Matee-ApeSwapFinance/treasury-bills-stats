export default function UpdateRankingButton({ onUpdate }) {
  return(
    <button onClick={() => onUpdate()}>Refresh Data</button>
  )
}