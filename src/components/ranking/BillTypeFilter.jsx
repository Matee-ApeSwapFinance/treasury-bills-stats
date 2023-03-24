
export default function BillTypeFilter( { setSelectBillTypeFilter }) {
  const handleChange = (e) => {
    setSelectBillTypeFilter(e.target.value)
  }

  return(
    <div className="billTypeFilter"> 
      <label className="billTypeLabel" htmlFor="billTypeSelect">Filter by bill type: </label>
      <select className="billTypeSelectMenu" onChange={handleChange} name="saleStatus" id="billTypeSelect">
        <option value="all">All</option>
        <option value="bananaBills">Banana Bills</option>
        <option value="jungleBills">Jungle Bills</option>
      </select>
    </div>
  )
}