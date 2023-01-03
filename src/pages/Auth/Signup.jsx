import styled from "styled-components";
import AuthBox from "../../components/containers/auth/AuthBox";
import {
  ACTIVE_INPUT_BORDER_COLOR,
  AUTH_TITLE_COLOR,
  AUTH_MESSAGE_COLOR,
  AUTH_LABEL_COLOR,
  MAIN_BACKGROUND_COLOR,
  INACTIVE_INPUT_BORDER_COLOR,
  INACTIVE_INPUT_FONT_COLOR,
  ACTIVE_INPUT_COLOR,
  EMAIL_OPTION_BORDER_COLOR,
  AUTH_WARNING_COLOR,
} from "../../constants/color";
import { SAMLL_INPUT_SIZE } from "../../constants/fontSize";
import logo from "../../assets/images/logo.png";
import {
  CertificationButton,
  UnCertificationButton,
  SignupButton,
  BeforeSignupButton,
  ActiveTokenButton,
  InactiveTokenButton,
} from "../../components/buttons/AuthButtons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SignupAgreement from "../../components/agreement/SignupAgreement";
import { instanceAxios } from "../../api/axios";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
  padding: 100px 0;
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
  background-color: ${MAIN_BACKGROUND_COLOR};
`;

const WrapLogo = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 43px;
`;
const Title = styled.h2`
  color: ${AUTH_TITLE_COLOR};
  font-size: 32px;
  font-weight: 600;
  padding-bottom: 12px;
`;

const Message = styled.p`
  color: ${AUTH_MESSAGE_COLOR};
`;

const Logo = styled.img`
  width: 258px;
  height: 74px;
`;

const WrapContents = styled.div`
  width: 437px;
`;
const InputAlign = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: ${(props) => (props.last ? "32px" : "12px")};
  margin-bottom: ${(props) => (props.agreement ? "24px" : null)};
`;

const Input = styled.input`
  width: 100%;
  width: ${(props) => (props.first ? "134px" : "100%")};
  padding: 16px;
  margin-top: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};

  &:focus {
    border: 1px solid ${ACTIVE_INPUT_BORDER_COLOR};
  }

  &::placeholder {
    color: ${INACTIVE_INPUT_FONT_COLOR};
  }
`;

const InputWriteEmail = styled.input`
  width: 100%;
  width: ${(props) => (props.first ? "300px" : "100%")};
  padding: 16px;
  margin-top: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};

  &:focus {
    border: 1px solid ${ACTIVE_INPUT_BORDER_COLOR};
  }

  &::placeholder {
    color: ${INACTIVE_INPUT_FONT_COLOR};
  }
`;

const Label = styled.label`
  color: ${AUTH_LABEL_COLOR};
`;

const LabelWarning = styled.label`
  color: ${AUTH_WARNING_COLOR};
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};
  cursor: pointer;

  &::placeholder {
    color: ${INACTIVE_INPUT_FONT_COLOR};
  }
`;

const EmailList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 176px;
  right: 95px;
  top: 55px;
  font-size: ${SAMLL_INPUT_SIZE};
  background-color: ${ACTIVE_INPUT_COLOR};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  border: 1px solid ${EMAIL_OPTION_BORDER_COLOR};
  text-align: center;
  z-index: 5;
`;

const EmailOptions = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid ${EMAIL_OPTION_BORDER_COLOR};
  border-bottom: ${(props) =>
    props.last ? "none" : `1px solid ${EMAIL_OPTION_BORDER_COLOR}`};
`;
//--------------회원가입 페이지--------------------------
export default function Signup() {
  const navigate = useNavigate();
  const emailList = ["naver.com", "hanmail.net", "kakao.com", "gmail.com"];
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [isOpenTokenInput, setIsOpenTokenInput] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneWrite, setPhoneWrite] = useState("");
  const [isWriteEmail, setIsWriteEmail] = useState(false);
  const [emailVaildation, setEmailVaildation] = useState(true);
  const [passwordVaildation, setPasswordVaildation] = useState(true);
  const [conPasswdVaildation, setConPasswdVaildation] = useState(true);
  const [phoneVaildation, setPhoneVaildation] = useState(true);
  const handleOpenEmail = () => {
    !isOpenEmail ? setIsOpenEmail(true) : setIsOpenEmail(false);
  };
  const [inputs, setInputs] = useState({
    id: "",
    // email: '',
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    company: "",
    token: "",
  });
  useEffect(() => {
    if (phoneWrite.length === 10) {
      setPhoneWrite(phoneWrite.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneWrite.length === 13) {
      setPhoneWrite(
        phoneWrite
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
    console.log("하이픈", phoneWrite);
  }, [phoneWrite]);
  const { id, token, password, confirmPassword, name, phone, company } = inputs;

  const handleInputValues = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (e.target.name === "password") {
      // 영문 숫자 특수문자 1개씩 +  8-25글자 정규식
      let re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      console.log(re.test(e.target.value));
      setPasswordVaildation(re.test(e.target.value));
      if (conPasswdVaildation) {
        setConPasswdVaildation(false);
      }
    } else if (e.target.name === "confirmPassword") {
      if (e.target.value === password) {
        setConPasswdVaildation(true);
      } else {
        setConPasswdVaildation(false);
      }
    } else if (e.target.name === "phone") {
      const regex = /^[0-9\b -]{0,13}$/;
      console.log(e.target.value);
      if (regex.test(e.target.value)) {
        console.log(e.target.value, "통과");
        setPhoneWrite(e.target.value);
        setPhoneVaildation(true);
      } else {
        return setPhoneVaildation(false);
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleEmail = (e) => {
    e.preventDefault();
    handleOpenEmail();
    if (e.target.value === "write") {
      return setIsWriteEmail(true);
    }
    setEmail(e.target.value);
  };
  // 이메일 직접 쓰기
  const handleWriteEmail = (e) => {
    e.preventDefault();
    // ***.com 정규식
    const re =
      /((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(e.target.value);
    setEmailVaildation(result);
    console.log(emailVaildation);
    setEmail(e.target.value);
  };

  // 토큰 요청
  const requestToken = async (e) => {
    e.preventDefault();
    try {
      const response = await instanceAxios.post("/auth/emailToken", {
        email: `${id}@${email}`,
      });
      if (response.status === 200) {
        alert(response.data.data);
        setIsOpenTokenInput(true);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const requestCompleteToken = async (e) => {
    e.preventDefault();
    try {
      const response = await instanceAxios.post("/auth/emailTokenComplete", {
        email: `${id}@${email}`,
        token: token,
      });
      if (response.status === 200) {
        alert(response.data.data);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  // 이메일 셀렉트
  const renderSelectEmail = () => {
    return (
      <>
        <InputAlign>
          <Input
            first
            type="text"
            placeholder="아이디"
            id="email"
            value={id}
            name="id"
            maxLength={40}
            onChange={handleInputValues}
          />
          <span>@</span>

          <EmailInput
            type="text"
            placeholder="이메일 선택"
            readOnly
            onClick={handleOpenEmail}
            value={email}
            name="email"
          />

          {isOpenEmail && (
            <EmailList>
              {emailList.map((item, index) => (
                <EmailOptions key={index}>
                  <button onClick={handleEmail} value={item}>
                    {item}
                  </button>
                </EmailOptions>
              ))}
              <EmailOptions last>
                <button value="write" onClick={handleEmail}>
                  직접입력
                </button>
              </EmailOptions>
            </EmailList>
          )}

          {(!id || !email) && (
            <UnCertificationButton>확인</UnCertificationButton>
          )}
          {id && email && (
            <CertificationButton requestToken={requestToken}>
              확인
            </CertificationButton>
          )}
        </InputAlign>
        {isOpenTokenInput && (
          <>
            {/* <Label htmlFor="password">인증 번호 입력</Label> */}
            <InputAlign>
              <Input
                type="text"
                placeholder="인증번호를 적어주세요."
                name="token"
                onChange={handleInputValues}
                value={token}
              />
              {token && (
                <ActiveTokenButton requestCompleteToken={requestCompleteToken}>
                  인증하기
                </ActiveTokenButton>
              )}
              {!token && <InactiveTokenButton>인증하기</InactiveTokenButton>}
            </InputAlign>
          </>
        )}
      </>
    );
  };
  // 이메일 직접쓰기
  const renderWriteEmail = () => {
    return (
      <>
        <InputAlign>
          <Input
            first
            type="text"
            placeholder="아이디"
            id="email"
            value={id}
            name="id"
            onChange={handleInputValues}
          />
          <span>@</span>

          <EmailInput
            type="text"
            placeholder="이메일 선택"
            onChange={handleWriteEmail}
            value={email}
            name="email"
          />

          {(!id || !email || !emailVaildation) && (
            <UnCertificationButton>확인</UnCertificationButton>
          )}
          {id && email && emailVaildation && (
            <CertificationButton requestToken={requestToken}>
              확인
            </CertificationButton>
          )}
        </InputAlign>
        {isOpenTokenInput && (
          <>
            {/* <Label htmlFor="password">인증 번호 입력</Label> */}
            <InputAlign>
              <Input
                type="text"
                placeholder="인증번호를 적어주세요."
                name="token"
                onChange={handleInputValues}
                value={token}
              />
              {token && (
                <ActiveTokenButton requestCompleteToken={requestCompleteToken}>
                  인증하기
                </ActiveTokenButton>
              )}
              {!token && <InactiveTokenButton>인증하기</InactiveTokenButton>}
            </InputAlign>
          </>
        )}
      </>
    );
  };
  // 로그인 data
  const registerData = {
    company: company,
    confirmPassword: confirmPassword,
    email: `${id}@${email}`,
    name: name,
    password: password,
    phone: phoneWrite,
    token: token,
  };
  // 로그인 요청
  const requestRegister = async (e) => {
    e.preventDefault();
    console.log(registerData);
    try {
      const response = await instanceAxios.post("/auth/register", registerData);
      if (response.status === 200) {
        navigate("/", {
          state: {
            token: token,
          },
        });
        console.log("로그인 성공🎉");
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  // 컴포넌트 시작
  return (
    <Section>
      <h1 className="ir">회원가입</h1>
      <AuthBox>
        <WrapLogo>
          <Title>회원 가입</Title>
          <Message>DMPUSH와 함께 마케팅에 날개를 달아보세요!</Message>
          {/* <Logo src={logo} alt="메인로고" /> */}
        </WrapLogo>
        <WrapContents>
          <form action="post">
            <Label htmlFor="email">이메일 </Label>
            {!emailVaildation && (
              <LabelWarning htmlFor="email">
                이메일 형식을 맞춰주세요
              </LabelWarning>
            )}
            {!isWriteEmail && renderSelectEmail()}
            {isWriteEmail && renderWriteEmail()}
            <Label htmlFor="password">비밀번호 </Label>
            {!passwordVaildation && (
              <LabelWarning htmlFor="email">
                비밀번호 형식을 맞춰주세요
              </LabelWarning>
            )}
            <InputAlign>
              <Input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                name="password"
                onChange={handleInputValues}
              />
            </InputAlign>

            <Label htmlFor="confirmPassword">비밀번호 확인 </Label>
            {!conPasswdVaildation && (
              <LabelWarning htmlFor="email">
                입력한 비밀번호 같은 비밀번호를 입력하세요
              </LabelWarning>
            )}
            <InputAlign>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="비밀번호를 확인해주세요."
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleInputValues}
              />
            </InputAlign>

            <Label htmlFor="name">이름</Label>
            <InputAlign>
              <Input
                type="text"
                id="name"
                placeholder="이름(본인 성명)을 입력해주세요."
                value={name}
                name="name"
                maxLength={20}
                onChange={handleInputValues}
              />
            </InputAlign>
            <Label htmlFor="phone">휴대폰 번호</Label>
            <InputAlign>
              <Input
                type="text"
                id="phone"
                placeholder="휴대폰 번호를 입력해주세요."
                value={phoneWrite}
                name="phone"
                onChange={handleInputValues}
              />
            </InputAlign>

            <Label htmlFor="company">회사명</Label>
            <InputAlign last>
              <Input
                type="text"
                id="company"
                placeholder="회사명을 입력해주세요."
                value={company}
                name="company"
                onChange={handleInputValues}
              />
            </InputAlign>

            <SignupAgreement />
            {(!id ||
              !email ||
              !password ||
              !confirmPassword ||
              !name ||
              !phone ||
              !company ||
              !conPasswdVaildation ||
              !passwordVaildation ||
              !token) && (
              <BeforeSignupButton type="submit">회원가입</BeforeSignupButton>
            )}
            {id &&
              email &&
              password &&
              phone &&
              passwordVaildation &&
              conPasswdVaildation &&
              name &&
              company &&
              token && (
                <SignupButton type="submit" requestRegister={requestRegister}>
                  회원가입
                </SignupButton>
              )}
          </form>
        </WrapContents>
      </AuthBox>
    </Section>
  );
}
