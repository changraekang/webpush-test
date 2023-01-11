import FindMemberBox from "../../components/containers/auth/FindMemberBox";
import styled from "styled-components";
import {
  ActiveFindPasswordButton,
  InactiveFindPasswordButton,
  GoLoginPage,
} from "../../components/buttons/FindMemberButtons";
import {
  MAIN_BACKGROUND_COLOR,
  grey9,
  grey11,
  grey5,
  primary4,
  grey7,
  error3,
} from "../../constants/color";
import mainImage from "../../assets/images/mainpage.png";
import checkImg from "../../assets/images/Check.png";

import { useState } from "react";
import { instanceAxios } from "../../api/axios";
import { useNavigate } from "react-router";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
`;
const ImageSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
  background-image: ${MAIN_BACKGROUND_COLOR};
`;
const InputSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
`;
const MainImage = styled.img`
  width: 712px;
  height: 654px;
`;
const Check = styled.img`
  width: 40px;
  height: 40px;
`;
const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 12px;
`;

const SubMessage = styled.p`
  color: ${grey9};
  font-weight: 400;
  line-height: 27px;
  text-align: center;
`;
const SubTitle = styled.p`
  color: ${grey7};
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
`;

const WarningMessage = styled.p`
  color: ${error3};
  padding-top: 15px;
  text-align: start;
`;

const FormStyle = styled.form`
  margin-top: 43px;
  width: 437px;
`;
const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 0px;
  gap: 8px;

  width: 360px;
  height: 172px;

  /* Grey/20 */

  background: #f0f0f0;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 51px;

  /* Grey/20 */
`;
const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  /* Grey/20 */
`;

const LabelStyle = styled.label`
  color: ${grey11};
`;

const InputStyle = styled.input`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  margin-top: 8px;
  box-sizing: border-box;
  border: 1px solid ${grey5};

  &:focus {
    border: 1px solid ${primary4};
  }
`;

export default function FindPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailValidation, setemailValidation] = useState(true);
  const [isSendLink, setIsSendLink] = useState(false);

  const handleInput = (e) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(e.target.value);
    setEmail(e.target.value);
    console.log("email:", email);
    if (result) {
      setemailValidation(true);
    } else {
      return setemailValidation(false);
    }
  };
  const requestFindPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await instanceAxios.post("/auth/password/link", {
        email: email,
      });
      if (response.status === 200) {
        alert(response.data.data);
        setIsSendLink(true);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  const handleGoLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <Section>
      <h1 className="ir">비밀번호 찾기</h1>
      <ImageSection>
        <MainImage src={mainImage} alt="메인이미지" />
      </ImageSection>
      <InputSection>
        {!isSendLink && (
          <FindMemberBox>
            <Title>비밀번호 찾기</Title>
            <SubMessage>회원가입 시 입력한 이메일을 입력해주세요!</SubMessage>
            <FormStyle action="post">
              <LabelStyle htmlFor="email">이메일</LabelStyle>
              <div>
                <InputStyle
                  onChange={handleInput}
                  value={email}
                  type="text"
                  id="email"
                  placeholder="이메일을 입력해주세요."
                />
              </div>
              {email && !emailValidation && (
                <WarningMessage>이메일 형식을 확인해주세요.</WarningMessage>
              )}

              {email && emailValidation && (
                <ActiveFindPasswordButton requestFind={requestFindPassword}>
                  확인
                </ActiveFindPasswordButton>
              )}
              {(!email || !emailValidation) && (
                <InactiveFindPasswordButton>확인</InactiveFindPasswordButton>
              )}
            </FormStyle>
          </FindMemberBox>
        )}
        {isSendLink && (
          <FindMemberBox>
            <BoxWrapper>
              <Check src={checkImg} alt="체크표시"></Check>
              <MessageWrapper>
                <SubMessage>입력하신 이메일로</SubMessage>
                <SubTitle>비밀번호 변경메일을 발송했어요!</SubTitle>
              </MessageWrapper>
            </BoxWrapper>
            <ButtonWrapper>
              <GoLoginPage handleGoLogin={handleGoLogin}>
                로그인 하기
              </GoLoginPage>
            </ButtonWrapper>
          </FindMemberBox>
        )}
      </InputSection>
    </Section>
  );
}
