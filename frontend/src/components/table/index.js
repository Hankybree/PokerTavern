import table from '../../assets/images/pokertable.png'
import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 100vh;
  background-color: grey;
`
const TableImg = styled.img`
  width: 75vw;
  margin: auto;
`

function Table() {
  return (
    <Content>
      <TableImg src={table} alt="Table" />
    </Content>
  )
}

export default Table