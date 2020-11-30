import styled from 'styled-components'
import { Formik } from 'formik'
import { SubmitButton } from '../index'
import { connect, isConnected } from '../../services/client'
import { getTables } from '../../services/api'
import { useState, useContext } from 'react'
import TableContext from '../../contexts/tablecontext'

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

function Host() {
  const { setTables } = useContext(TableContext)

  const [showHost, setShowHost] = useState(false)
  const [hostButtonText, setHostButtonText] = useState('Show')

  function toggleHostUi() {
    if (showHost) {
      setShowHost(false)
      setHostButtonText('Show')
    } else {
      setShowHost(true)
      setHostButtonText('Hide')
    }
  }

  return (
    <Content>
      <input type="button" value={hostButtonText + " host UI"} onClick={toggleHostUi} />
      {showHost && (
        <Formik
          initialValues={{ name: '', maxPlayers: 0 }}
          validate={(values) => {
            const errors = {}

            if (!values.name || !values.maxPlayers) {
              errors.required = 'Specify name and max number of players'
            }
            if (values.maxPlayers < 2 || values.maxPlayers > 10) {
              errors.maxPlayers = 'Max players can be between 2 and 10'
            }

            return errors
          }}
          onSubmit={(values) => {
            hostGame(values.name, values.maxPlayers, toggleHostUi, setTables)
          }}>
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              {errors.required && touched.name && touched.maxPlayers && errors.required}
              {errors.maxPlayers && touched.maxPlayers && errors.maxPlayers}
              <input type="text" name="name" placeholder="Table name..." value={values.credits} onChange={handleChange} />
              <input type="number" name="maxPlayers" placeholder="Max number of players..." value={values.credits} onChange={handleChange} />
              <br />
              <SubmitButton text="Host game" margin="auto" />
            </Form>
          )}
        </Formik>
      )}
    </Content>
  )
}

function hostGame(name, maxPlayers, toggleHostUi, setTables) {
  if (isConnected) {
    alert('You are already connected to a game!')
    toggleHostUi()
    return
  }
  fetch('http://localhost:4000/game/host', {
    body: JSON.stringify({
      name,
      maxPlayers
    }),
    headers: {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token')
    },
    method: 'POST'
  }).then(response => response.json())
    .then(result => {
      if (result.status === 1) {
        connect(result.tableId)
        getTables()
          .then((tables) => {
            setTables(tables)
          })
      }
      alert(result.msg)
      toggleHostUi()
    }).catch(err => {
      alert(err)
    })
}

export default Host