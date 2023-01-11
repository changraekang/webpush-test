import styled from "styled-components";
import {
  grey9,
  MAIN_BACKGROUND_COLOR,
} from "../../constants/color";
import { instanceAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import exclamationImg from "../../assets/images/Exclamation.png";
import SetPasswordBox from "../../components/containers/auth/SetPasswordBox";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  background: ${MAIN_BACKGROUND_COLOR};
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  text-align: center;
  margin-bottom: 12px;
`;

const SubMessage = styled.p`
  color: ${grey9};
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;
const Check = styled.img`
  width: 20px;
  height: 20px;
`;
const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  gap: 12px;
  width: 360px;
  height: 130px;
  background: #f0f0f0;
`;
const ReFindPasswordButton = styled.button`
  width: 360px;
  height: 51px;
  margin-top: 32px;
  /* Primary/Primary */
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
  background: #7124d3;
  border-radius: 32px;
  color: white;
`;
export default function ErrorPassword() {
  const navigate = useNavigate();

  const requesetNewPassword = () => {
    navigate("/findPassword");
  };

  return (
    <Section>
      <h1 className="ir">비밀번호 유효기간 만료</h1>
      <SetPasswordBox>
        <Title>앗! 유효기간이 지났습니다!</Title>
        <BoxWrap>
          <Check src={exclamationImg} alt="느낌표표시"></Check>
          <SubMessage>이미 유효시간이 지났거나 사용된 코드입니다.</SubMessage>
          <SubMessage>새로운 코드를 요청해주세요.</SubMessage>
        </BoxWrap>
        <ReFindPasswordButton onClick={requesetNewPassword}>
          다시 찾기
        </ReFindPasswordButton>
      </SetPasswordBox>
    </Section>
  );
}
