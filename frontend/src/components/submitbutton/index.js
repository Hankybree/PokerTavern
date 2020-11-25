import styled from 'styled-components'

// import './defaultbutton.css'
const Input = styled.input `
  width: 50px;
  border-radius: 1em;
  border: solid 2px black;
  background-color: white;
  margin: ${(props) => props.margin};
`

function SubmitButton(props) {
  return (
    <Input type="submit" margin={props.margin || 0} value={props.text}/>
  )
}

export default SubmitButton