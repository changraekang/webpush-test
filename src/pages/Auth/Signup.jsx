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
  DropboxInput,
  InputValidateGroup,
} from "../../components/inputs/InputGroups";
import {EmailDropbox} from '../../components/dropbox/dropbox'
import { useRecoilState } from "recoil";
import { AlertMessage, IsAlertOpen } from "../../atom/Atom";
import AlertModal from "../../components/modals/AlertModal";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: "Pretendard-Regular";
  background: ${MAIN_BACKGROUND_COLOR};

  @media screen and (min-height: 750px) {
    padding: 80px 0;
    }
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
`;

const ItemBtn = styled.button`
  width: 100%;
  padding: 12px 0;

  &:hover {
    color: ${primary4};
    font-weight : 700;
  }
`

//--------------???????????? ?????????--------------------------
export default function Signup() {
  // ????????? ?????? ??????

  const [iscapslock, setIsCapsLock] = useState(false);
  const navigate = useNavigate();
  const emailList = [
    "test.com",
    "naver.com",
    "hanmail.net",
    "kakao.com",
    "gmail.com",
  ];
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [isOpenTokenBox, setIsOpenTokenBox] = useState(false);
  const [isTokenVerification, setIsTokenVerification] = useState(false);
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

  // Alert Modal
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(IsAlertOpen);
  const [alertMessage, setAlertMessage] = useRecoilState(AlertMessage);

  //capsLock ??????
  const handleCheckCapsLock = (e) => {
    if (e.getModifierState("CapsLock")) {
      setIsCapsLock(true);
    } else {
      setIsCapsLock(false);
    }
  };

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
      // ?????? ?????? ???????????? 1?????? +  8-25?????? ?????????
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
  // ????????? ?????? ??????
  const handleWriteEmail = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    // ***.com ?????????
    const re =
      /((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(e.target.value);
    setEmailVaildation(result);
    setEmail(e.target.value);
  };

  // ?????? ??????
  const requestToken = async (e) => {
    e.preventDefault();
    try {
      const response = await instanceAxios.post("/auth/emailToken", {
        email: `${id}@${email}`,
      });
      if (response.status === 200) {
        setIsAlertOpen(true);
        setAlertMessage(response.data.data);
        setIsOpenTokenBox(true);
        setIsTokenVerification(false);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  // ?????? ?????? ??????
  const requestCompleteToken = async (e) => {
    e.preventDefault();
    try {
      const response = await instanceAxios.post("/auth/emailTokenComplete", {
        email: `${id}@${email}`,
        token: token,
      });
      if (response.status === 200) {
        setIsTokenVerification(true);
        setIsAlertOpen(true);
        setAlertMessage(response.data.data);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  // ????????? ?????????
  const renderSelectEmail = () => {
    return (
      <>
        <InputAlign>
          <Label htmlFor="email" first>
            ?????????{" "}
          </Label>
          <SubInputAlign>
            <InputValidateGroup
              first
              type="text"
              placeholder="?????????"
              id="email"
              value={id}
              name="id"
              maxLength={25}
              setValue={handleInputValues}
            />
            <span>@</span>

            {!isWriteEmail && (
              <DropboxInput
                type="text"
                placeholder="????????? ??????"
                readOnly={true}
                handleClick={handleOpenEmail}
                value={email}
                name="email"
              />
            )}
            {isWriteEmail && (
              <DropboxInput
                type="text"
                placeholder="????????? ??????"
                setValue={handleWriteEmail}
                value={email}
                name="email"
              />
            )}
          </SubInputAlign>
        {isOpenEmail && 
        <EmailDropbox 
          arrList={emailList} 
          handleClick={handleEmail} 
          width={"173px"}
          ver={"42px"}
          hor={"0"}
          last={<ItemBtn value="write" onClick={handleEmail}>????????????</ItemBtn>}
        />
        }
        </InputAlign>
        <WrapRightItems first>
          {!emailVaildation && (
            <LabelWarning email htmlFor="email">
              ????????? ????????? ???????????????
            </LabelWarning>
          )}
          {(!id || !email || !emailVaildation || isTokenVerification) && (
            <UnCertificationButton>????????? ????????????</UnCertificationButton>
          )}
          {id && email && emailVaildation && !isTokenVerification && (
            <CertificationButton requestToken={requestToken}>
              ????????? ????????????
            </CertificationButton>
          )}

          {isOpenTokenBox && (
            <WrapWriteToken>
              <TokenMsg>???????????? ????????? ??????????????? ??????????????????.</TokenMsg>
              <InputAlign style={{ gap: "8px" }}>
                <InputValidateGroup
                  type="text"
                  placeholder="??????????????? ???????????????."
                  name="token"
                  setValue={handleInputValues}
                  value={token}
                  readonly={isTokenVerification ? true : false}
                />
                <TimeSpan>
                  {minutes} : {seconds < 10 ? "0" + seconds : seconds}
                </TimeSpan>
                {isTokenVerification ? (
                  <ActiveTokenButton
                    requestCompleteToken={requestCompleteToken}
                  >
                    ????????????
                  </ActiveTokenButton>
                ) : (
                  //?????? ?????? ???????????? ?????? ???????????? <InactiveTokenButton>????????????</InactiveTokenButton>
                  <ActiveTokenButton
                    requestCompleteToken={requestCompleteToken}
                  >
                    ????????????
                  </ActiveTokenButton>
                )}
              </InputAlign>
              <WrapReSendLink>
                <img src={warning} alt="" />
                <ResendBtn onClick={requestToken}>
                  ???????????? ???????????????
                </ResendBtn>
              </WrapReSendLink>
            </WrapWriteToken>
          )}
        </WrapRightItems>
      </>
    );
  };

  // ????????? data
  const registerData = {
    company: company,
    confirmPassword: confirmPassword,
    email: `${id}@${email}`,
    name: name,
    password: password,
    phone: phoneWrite,
    token: token,
  };

  // ????????? ??????
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
        setIsAlertOpen(true);
        setAlertMessage("???????????? ??????????");
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  //------------ ???????????? ??????--------------
  return (
    <Section>
      <h1 className="ir">????????????</h1>
      <SignupBox>
        <WrapTitle>
          <Title>?????? ??????</Title>
          <Message>DMPUSH??? ?????? ???????????? ????????? ???????????????!</Message>
        </WrapTitle>
        <WrapContents>
          <form action="post">
            {/* ????????? ?????? ???????????? */}
            {renderSelectEmail()}
            <InputAlign>
              <Label htmlFor="password">???????????? </Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="password"
                  id="password"
                  placeholder="??????, ??????, ??????????????? ????????? 8??? ??????"
                  value={password}
                  name="password"
                  setValue={handleInputValues}
                  isKeyDown={handleCheckCapsLock}
                  style={{
                    border: !passwordVaildation ? `1px solid ${error3}` : null,
                  }}
                />
                {!passwordVaildation && password && (
                  <LabelWarning htmlFor="email">
                    ??????????????? ??????/??????/????????? ????????? 8????????? ??????????????????.
                  </LabelWarning>
                )}
                {iscapslock && (
                  <LabelWarning>Caps Lock??? ??????????????????!</LabelWarning>
                )}
              </WrapRightItems>
            </InputAlign>

            <InputAlign>
              <Label htmlFor="confirmPassword">???????????? ??????</Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="password"
                  id="confirmPassword"
                  placeholder="??????????????? ??????"
                  value={confirmPassword}
                  name="confirmPassword"
                  setValue={handleInputValues}
                  isKeyDown={handleCheckCapsLock}
                  style={{
                    border: !conPasswdVaildation ? `1px solid ${error3}` : null,
                  }}
                />
                {!conPasswdVaildation && confirmPassword && (
                  <LabelWarning htmlFor="email">
                    ??????????????? ???????????? ????????????.
                  </LabelWarning>
                )}
                {iscapslock && (
                  <LabelWarning>Caps Lock??? ??????????????????!</LabelWarning>
                )}
              </WrapRightItems>
            </InputAlign>

            <InputAlign>
              <Label htmlFor="name">??????</Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="text"
                  id="name"
                  placeholder="?????? ????????? ??????????????????."
                  value={name}
                  name="name"
                  maxLength={20}
                  setValue={handleInputValues}
                />
              </WrapRightItems>
            </InputAlign>
            <InputAlign>
              <Label htmlFor="phone">????????? ??????</Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="text"
                  id="phone"
                  placeholder="????????? ????????? ???????????????."
                  value={phoneWrite}
                  name="phone"
                  setValue={handleInputValues}
                />
              </WrapRightItems>
            </InputAlign>

            <InputAlign last>
              <Label htmlFor="company">?????????</Label>
              <WrapRightItems>
                <InputValidateGroup
                  type="text"
                  id="company"
                  placeholder="???????????? ???????????? ???????????????"
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
              !agreement) && <BeforeSignupButton>????????????</BeforeSignupButton>}

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
                  ????????????
                </SignupButton>
              )}
          </form>
        </WrapContents>
      </SignupBox>
      {/* alert */}
      {isAlertOpen && <AlertModal></AlertModal>}
      {/* alert */}
    </Section>
  );
}
