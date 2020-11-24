import logo from '../../../assets/images/logo.png'
import { useState } from 'react'
import { Login, SignUp } from '../../index'
import styled from 'styled-components'
import './authpage.css'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const SignUpButton = styled.input`
  background: none;
  border: none;
`

function AuthPage() {
  const [showLogin, setLogin] = useState(true)

  function signUpButtonPressed() {
  console.log('Value ' + showLogin)
  if (showLogin) {
    setLogin(false)
  } else {
    setLogin(true)
  }
}

  return (
    <Div>
      <div id="content">
        <img id="logo" src={logo} alt="Logo" />
        <h1 id="headline">TavernPoker</h1>
        {showLogin ? <Login/> : <SignUp/>}
        <SignUpButton type="button" value="No account? Sign up!" onClick={signUpButtonPressed} />
      </div>
    </Div>
  )
}

export default AuthPage