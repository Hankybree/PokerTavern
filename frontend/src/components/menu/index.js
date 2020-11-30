import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { Credits, Host } from '../index'
import { connect } from '../../services/client'
import { getTables } from '../../services/api'
import CreditContext from '../../contexts/creditcontext'
import TableContext from '../../contexts/tablecontext'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.459);
  padding-left: 20px;
  padding-right: 20px;
`

const Header = styled.h1`
  text-align: center;
  font-family: passionone;
`

const List = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: solid 1px black;
`

function Menu() {
  const { credits, setCredits } = useContext(CreditContext)
  const { tables, setTables } = useContext(TableContext)

  useEffect(() => {
    setCredits(localStorage.getItem('credits'))
    getTables()
      .then((tables) => {
        setTables(tables)
      })
  }, [setCredits, setTables])

  return (
    <Content>
      <Header>Welcome {localStorage.getItem('name')}!</Header>
      <Header>Handle credits</Header>
      <p>Credits: {credits && credits}</p>
      <Credits />
      <Header>Available tables</Header>
      <Host />
      <List>
        {tables && tables.map(table => <div key={table.tableId} onClick={() => { connect(table.tableId) }}>{table.tableName + ' ' + table.tableActivePlayers + '/' + table.tableMaxPlayers}</div>)}
      </List>
      <input type="button" value="Log out" onClick={logout} />
    </Content>
  )
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  localStorage.removeItem('name')
  localStorage.removeItem('credits')
  window.location.replace('http://localhost:3000/')
}

export default Menu