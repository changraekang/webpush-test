import styled from "styled-components";
import {MAIN_BOX_COLOR} from '../../../constants/color'

const Box = styled.div`
  background: ${MAIN_BOX_COLOR};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 40px 58px; 
`

export default function FindMemberBox({children}) {
  return (
    <Box>
      {children}
    </Box>
  )
}
