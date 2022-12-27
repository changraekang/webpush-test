import styled from "styled-components"
import {INACTIVE_BUTTON_COLOR, INACTIVE_BUTTON_FONT_COLOR} from '../../constants/color'
import {BUTTON_SIZE} from '../../constants/fontSize'


const InactiveBtn = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${INACTIVE_BUTTON_COLOR};
  color: ${INACTIVE_BUTTON_FONT_COLOR};
  font-size: ${BUTTON_SIZE};
`

export default function InactiveButton({children}) {
  return (
    <InactiveBtn>{children}</InactiveBtn>
  )
}
