// import logo from '../../../assets/images/logo.png'
import { DefaultButton } from '../../index'
// import styled from 'styled-components'
import './lobbypage.css'

function LobbyPage() {
  return (
    <div id="container">
      Lobby
      <DefaultButton text="Lobby" margin="auto" clicked={() => {console.log('Lobby yo')}} />
    </div>
  )
}

export default LobbyPage