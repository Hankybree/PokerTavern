import styled from 'styled-components'
import { useEffect, useState } from 'react'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.459);
`

function Menu() {
  const [tables, setTables] = useState(null)

  useEffect(() => {
    getTables()
      .then((tables) => {
        setTables(tables)
      })
  }, [])

  return (
    <Content>
      <h1>Available tables</h1>
      {tables && tables.map(table => <div key={table.tableId}>{table.tableName + ' ' + table.tableActivePlayers + '/' + table.tableMaxPlayers}</div>)}
      <input type="button" value="Log out" onClick={logout} />
    </Content>
  )
}

function getTables() {
  return new Promise((resolve) => {
    fetch('http://localhost:4000/game/tables', {
      headers: {
        'authorization': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.tables)
        resolve(result.tables)
      }).catch(err => {
        alert(err)
        resolve(null)
      })
  })
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.replace('http://localhost:3000/')
}

export default Menu