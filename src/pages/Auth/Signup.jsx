import styled from "styled-components";
import { SignupBox } from "../../components/containers/auth/AuthBox";
import {
  grey11,
  grey9,
  grey1,
  MAIN_BACKGROUND_COLOR,
  grey5,
  grey6,
  primary4,
  error3,
} from "../../constants/color";
import logo from "../../assets/images/logo.png";
import {
  CertificationButton,
  UnCertificationButton,
  SignupButton,
  BeforeSignupButton,
  ActiveTokenButton,
  InactiveTokenButton,
} from "../../components/buttons/SignupButtons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import SignupAgreement from "../../components/agreement/SignupAgreement";
import { instanceAxios } from "../../api/axios";
import warning from "../../assets/images/warning.png";
import {
  InputGroup,
  InputValidateGroup,
} from "../../components/inputs/InputGroups";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: "Pretendard-Regular";
  background: ${MAIN_BACKGROUND_COLOR};
`;

const WrapTitle = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 64px;
  position: relative;

  &::after {
    position: absolute;
    display: block;
    content: "";
    bottom: -32px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #8c8c8c;
  }
`;

const Title = styled.h2`
  color: ${grey11};
  font-size: 32px;
  font-weight: 600;
  padding-bottom: 12px;
`;

const Message = styled.p`
  color: ${grey9};
`;

const WrapContents = styled.div`
  width: 520px;
`;

const InputAlign = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.last ? "32px" : "12px")};
  margin-bottom: ${(props) => (props.agreement ? "24px" : null)};
`;

const SubInputAlign = styled.div`
  display: flex;
  width: 380px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Label = styled.label`
  /* width: 140px; */
  color: ${grey11};
  display: inline-block;
  width: 140px;
`;

const LabelWarning = styled.span`
  display: block;
  color: ${error3};
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: ${(props) => (props.email ? "8px" : "0")};
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${grey5};
  cursor: pointer;
`;

const EmailList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 173px;
  right: 0;
  top: 42px;
  background-color: ${grey1};
  font-size: 14px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  border: 1px solid ${grey5};
  text-align: center;
  z-index: 5;
`;

const EmailOptions = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid ${grey5};
  border-bottom: ${(props) => (props.last ? "none" : `1px solid ${grey5}`)};
`;

const WrapRightItems = styled.div`
  width: 380px;
  margin: ${(props) => (props.first ? "0 0 12px 140px" : "0")};
`;

const WrapWriteToken = styled.div`
  background: #f0f0f0;
  padding: 16px;
  margin-top: 12px;
`;
const TokenMsg = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
`;

const WrapReSendLink = styled.div`
  display: flex;
  align-items: center;
`;

const ResendBtn = styled.button`
  font-size: 14px;
  color: #434343;
`;

const TimeSpan = styled.span`
  color: ${error3};
  position: absolute;
  display: block;
  right: 100px;
  top: 12px;
  font-size: 14px;
`

//--------------회원가입 페이지--------------------------
export default function Signup() {
  const navigate = useNavigate();
  const emailList = ['test.com', "naver.com", "hanmail.net", "kakao.com", "gmail.com",];
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [isOpenTokenBox, setIsOpenTokenBox] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneWrite, setPhoneWrite] = useState("");
  const [isWriteEmail, setIsWriteEmail] = useState(false);
  const [emailVaildation, setEmailVaildation] = useState(true);
  const [passwordVaildation, setPasswordVaildation] = useState(true);
  const [conPasswdVaildation, setConPasswdVaildation] = useState(true);
  const [phoneVaildation, setPhoneVaildation] = useState(true);
  const [agreement, setAgreement] = useState(false);
  const [minutes, setMinutes] = useState(parseInt(3));
  const [seconds, setSeconds] = useState(parseInt(0));

  useEffect(() => {
    if (isOpenTokenBox) {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [minutes, seconds, isOpenTokenBox]);

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
  const { id, token, password, confirmPassword, name, phone, company } = inputs;

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
  }, [phoneWrite]);

  const handleInputValues = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (e.target.name === "password") {
      // 영문 숫자 특수문자 1개씩 +  8-25글자 정규식
      let re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      // setPassword(e.target.value)
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
      if (regex.test(e.target.value)) {
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
    console.log(e.target.value);
    e.preventDefault();
    // ***.com 정규식
    const re =
      /((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(e.target.value);
    setEmailVaildation(result);
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
        setIsOpenTokenBox(true);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  // 토큰 인증 요청
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
          <Label htmlFor="email" first>
            이메일{" "}
          </Label>
          <SubInputAlign>
            <InputValidateGroup
              first
              type="text"
              placeholder="아이디"
              id="email"
              value={id}
              name="id"
              maxLength={25}
              setValue={handleInputValues}
            />
            <span>@</span>

            {!isWriteEmail && (
              <EmailInput
                type="text"
                placeholder="이메일 선택"
                readOnly
                onClick={handleOpenEmail}
                value={email}
                name="email"
              />
            )}
            {isWriteEmail && (
              <EmailInput
                type="text"
                placeholder="이메일 선택"
                onChange={handleWriteEmail}
                value={email}
                name="email"
              />
            )}
          </SubInputAlign>

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
        </InputAlign>
        <WrapRightItems first>
          {!emailVaildation && (
            <LabelWarning email htmlFor="email">
              이메일 형식을 맞춰주세요
            </LabelWarning>
          )}
          {(!id || !email || !emailVaildation) && (
            <UnCertificationButton>이메일 인증하기</UnCertificationButton>
          )}
          {id && email && emailVaildation && (
            <CertificationButton requestToken={requestToken}>
              이메일 인증하기
            </CertificationButton>
          )}

          {isOpenTokenBox && (
            <WrapWriteToken>
              <TokenMsg>이메일로 전송된 인증번호를 입력해주세요.</TokenMsg>
              <InputAlign style={{gap: "8px"}}>
                <InputValidateGroup
                  type="text"
                  placeholder="인증번호를 적어주세요."
                  name="token"
                  setValue={handleInputValues}
                  value={token}
                  />
                <TimeSpan>{minutes} : {seconds < 10 ? '0' + seconds : seconds}</TimeSpan>
                <ActiveTokenButton requestCompleteToken={requestCompleteToken}>
                  인증하기
                </ActiveTokenButton>
              </InputAlign>
              <WrapReSendLink>
                <img src={warning} alt="" />
                <ResendBtn onClick={requestToken}>
                  인증번호 재발송하기
                </ResendBtn>
              </WrapReSendLink>
            </WrapWriteToken>
          )}
        </WrapRightItems>
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
    try {
      const response = await instanceAxios.post("/auth/register", registerData);
      if (response.status === 200) {
        navigate("/", {
          state: {
            token: token,
          },
        });
        console.log("회원가입 성공🎉");
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  //------------ 컴포넌트 시작--------------
  return (
    <Section>
      <h1 className="ir">회원가입</h1>
      <SignupBox>
        <WrapTitle>
          <Title>회원 가입</Title>
          <Message>DMPUSH와 함께 마케팅에 날개를 달아보세요!</Message>
        </WrapTitle>
        <WrapContents>
          <form action="post">
            {/* 이메일 종류 선택하기 */}
            {renderSelectEmail()}
            <InputAlign>
              <Label htmlFor="password">비밀번호 </Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="password"
                  id="password"
                  placeholder="한글, 영문, 특수문자를 포함한 8자 이상"
                  value={password}
                  name="password"
                  setValue={handleInputValues}
                  style={{
                    border: !passwordVaildation ? `1px solid ${error3}` : null,
                  }}
                />
                {!passwordVaildation && password &&(
                  <LabelWarning htmlFor="email">
                    비밀번호는 영문/숫자/특문을 포함한 8자이상 입력해주세요.
                  </LabelWarning>
                )}
              </WrapRightItems>
            </InputAlign>

            <InputAlign>
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="password"
                  id="confirmPassword"
                  placeholder="비밀번호를 확인"
                  value={confirmPassword}
                  name="confirmPassword"
                  setValue={handleInputValues}
                  style={{
                    border: !conPasswdVaildation ? `1px solid ${error3}` : null,
                  }}
                />
                {!conPasswdVaildation && confirmPassword && (
                  <LabelWarning htmlFor="email">
                    비밀번호가 일치하지 않습니다.
                  </LabelWarning>
                )}
              </WrapRightItems>
            </InputAlign>

            <InputAlign>
              <Label htmlFor="name">이름</Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="text"
                  id="name"
                  placeholder="본인 성명을 입력해주세요."
                  value={name}
                  name="name"
                  maxLength={20}
                  setValue={handleInputValues}
                />
              </WrapRightItems>
            </InputAlign>
            <InputAlign>
              <Label htmlFor="phone">휴대폰 번호</Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="text"
                  id="phone"
                  placeholder="휴대폰 번호를 입력하세요."
                  value={phoneWrite}
                  name="phone"
                  setValue={handleInputValues}
                />
              </WrapRightItems>
            </InputAlign>

            <InputAlign last>
              <Label htmlFor="company">회사명</Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="text"
                  id="company"
                  placeholder="재직중인 회사명을 입력하세요"
                  value={company}
                  name="company"
                  setValue={handleInputValues}
                />
              </WrapRightItems>
            </InputAlign>

            <SignupAgreement setAgree={setAgreement} />
            {(!id ||
              !email ||
              !password ||
              !confirmPassword ||
              !name ||
              !phone ||
              !company ||
              !conPasswdVaildation ||
              !passwordVaildation ||
              !token ||
              !agreement) && <BeforeSignupButton>회원가입</BeforeSignupButton>}

            {id &&
              email &&
              password &&
              confirmPassword &&
              name &&
              phone &&
              company &&
              conPasswdVaildation &&
              passwordVaildation &&
              token &&
              agreement && (
                <SignupButton type="submit" requestRegister={requestRegister}>
                  회원가입
                </SignupButton>
              )}
          </form>
        </WrapContents>
      </SignupBox>
    </Section>
  );
}
