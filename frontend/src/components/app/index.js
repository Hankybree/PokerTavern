import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthPage, LobbyPage, TablePage } from '../../pages'
import './app.css'

function App() {
  return (
    <div id="container">
      <Router>
        <Switch>
          <Route exact path="/"><AuthPage/></Route>
          <Route path="/lobby/:id"><TablePage/></Route>
          <Route path="/lobby"><LobbyPage/></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
