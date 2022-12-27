import styled from "styled-components"
import {NORMAL_BUTTON_COLOR, NORMAL_BUTTON_FONT_COLOR,NORMAL_BUTTON_BORDER_COLOR} from '../../constants/color'
import {BUTTON_SIZE} from '../../constants/fontSize'

const NormalBtn = styled.button`
  display: block;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${NORMAL_BUTTON_BORDER_COLOR};
  background-color: ${NORMAL_BUTTON_COLOR};
  color:${NORMAL_BUTTON_FONT_COLOR};
  font-size: ${BUTTON_SIZE};
  cursor: pointer;
`

export default function NormalButton({children, handleGoSignup}) {
  // const navigate = useNavigate();

  return (
    <NormalBtn onClick={handleGoSignup}>{children}</NormalBtn>
  )
}
