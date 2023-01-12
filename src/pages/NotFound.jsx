import styled from "styled-components"
import { grey1, grey3 } from "../constants/color";
import errorImg from '../assets/images/404.png'

const Section = styled.section`
  background: ${grey3};
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  height: 100vh;
  padding: 20px;
  font-family: "Pretendard-Regular";
`;

const WrapBox = styled.div`
  width: 800px;
  margin-top: 80px;
`

const Box = styled.div`
  padding: 40px 32px 32px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.16);
  background-color: ${grey1};
  text-align: center;
`;

const Text = styled.p`
  font-size: 28px;
`;

const Img = styled.img`
  width: 350px;
  margin-top: 60px;
  transform: rotate(30deg);
`;

export default function NotFound() {
  return (
    <Section>
        <h1 className='ir'>에러페이지</h1>
        <WrapBox>
          <Box>
            <Text>
                ⚠️ 죄송합니다. 찾을 수 없는 페이지 입니다.
            </Text>
            <Img src={errorImg} alt="" />
          </Box>
        </WrapBox>
    </Section>
  )
}
