import { Formik } from 'formik'
import styled from 'styled-components'
import { DefaultButton } from '../index'

const Content = styled.div`
  width: 30vw;
`
const Form = styled.form`
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
          console.log(values)
        }}>
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            {errors.username && touched.username && errors.username}
            <input type="text" name="username" placeholder="Username..." value={values.username} onChange={handleChange} />
            {errors.password && touched.password && errors.password}
            <input type="password" name="password" placeholder="Password..." value={values.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm password..." value={values.confirmPassword} onChange={handleChange} />
            <br/>
            <DefaultButton text="Login" margin="auto" clicked={handleSubmit} />
          </Form>
        )}
      </Formik>
    </Content>
  )
}

export default SignUp