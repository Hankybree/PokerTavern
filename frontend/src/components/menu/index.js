import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.459);
`

function Menu() {
  return (
    <Content>
      <h1>Available tables</h1>

      <input type="button" value="Log out" onClick={logout} />
    </Content>
  )
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.replace('http://localhost:3000/')
}

export default Menu