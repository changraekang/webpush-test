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
} from "../../constants/color";
import { AUTH_RADIO_SIZE, BUTTON_SIZE } from "../../constants/fontSize";
import logo from "../../assets/images/logo.png";
import {
  LoginButton,
  BeforeLoginButton,
  GoSignupButton,
} from "../../components/buttons/AuthButtons";
import activeCheck from "../../assets/images/active-check.png";
import inActiveCheck from "../../assets/images/inactive-check.png";
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
  padding: 30px 0;
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
  background-color: ${MAIN_BACKGROUND_COLOR};
`;

const WrapLogo = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 258px;
  height: 74px;
`;

const WrapContents = styled.div`
  width: 437px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};
  margin-bottom: ${(props) => (props.last ? "32px" : "12px")};

  &:focus {
    border: 1px solid ${ACTIVE_INPUT_BORDER_COLOR};
  }

  &::placeholder {
    color: ${INACTIVE_INPUT_FONT_COLOR};
  }
`;

const RadioList = styled.ul`
  display: flex;
  margin: 14px 0 64px;
  justify-content: space-between;
  align-items: center;
  font-size: ${AUTH_RADIO_SIZE};
`;

const RadioLi = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const WrapFindAuth = styled.div`
  display: flex;
  gap: 16px;
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
      <h1 className="ir">회원가입</h1>
      <AuthBox>
        <WrapLogo>
          <Logo src={logo} alt="메인로고" />
        </WrapLogo>
        <WrapContents>
          <form action="post">
            <div>
              <Input
                onChange={handleInputValues}
                name="email"
                type="text"
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div>
              <Input
                onChange={handleInputValues}
                name="password"
                last
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            {(!email || !password) && (
              <BeforeLoginButton type="submit">로그인</BeforeLoginButton>
            )}
            {email && password && (
              <LoginButton type="submit" requestLogin={requestLogin}>
                로그인
              </LoginButton>
            )}
          </form>
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
              <li>
                <LinkStyle to="/findPassword">비밀번호 찾기</LinkStyle>
              </li>
            </WrapFindAuth>
          </RadioList>
          <GoSignupButton handleGoSignup={handleGoSignup}>
            회원가입
          </GoSignupButton>
        </WrapContents>
      </AuthBox>
    </Section>
  );
}
