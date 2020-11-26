import styled from 'styled-components'

const Input = styled.input`
  width: 100px;
  border-radius: 1em;
  border: solid 2px black;
  background-color: white;
  margin: ${(props) => props.margin};
`

function SubmitButton(props) {
  return (
    <Input type="submit" margin={props.margin || 0} value={props.text} />
  )
}

export default SubmitButton