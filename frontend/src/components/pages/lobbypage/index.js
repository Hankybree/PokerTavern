// import logo from '../../../assets/images/logo.png'
import { Menu, Table } from '../../index'
import styled from 'styled-components'
import './lobbypage.css'

const Content = styled.div `
  display: flex;
`

function LobbyPage() {
  return (
    <div id="container">
      <Content>
        <Menu/>
        <Table/>
      </Content>
    </div>
  )
}

export default LobbyPage