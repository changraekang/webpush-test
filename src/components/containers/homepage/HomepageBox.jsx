import styled from "styled-components"
import { grey1, grey3 } from "../../../constants/color";

const Section = styled.section`
  background: ${grey3};
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  font-family: "Pretendard-Regular";
`;

const WrapBox = styled.div`
  width: 800px;
  margin-top: 80px;
`

const Box = styled.div`
  padding: 32px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.16);
  background-color: ${grey1};
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 32px;
`

export  function HomepageBox({children}) {
  return (
    <Section>
        <h1 className='ir'>홈페이지 수정 페이지</h1>
        <WrapBox>
          <Box>
            <Title>홈페이지 관리</Title>
              {children}
          </Box>
        </WrapBox>
    </Section>
  )
}

export function InsertScriptBox({children}) {
  return (
    <Section>
        <h1 className='ir'>Push 스크립트 입력 페이지</h1>
        <WrapBox>
          <Box>
            <Title>PUSH 설정 스크립트</Title>
              {children}
          </Box>
        </WrapBox>
    </Section>
  )
}
