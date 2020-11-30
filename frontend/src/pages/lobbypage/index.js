import { Menu, Table } from '../../components'
import styled from 'styled-components'
import './lobbypage.css'
import TableContext from '../../contexts/tablecontext'
import { useState } from 'react'

const Content = styled.div`
  display: flex;
`

function LobbyPage() {
  const [tables, setTables] = useState(null)

  return (
    <div id="container">
      <TableContext.Provider value={{ tables, setTables }}>
        <Content>
          <Menu />
          <Table />
        </Content>
      </TableContext.Provider>
    </div>
  )
}

export default LobbyPage