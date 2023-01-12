import styled from "styled-components";
import FindMemberBox from "../../components/containers/auth/FindMemberBox";
import {
  grey9,
  grey5,
  primary4,
  error3,
  MAIN_BACKGROUND_COLOR,
} from "../../constants/color";
import { useEffect, useState } from "react";
import {
  ActiveSetNewasswordButton,
  InactiveSetNewPasswordButton,
} from "../../components/buttons/FindMemberButtons";
import { instanceAxios } from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
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
  text-align: center;
  margin-bottom: 12px;
`;

const WarningMessage = styled.p`
  color: ${error3};
  padding-top: 15px;
  text-align: start;
`;
const SubMessage = styled.p`
  color: ${grey9};
  text-align: center;
`;

const FormStyle = styled.form`
  margin-top: 43px;
  width: 437px;
`;

const LabelWarning = styled.p`
  color: ${error3};
  margin-top: 5px;
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

export default function SetNewPassword() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [passwordVaildation, setPasswordVaildation] = useState(true);
  const [conPasswdVaildation, setConPasswdVaildation] = useState(true);
  const [expiredToken, setExpiredToken] = useState(false);
  const [inputs, setInputs] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const location = window.location;
    if(location.search) {
      setToken(location.search.split("=")[1].split("&")[0]);
      setEmail(location.search.split("=")[2]);
    }
  }, []);

  const { newPassword, confirmPassword } = inputs;

  const handleInputValues = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "newPassword") {
      if (e.target.value === inputs.confirmPassword) {
        setConPasswdVaildation(true);
      } else {
        setConPasswdVaildation(false);
      }
      // 영문 숫자 특수문자 1개씩 +  8-25글자 정규식
      let re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      console.log(re.test(e.target.value));
      setPasswordVaildation(re.test(e.target.value));
      if (conPasswdVaildation) {
        setConPasswdVaildation(false);
      }
    } else if (e.target.name === "confirmPassword") {
      console.log(e.target.value, "비밀번호확인");
      console.log(inputs.newPassword, "비밀번호확인");
      if (e.target.value === inputs.newPassword) {
        setConPasswdVaildation(true);
      } else {
        setConPasswdVaildation(false);
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  const data = {
    confirmPassword: confirmPassword,
    email: email,
    newPassword: newPassword,
    token: token,
  };

  const requesetNewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await instanceAxios.post("/auth/password/reset", data);
      if (response.status === 200) {
        alert(response.data.data);
        navigate("/");
      }
      console.log(response);
    } catch (err) {
      navigate("/error_newPassword");
      console.error(err);
    }
  };

  return (
    <Section>
      <h1 className="ir">새 비밀번호 설정 페이지</h1>
      <SetPasswordBox>
        <Title>새 비밀번호 설정</Title>
        <SubMessage>새로운 비밀번호를 설정하고 DMPUSH를 이용하세요.</SubMessage>
        <FormStyle action="post" onSubmit={requesetNewPassword}>
          <div>
            <InputStyle
              onChange={handleInputValues}
              value={newPassword}
              type="password"
              name="newPassword"
              placeholder="새 비밀번호"
            />
            {!passwordVaildation && (
              <LabelWarning htmlFor="email">
                비밀번호는 영문/숫자/특문을 포함한 8자 이상 입력해주세요
              </LabelWarning>
            )}
          </div>
          <div>
            <InputStyle
              onChange={handleInputValues}
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              placeholder="새 비밀번호 확인"
            />
            {!conPasswdVaildation && (
              <LabelWarning htmlFor="email">
                비밀번호가 일치하지 않습니다
              </LabelWarning>
            )}
          </div>
          {(!newPassword ||
            !confirmPassword ||
            !conPasswdVaildation ||
            !passwordVaildation) && (
            <InactiveSetNewPasswordButton>
              비밀번호 변경하기
            </InactiveSetNewPasswordButton>
          )}
          {newPassword &&
            confirmPassword &&
            conPasswdVaildation &&
            passwordVaildation && (
              <ActiveSetNewasswordButton>
                비밀번호 변경하기
              </ActiveSetNewasswordButton>
            )}
        </FormStyle>
      </SetPasswordBox>
    </Section>
  );
}
