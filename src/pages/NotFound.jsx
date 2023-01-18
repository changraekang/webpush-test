import styled from "styled-components"
import { grey1, grey3, grey4, grey6, grey8 } from "../constants/color";
import errorImg from '../assets/images/404.png'
import { GoHomeBtn, GoPrevPageBtn } from "../components/buttons/NotfoundButtons";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
`;


const Box = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 72px;
  color:${grey4}
`;

const Text2 = styled.p`
  font-weight: 700;
  font-size: 32px;
  margin-top: 16px;
  color: ${grey8};
`;

const Text3 = styled.p`
  font-size: 20px;
  margin-top: 12px;
  color: ${grey6};
  margin-bottom: 40px;
`;

const Img = styled.img`
  width: 494px;
`;

const WrapButtons = styled.button`
  display: flex;
  width: 100%;
  gap: 24px;
`


export default function NotFound() {
  const navigate = useNavigate();
  
  const handleGoPrevpage = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const handleGoHome = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  }
  return (
    <Section>
        <h1 className='ir'>에러페이지</h1>
          <Box>
            <Img src={errorImg} alt="" />
            <div>
              <Text>404</Text>
              <Text>NOT FOUND</Text>
              <Text2>더 이상 페이지를 찾을 수 없어요😢</Text2>
              <Text3>주소가 잘못되거나 삭제된 페이지입니다.</Text3>
              <WrapButtons>
                <GoPrevPageBtn handleGoPrevpage={handleGoPrevpage}>이전 페이지로</GoPrevPageBtn>
                <GoHomeBtn handleGoHome={handleGoHome}>홈으로 이동하기</GoHomeBtn>
              </WrapButtons>
            </div>
          </Box>
    </Section>
  )
}
