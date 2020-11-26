import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreditContext from '../../creditcontext'
import { AuthPage, LobbyPage, TablePage } from '../../pages'
import { useState } from 'react'
import './app.css'

function App() {
  const [credits, setCredits] = useState(null)

  return (
    <div id="container">
      <CreditContext.Provider value={{ credits, setCredits }}>
        <Router>
          <Switch>
            <Route exact path="/"><AuthPage/></Route>
            <Route path="/lobby/:id"><TablePage/></Route>
            <Route path="/lobby"><LobbyPage/></Route>
          </Switch>
        </Router>
      </CreditContext.Provider>
    </div>
  )
}

export default App
