import { Formik } from 'formik'
import styled from 'styled-components'
import { useState, useContext } from 'react'
import { SubmitButton } from '../index'
import CreditContext from '../../creditcontext'

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

function Credits() {
  const [showCredits, setShowCredits] = useState(false)
  const [creditButtonText, setCreditButtonText] = useState('Show')

  const creditContext = useContext(CreditContext)

  function toggleCreditUi() {
    if (showCredits) {
      setShowCredits(false)
      setCreditButtonText('Show')
    } else {
      setShowCredits(true)
      setCreditButtonText('Hide')
    }
  }

  return (
    <Content>
      <input type="button" value={creditButtonText + " credit UI"} onClick={toggleCreditUi} />
      {showCredits && (
        <Formik
          initialValues={{ credits: 0 }}
          validate={(values) => {
            const errors = {}

            if (!values.credits) {
              errors.credits = 'Specify number of credits'
            }

            return errors
          }}
          onSubmit={(values) => {
            SetCredits(values.credits, toggleCreditUi, creditContext)
          }}>
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              {errors.credits && touched.credits && errors.credits}
              <input type="number" name="credits" placeholder="Credits..." value={values.credits} onChange={handleChange} />
              <br />
              <SubmitButton text="Set credits" margin="auto" />
            </Form>
          )}
        </Formik>
      )}
    </Content>
  )
}

function SetCredits(credits, toggleCreditUi, creditContext) {
  fetch('http://195.201.32.3:4000/profile/credits', {
    body: JSON.stringify({
      credits
    }),
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token')
    },
    method: 'PATCH'
  }).then(response => response.json())
    .then(result => {
      if (result.status === 1) {
        creditContext.setCredits(credits)
        localStorage.setItem('credits', credits)
      }
      alert(result.msg)
      toggleCreditUi()
    }).catch(err => {
      alert(err)
    })
}

export default Credits