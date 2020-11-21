import logo from '../../assets/images/logo.png';
import './app.css';

function App() {
  return (
    <div id="container">
      <div id="content">
        <img id="logo" src={logo} alt="Logo"/>
        <h1 id="headline">TavernPoker</h1>
        <form id="login-form">
        <input type="text" placeholder="Username..."/>
        <input type="password" placeholder="Password..."/>
        <input type="button" value="login"/>
      </form>
      </div>
    </div>
  )
}

export default App;
