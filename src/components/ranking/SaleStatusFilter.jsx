
export default function SaleStatusFilter( { setSelectFilter }) {
  const handleChange = (e) => {
    setSelectFilter(e.target.value)
  }

  return(
    <div className="saleStatusFilter">
      <label className="saleStatusLabel" htmlFor="saleStatus">Select selling status: </label>
      <select className="saleStatusSelectMenu" onChange={handleChange} name="saleStatus" id="saleStatus">
        <option value="all">All</option>
        <option value="onSale">On Sale</option>
        <option value="soldOut">Sold Out</option>
      </select>
    </div>
  )
}