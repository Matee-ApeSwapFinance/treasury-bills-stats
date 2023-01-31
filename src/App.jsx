import { Route } from 'wouter'
import NavBar from './components/navbar/NavBar'
import Stats from './components/stats/Stats'
import Ranking from './components/ranking/Ranking'
import Spotlight from './components/spotlight/Spotlight'
import { BillsContextProvider } from './context/BillsContext'

function App() {

  return (
    <div className="App">
      <BillsContextProvider>
        <NavBar />
        <Route
          component={Stats}
          path='/'
        />
        <Route
          component={Ranking}
          path='/ranking'
        />
        <Route
          component={Spotlight}
          path='/spotlight/:contract'
        />
      </BillsContextProvider>
    </div>
  )
}

export default App
