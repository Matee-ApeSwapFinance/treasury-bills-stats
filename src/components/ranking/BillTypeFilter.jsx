
export default function BillTypeFilter( { setSelectBillTypeFilter }) {
  const handleChange = (e) => {
    setSelectBillTypeFilter(e.target.value)
  }

  return(
    <div className="billTypeFilter"> 
      <label className="billTypeLabel" htmlFor="billTypeSelect">Filter by type: </label>
      <select className="billTypeSelectMenu" onChange={handleChange} name="saleStatus" id="billTypeSelect">
        <option value="all">All</option>
        <option value="bananaBills">ApeSwap</option>
        <option value="jungleBills">Partner</option>
      </select>
    </div>
  )
}