import styled from "styled-components"
import {ACTIVE_BUTTON_COLOR, ACTIVE_BUTTON_FONT_COLOR,INACTIVE_BUTTON_COLOR, INACTIVE_BUTTON_FONT_COLOR,NORMAL_BUTTON_COLOR, NORMAL_BUTTON_FONT_COLOR,NORMAL_BUTTON_BORDER_COLOR} from '../../constants/color'
import {BUTTON_SIZE} from '../../constants/fontSize'

const Button = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  font-size: ${BUTTON_SIZE};
  background: ${(props)=>(props.normal ? `${NORMAL_BUTTON_COLOR}` : null)};
  background: ${(props) => (props.active ? `${ACTIVE_BUTTON_COLOR}` : null)};
  background: ${(props) => (props.inactive ? `${INACTIVE_BUTTON_COLOR}` : null)};
  color: ${(props)=> (props.normal ? `${NORMAL_BUTTON_FONT_COLOR}` : null)};
  color: ${(props) => (props.active ? `${ACTIVE_BUTTON_FONT_COLOR}` : null)};
  color: ${(props) => (props.inactive ? `${INACTIVE_BUTTON_FONT_COLOR}` : null)};
  border: 1px solid ${(props)=> (props.normal ? `${NORMAL_BUTTON_BORDER_COLOR}` : null)};
`

function ActiveButton({children}) {
  return (
    <Button active>{children}</Button>
  )
}

function InactiveButton({children}) {
  return (
    <Button inactive>{children}</Button>
  )
}

function NormalButton({children, handleGoSignup}) {
  // const navigate = useNavigate();

  return (
    <Button normal onClick={handleGoSignup}>{children}</Button>
  )
}

export {ActiveButton,InactiveButton,NormalButton}
