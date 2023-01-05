import styled from "styled-components";
import AuthBox from "../../components/containers/auth/AuthBox";
import {
  MAIN_BACKGROUND_COLOR,
  AUTH_LABEL_COLOR,
  ACTIVE_INPUT_BORDER_COLOR,
  INACTIVE_INPUT_BORDER_COLOR,
  INACTIVE_INPUT_FONT_COLOR,
  INACTIVE_INPUT_COLOR,
  NORMAL_BUTTON_BORDER_COLOR,
  NORMAL_BUTTON_COLOR,
  NORMAL_BUTTON_FONT_COLOR,
  MAIN_FONT_COLOR,
} from "../../constants/color";
import {
  AUTH_RADIO_SIZE,
  BUTTON_SIZE,
  MAIN_TITLE_SIZE,
} from "../../constants/fontSize";
import logo from "../../assets/images/logo.png";
import mainImage from "../../assets/images/mainpage.png";
import {
  LoginButton,
  BeforeLoginButton,
  GoSignupButton,
} from "../../components/buttons/AuthButtons";
import activeCheck from "../../assets/images/active-radio.png";
import inActiveCheck from "../../assets/images/inactive-radio.png";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { deviceDetect, mobileModel, osName } from "react-device-detect";
import { instanceAxios } from "../../api/axios";
import {
  setAccessTokenToCookie,
  setRefreshTokenToCookie,
} from "../../cookie/controlCookie";

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
  font-size: ${MAIN_TITLE_SIZE};
  color: ${MAIN_FONT_COLOR};
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
  margin-top: 8px;
`;

const IDInputWrap = styled.div`
  width: 399px;
  height: 82px;
`;

const PwdInputWrap = styled.div`
  width: 399px;
  height: 82px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
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

const RadioList = styled.ul`
  display: flex;
  margin: 0 0 32px;
  justify-content: space-between;
  align-items: center;
  font-size: ${AUTH_RADIO_SIZE};
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
  color: ${AUTH_LABEL_COLOR};
`;

//--------------로그인 페이지--------------------------
export default function Login() {
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  const handleCheckRadio = () => {
    isCheck ? setIsCheck(false) : setIsCheck(true);
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
  const requestLogin = async (e) => {
    e.preventDefault();
    console.log("login", loginData);
    try {
      const response = await instanceAxios.post("/auth/login", loginData);
      if (response.status === 200) {
        const refreshToken = response.data.refreshToken;
        const accessToken = response.data.accessToken;
        const tokenType = response.data.tokenType;
        const headersToken = tokenType + accessToken;
        setAccessTokenToCookie(headersToken);
        setRefreshTokenToCookie(refreshToken);
        instanceAxios.defaults.headers.common["Authorization"] = headersToken;
        navigate("/makepush");
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Section>
      <ImageSection>
        <MainImage src={mainImage} alt="메인이미지" />
      </ImageSection>

      <InputSection>
        <h1 className="ir">회원가입</h1>
        <AuthBox>
          <WrapLogo>
            <>Welcome to</>
            <Logo src={logo} alt="메인로고" />
          </WrapLogo>
          <WrapContents>
            <form action="post">
              <IDInputWrap>
                <SubTitle>아이디</SubTitle>
                <Input
                  onChange={handleInputValues}
                  name="email"
                  type="text"
                  placeholder="이메일을 입력하세요"
                />
              </IDInputWrap>
              <PwdInputWrap>
                <SubTitle>비밀번호</SubTitle>
                <Input
                  onChange={handleInputValues}
                  name="password"
                  last
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                />
              </PwdInputWrap>
              <RadioList>
                <RadioLi onClick={handleCheckRadio}>
                  {!isCheck && (
                    <img src={inActiveCheck} alt="아이디저장하기 체크 아이콘" />
                  )}
                  {isCheck && (
                    <img src={activeCheck} alt="아이디저장하기 체크 아이콘" />
                  )}
                  아이디 저장
                </RadioLi>
                <WrapFindAuth>
                  <li>
                    <LinkStyle to="/findEmail">아아디 찾기</LinkStyle>
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
        </AuthBox>
      </InputSection>
    </Section>
  );
}
