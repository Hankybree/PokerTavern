import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthPage, LobbyPage, GamePage } from '../index'

//import logo from '../../assets/images/logo.png';
import './app.css';

function App() {
  return (
    <div id="container">
      <Router>
        <Switch>
          <Route exact path="/"><AuthPage/></Route>
          <Route path="/lobby"><LobbyPage/></Route>
          <Route path="/lobby/:id"><GamePage/></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
