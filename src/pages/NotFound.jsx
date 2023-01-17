import styled from "styled-components"
import { grey1, grey3, grey6, grey8 } from "../constants/color";
import errorImg from '../assets/images/404.png'

const Section = styled.section`
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
  text-align: center;
`;

const Text = styled.p`
  font-size: 36px;
  margin-top: 20px;
  color: ${grey8};
  font-weight: 700;
`;

const Text2 = styled.p`
  font-size: 24px;
  margin-top: 16px;
  color: ${grey6};
`;

const Img = styled.img`
  width: 300px;
`;

export default function NotFound() {
  return (
    <Section>
        <h1 className='ir'>에러페이지</h1>
        <WrapBox>
          <Box>
            <Img src={errorImg} alt="" />
            <Text>404 NOT FOUND</Text>
            <Text2>
                죄송합니다. 찾을 수 없는 페이지 입니다.
            </Text2>
          </Box>
        </WrapBox>
    </Section>
  )
}
