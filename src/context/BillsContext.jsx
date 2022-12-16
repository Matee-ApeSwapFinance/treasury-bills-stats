import { createContext, useState } from 'react'

const BillsContext = createContext({})

export function BillsContextProvider ({children}) {

  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <BillsContext.Provider value={{ bills, setBills, loading, setLoading }}>
      {children}
    </BillsContext.Provider>
  )
}

export default BillsContext
