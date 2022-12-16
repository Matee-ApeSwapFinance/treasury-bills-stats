import { useEffect } from "react"
import useDebounce from "../../hooks/useDebounce"

export default function SearchSlot( { setFilterString }) {
  const [value, setValue] = useDebounce('', 500)

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleEmpty = () => {
    document.querySelector('.searchSlot').value = ''
    setValue('')
  }

  useEffect(() => {
    if (document.querySelector('.searchSlot').value == '') {
      document.querySelector('.emptySearchInput').className = 'emptySearchInput hiddenCross'
    } else {
      document.querySelector('.emptySearchInput').className = 'emptySearchInput'
    }
    setFilterString(value)
  }, [value])

  return(
    <div className="search">
      <label className="searchLabel" htmlFor="query">Search Bills :</label>
      <input onChange={(e) => handleInput(e)} placeholder='Enter lp pair or payout token' className="searchSlot" name="query" type="text" />
      <span className="emptySearchInput" onClick={handleEmpty}>+</span>
    </div>
  )
}