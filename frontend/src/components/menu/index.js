import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { Credits } from '../index'
import CreditContext from '../../creditcontext'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.459);
`

const Header = styled.h1`
  text-align: center;
  font-family: passionone;
`

function Menu() {
  const { credits, setCredits } = useContext(CreditContext)

  const [tables, setTables] = useState(null)

  useEffect(() => {
    console.log('Called')
    setCredits(localStorage.getItem('credits'))
    getTables()
      .then((tables) => {
        setTables(tables)
      })
  }, [setCredits])

  return (
    <Content>
      <Header>Handle credits</Header>
      Credits: {credits && credits}
      <Credits />
      <Header>Available tables</Header>
      {tables && tables.map(table => <div key={table.tableId}>{table.tableName + ' ' + table.tableActivePlayers + '/' + table.tableMaxPlayers}</div>)}
      <input type="button" value="Log out" onClick={logout} />
    </Content>
  )
}

function getTables() {
  return new Promise((resolve) => {
    fetch('http://195.201.32.3:4000/game/tables', {
      headers: {
        'authorization': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        resolve(result.tables)
      }).catch(err => {
        alert(err)
        resolve(null)
      })
  })
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  localStorage.removeItem('name')
  localStorage.removeItem('credits')
  window.location.replace('http://localhost:3000/')
}

export default Menu