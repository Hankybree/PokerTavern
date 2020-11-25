import { Formik } from 'formik'
import styled from 'styled-components'
import { SubmitButton } from '../index'

const Content = styled.div `
  width: 30vw;
`
const Form = styled.form `
  margin: auto;
  display: flex;
  flex-direction: column;
`

function Login() {
  validateSession()
  
  return (
    <Content>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          PostLogin(values.username, values.password)
        }}>
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username..." value={values.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password..." value={values.password} onChange={handleChange} />
            <br />
            <SubmitButton text="Login" margin="auto"/>
          </Form>
        )}
      </Formik>
    </Content>
  )
}

function PostLogin(username, password) {
  fetch('http://195.201.32.3:4000/auth/login', {
    body: JSON.stringify({
      userName: username,
      userPassword: password
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(response => response.json())
    .then(result => {
      alert(result.msg)
      console.log(result)
      if (result.status === 1) {
        localStorage.setItem('token', 'Bearer ' + result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        window.location.replace('http://localhost:3000/lobby')
      }
    }).catch(err => {
      alert(err)
    })
}

function validateSession() {
  const token = localStorage.getItem('token')
  if (token) {
    fetch('http://195.201.32.3:4000/auth/validate', {
      headers: {
        'authorization': token
      }
    }).then(response => response.json())
      .then(result => {
        if (result.status === 1) {
          window.location.replace('http://localhost:3000/lobby')
        }
      })
  }
}

export default Login