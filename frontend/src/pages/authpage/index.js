import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import { Login, SignUp } from '../../components'
import styled from 'styled-components'
import './authpage.css'

const Content = styled.div `
  display: flex;
  flex-direction: column;
  margin: auto;
`

const SignUpButton = styled.input `
  background: none;
  border: none;
`

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true)
  const [signUpButtonText, setSignUpButtonText] = useState('No account? Sign up!')

  function signUpButtonPressed() {
    if (showLogin) {
      setShowLogin(false)
      setSignUpButtonText('Go back')
    } else {
      setShowLogin(true)
      setSignUpButtonText('No account? Sign up!')
    }
  }

  return (
    <div id="container">
      <Content>
        <img id="logo" src={logo} alt="Logo" />
        <h1 id="headline">TavernPoker</h1>
        <br />
        {showLogin ? <Login /> : <SignUp />}
        <br />
        <SignUpButton type="button" value={signUpButtonText} onClick={signUpButtonPressed} />
      </Content>
    </div>
  )
}

export default AuthPage