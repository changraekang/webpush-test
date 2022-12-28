import styled from "styled-components"

const Box = styled.div`
  padding: 32px;
  border: 1px solid #AFAFAF;
  border-radius: 16px;
`

export default function MakePushBox({children}) {
  return (
    <Box>
        {children}
    </Box>
  )
}
