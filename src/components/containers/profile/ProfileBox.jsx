import styled from "styled-components"
import { error3, grey1, grey3} from "../../../constants/color";

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

const AlignTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 32px;
`

const Withdrawal = styled.button`
  display: block;
  color : ${error3}
`

export function ProfileBox({children}) {
  return (
    <Section>
        <h1 className='ir'>나의 정보 페이지</h1>
        <WrapBox>
          <Box>
            <AlignTop style={{display:"flex"}}>
              <Title>나의 정보</Title>
              <Withdrawal>탈퇴하기</Withdrawal>
            </AlignTop>
              {children}
          </Box>
        </WrapBox>
    </Section>
  )
}

export function PasswordBox({children}) {
  return (
    <Section>
        <h1 className='ir'>비밀번호 변경 페이지</h1>
        <WrapBox>
          <Box>
            <Title>새 비밀번호 설정</Title>
              {children}
          </Box>
        </WrapBox>
    </Section>
  )
}