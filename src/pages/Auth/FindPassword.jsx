import FindMemberBox from "../../components/containers/auth/FindMemberBox";
import styled from "styled-components";
import {
  ActiveFindPasswordButton,
  InactiveFindPasswordButton,
  GoLoginPage
} from "../../components/buttons/FindMemberButtons";
import {
  MAIN_BACKGROUND_COLOR,
  AUTH_MESSAGE_COLOR,
  AUTH_LABEL_COLOR,
  INACTIVE_INPUT_BORDER_COLOR,
  ACTIVE_INPUT_BORDER_COLOR,
  AUTH_WARNING_COLOR,
  AUTH_MAIN_COLOR,
} from "../../constants/color";
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
  background: ${AUTH_MAIN_COLOR};
`;

const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 12px;
`;

const WarningMessage = styled.p`
  color: ${AUTH_WARNING_COLOR};
  padding-top: 15px;
  text-align: start;
`;
const SubMessage = styled.p`
  color: ${AUTH_MESSAGE_COLOR};
  text-align: center;
`;

const FormStyle = styled.form`
  margin-top: 43px;
  width: 437px;
`;

const LabelStyle = styled.label`
  color: ${AUTH_LABEL_COLOR};
`;

const InputStyle = styled.input`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  margin-top: 8px;
  box-sizing: border-box;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};

  &:focus {
    border: 1px solid ${ACTIVE_INPUT_BORDER_COLOR};
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
    console.log("email:", email)
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
        email : email,
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
    navigate('/')
  }
  return (
    <Section>
      <h1 className="ir">비밀번호 찾기</h1>
      {!isSendLink &&
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
              <WarningMessage>
                이메일 형식을 확인해주세요.
              </WarningMessage>
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
      }
      {isSendLink &&
        <FindMemberBox>
          <SubMessage>입력하신 이메일로</SubMessage>
          <SubMessage>비밀번호 변경메일을 발송했어요!</SubMessage>
          <GoLoginPage handleGoLogin={handleGoLogin}>로그인 하기</GoLoginPage>
        </FindMemberBox>
      }

    </Section>
  );
}
