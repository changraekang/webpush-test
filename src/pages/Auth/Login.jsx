import styled from "styled-components";
import { LoginBox } from "../../components/containers/auth/AuthBox";
import {
  MAIN_BACKGROUND_COLOR,
  grey11,
  primary4,
  grey5,
  grey6,
  grey10,
  error3,
} from "../../constants/color";
import logo from "../../assets/images/logo.png";
import mainImage from "../../assets/images/mainpage.png";
import {
  LoginButton,
  BeforeLoginButton,
  GoSignupButton,
} from "../../components/buttons/AuthButtons";
import activeCheck from "../../assets/images/active-radio.png";
import inActiveCheck from "../../assets/images/inactive-radio.png";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { deviceDetect, mobileModel, osName } from "react-device-detect";
import { instanceAxios } from "../../api/axios";
import {
  setAccessTokenToCookie,
  setRefreshTokenToCookie,
  setRememberEmail,
} from "../../cookie/controlCookie";
import {
  InputGroup,
  InputValidateGroup,
} from "../../components/inputs/InputGroups";
import { useRecoilState } from "recoil";
import {
  AlertCode,
  AlertMessage,
  IsAlertOpen,
  IsLogoutOpen,
  MyCategory,
  MyProfile,
  MyProject,
  MyPushProject,
} from "../../atom/Atom";
import Cookies from "universal-cookie";
import { version } from "react";
import AlertModal from "../../components/modals/AlertModal";
import { LogoutMadal, NewpasswordMadal } from "../../components/modals/LogoutMadal";
const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
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

const WrapLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 335px;
  height: 131px;
  font-weight: 900;
  line-height: 48px;
  margin-bottom: 60px;
  color: ${grey10};
  font-size: 40px;
`;

const Logo = styled.img`
  width: 335px;
  height: 75px;
`;
const MainImage = styled.img`
  width: 712px;
  height: 654px;
`;

const WrapContents = styled.div`
  width: 100%;
`;
const ButtonWrap = styled.div`
  width: 100%;
  margin-top: 12px;
`;

const IDInputWrap = styled.div`
  width: 399px;
`;

const PwdInputWrap = styled.div`
  width: 399px;
  margin-top: 20px;
`;

const RadioList = styled.ul`
  display: flex;
  margin: 24px 0 36px 0;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const SubTitle = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 18px;
`;

const RadioLi = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const WrapFindAuth = styled.div`
  display: flex;
  gap: 10px;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: ${grey11};
`;

const RememberEmail = styled.input`
  background: ${(props) =>
    props.active ? `url(${activeCheck})` : `url(${inActiveCheck})`};
  /* background: url(${inActiveCheck}); */
  background-repeat: no-repeat;
  background-size: 15px;
  width: 15px;
  border: none;
  cursor: pointer;
`;

const LabelWarning = styled.span`
  display: block;
  color: ${error3};
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: ${(props) => (props.email ? "8px" : "0")};
`;

//--------------로그인 페이지--------------------------
export default function Login() {
  const navigate = useNavigate();
  const [iscapslock, setIsCapsLock] = useState(false);
  const [email, setEmail] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [password, setPassword] = useState("");

  // Recoil 부분
  const [myProfile, setMyProfile] = useRecoilState(MyProfile);
  const [myProject, setMyProject] = useRecoilState(MyProject);
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);
  const [myCategory, setMyCategory] = useRecoilState(MyCategory);
  // Alert Modal
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(IsAlertOpen);
  const [isLogoutOpen, setIsLogoutOpen] = useRecoilState(IsLogoutOpen);
  const [alertMessage, setAlertMessage] = useRecoilState(AlertMessage);
  const [alertCode, setAlertCode] = useRecoilState(AlertCode);

  //이메일 저장 날짤 설정
  let today = new Date();
  today.setDate(today.getDate() + 1);

  //capsLock 여부
  const handleCheckCapsLock = (e) => {
    if (e.getModifierState("CapsLock")) {
      setIsCapsLock(true);
    } else {
      setIsCapsLock(false);
    }
  };
  // cookie 새로 설정
  const loginCookie = new Cookies();
  console.log(isCheck, '🍑isCheck')
  // 처음 페이지 진입
  useEffect(() => {
    if (loginCookie.get("rememberEmail") !== undefined) {
      setEmail(loginCookie.get("rememberEmail"));
      setIsCheck(true);
    } else {
      setIsCheck(false);
      loginCookie.remove("rememberEmail");
    }
    loginCookie.remove("accessToken");
    loginCookie.remove("refreshToken");
    console.log("test-commit modal");
  }, []);

  const handleCheckBox = () => {
    console.log("test-check");
    isCheck ? setIsCheck(false) : setIsCheck(true);
    if (isCheck) {
      loginCookie.remove("rememberEmail");
    }
  };

  const handleGoSignup = () => {
    // e.preventDefault();
    navigate("/signup");
  };

  // 로그인 data
  const [browserName, setBrowserName] = useState("");
  useEffect(() => {
    if (deviceDetect().isBrowser) {
      setBrowserName("PC");
    } else if (deviceDetect().isMobile) {
      setBrowserName("MOBILE");
    }
  }, [browserName]);

  const loginData = {
    deviceInfo: {
      deviceId: "Non empty string",
      deviceType: "DEVICE_TYPE_" + browserName,
      notificationToken: "Non empty string",
    },
    email: email,
    password: password,
  };

  // 로그인 요청
  // 로그인 > 기존 정보 지우기 >me > project
  const requestLogin = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem("recoil-persist");
    instanceAxios.defaults.headers.common["Authorization"] = null;
    setAlertCode(0);
    try {
      const response = await instanceAxios.post("/auth/login", loginData);
      if (response.status === 200) {
        const refreshToken = response.data.refreshToken;
        const accessToken = response.data.accessToken;
        const tokenType = response.data.tokenType;
        const headersToken = tokenType + accessToken;
        setRefreshTokenToCookie(refreshToken);
        setAccessTokenToCookie(headersToken);
        setAlertCode(0);
        const getCategory = async () => {
          try {
            const response = await instanceAxios.get("/category/all");
            setMyCategory(response.data);
            // console.log(myCategory, "🍓");
          } catch (err) {
            console.error(err);
          }
        };
        instanceAxios.defaults.headers.common["Authorization"] = headersToken;
        const checkAccount = async () => {
          try {
            const response = await instanceAxios.post("/member/me");
            if (response.status === 200) {
              if (isCheck) {
                setRememberEmail(email);
              }
              setMyProfile(response.data);
              const checkProject = async () => {
                try {
                  const response = await instanceAxios.get("/all");
                  if (response.status === 200) {
                    setMyProject(response.data);
                    if (
                      response.data.filter((item) => item.expiryDate === null)
                        .length > 0
                    ) {
                      setMyPushProject(
                        response.data.filter(
                          (item) => item.expiryDate === null
                        )[0]
                      );
                    } else {
                      setMyPushProject(response.data[0]);
                    }
                  }
                } catch (err) {
                  // login yet
                  console.error(err);
                }
              };
              checkProject();
            }
          } catch (err) {
            // login yet
            navigate("/");
            console.error(err);
          }
        };
        getCategory();
        checkAccount();
        navigate("/dashboard");
        console.log(response);
      }
    } catch (err) {
      const cookies = new Cookies();
      cookies.remove("refreshToken");
      cookies.remove("accessToken");
      //window.location.reload();
      console.error(err);
      console.error("실패");
    }
  };
  return (
    <Section>
      <ImageSection>
        <MainImage src={mainImage} alt="메인이미지" />
      </ImageSection>
      <InputSection>
        <h1 className="ir">회원가입</h1>
        <LoginBox>
          <WrapLogo>
            <>Welcome to</>
            <Logo src={logo} alt="메인로고" />
          </WrapLogo>
          <WrapContents>
            <form action="post">
              <IDInputWrap>
                <SubTitle>이메일</SubTitle>
                <InputGroup
                  setValue={setEmail}
                  value={email}
                  type="text"
                  placeholder="이메일을 입력하세요"
                />
              </IDInputWrap>
              <PwdInputWrap>
                <SubTitle>비밀번호</SubTitle>
                <InputGroup
                  setValue={setPassword}
                  isKeyDown={handleCheckCapsLock}
                  value={password}
                  last
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                />
                {iscapslock && (
                  <LabelWarning>Caps Lock이 켜져있습니다!</LabelWarning>
                )}
              </PwdInputWrap>
              <RadioList>
                <RadioLi>
                  {!isCheck && (
                    <RememberEmail
                      type="text"
                      readOnly
                      checked={isCheck}
                      onClick={handleCheckBox}
                    />
                    // <img src={inActiveCheck} alt="아이디저장하기 체크 아이콘"  />
                  )}
                  {isCheck && (
                    <RememberEmail
                      active
                      type="text"
                      readOnly
                      checked={isCheck}
                      onClick={handleCheckBox}
                    />
                    // <img src={activeCheck} alt="아이디저장하기 체크 아이콘" />
                  )}
                  이메일 저장
                </RadioLi>
                <WrapFindAuth>
                  <li>
                    <LinkStyle to="/findEmail">이메일 찾기</LinkStyle>
                  </li>
                  <li>|</li>
                  <li>
                    <LinkStyle to="/findPassword">비밀번호 찾기</LinkStyle>
                  </li>
                </WrapFindAuth>
              </RadioList>

              {(!email || !password) && (
                <BeforeLoginButton>로그인</BeforeLoginButton>
              )}
              {email && password && (
                <LoginButton type="submit" requestLogin={requestLogin}>
                  로그인
                </LoginButton>
              )}
            </form>
            <ButtonWrap>
              <GoSignupButton handleGoSignup={handleGoSignup}>
                회원가입
              </GoSignupButton>
            </ButtonWrap>
          </WrapContents>
        </LoginBox>
      </InputSection>
      {/* alert */}
      {isAlertOpen && <AlertModal></AlertModal>}
      {isLogoutOpen && <LogoutMadal></LogoutMadal>}
      {isLogoutOpen && <NewpasswordMadal></NewpasswordMadal>}
      {/* alert */}
    </Section>
  );
}
