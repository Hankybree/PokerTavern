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

function Login() {
  return (
    <Content>
      <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => {
        console.log(values)
       }}>
         {({values, handleSubmit, handleChange}) => (
            <Form onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder="Username..." value={values.username} onChange={handleChange}/>
              <input type="password" name="password" placeholder="Password..." value={values.password} onChange={handleChange}/>
              <DefaultButton text="Login" margin="auto" clicked={handleSubmit} />
            </Form>
          )}
      </Formik>
    </Content>
  )
}

export default Login