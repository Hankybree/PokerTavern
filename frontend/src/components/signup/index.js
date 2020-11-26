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

function SignUp() {
  return (
    <Content>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        validate={(values) => {
          const errors = {}
          if (values.password !== values.confirmPassword) {
            errors.password = 'Passwords does not match'
          }
          if (!values.username || values.username.length < 6) {
            errors.username = 'Username needs to be atleast 6 characters'
          }
          if (!values.password || values.password.length < 6) {
            errors.password = 'Password needs to be atleast 6 characters'
          }

          return errors
        }}
        onSubmit={(values) => {
          PostSignUp(values.username, values.password)
        }}>
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            {errors.username && touched.username && errors.username}
            <input type="text" name="username" placeholder="Username..." value={values.username} onChange={handleChange} />
            {errors.password && touched.password && errors.password}
            <input type="password" name="password" placeholder="Password..." value={values.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm password..." value={values.confirmPassword} onChange={handleChange} />
            <br />
            <SubmitButton text="Sign up" margin="auto"/>
          </Form>
        )}
      </Formik>
    </Content>
  )
}

function PostSignUp(username, password) {
  fetch('http://195.201.32.3:4000/auth/signup', {
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
      if (result.status === 1) {
        window.location.reload()
      }
    }).catch(err => {
      alert(err)
    })
}

export default SignUp