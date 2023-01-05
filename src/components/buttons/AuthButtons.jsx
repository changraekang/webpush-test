import styled from "styled-components";
import {
  ACTIVE_BUTTON_COLOR,
  ACTIVE_BUTTON_FONT_COLOR,
  INACTIVE_BUTTON_COLOR,
  INACTIVE_BUTTON_FONT_COLOR,
  NORMAL_BUTTON_COLOR,
  NORMAL_BUTTON_FONT_COLOR,
  NORMAL_BUTTON_BORDER_COLOR,
} from "../../constants/color";
import {
  BUTTON_SIZE,
  CERTIFICATION_BUTTON_SIZE,
} from "../../constants/fontSize";

const Button = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 32px;
  font-size: ${(props) =>
    props.certificate ? `${CERTIFICATION_BUTTON_SIZE}` : `${BUTTON_SIZE}`};
  background: ${(props) => (props.normal ? `${NORMAL_BUTTON_COLOR}` : null)};
  background: ${(props) => (props.active ? `${ACTIVE_BUTTON_COLOR}` : null)};
  background: ${(props) =>
    props.inactive ? `${INACTIVE_BUTTON_COLOR}` : null};
  color: ${(props) => (props.normal ? `${NORMAL_BUTTON_FONT_COLOR}` : null)};
  color: ${(props) => (props.active ? `${ACTIVE_BUTTON_FONT_COLOR}` : null)};
  color: ${(props) =>
    props.inactive ? `${INACTIVE_BUTTON_FONT_COLOR}` : null};
  border: 1px solid
    ${(props) => (props.normal ? `${NORMAL_BUTTON_BORDER_COLOR}` : "none")};

  &:hover {
  }
`;
//로그인 유효성 통과 전
function LoginButton({ children, requestLogin }) {
  return (
    <Button active onClick={requestLogin}>
      {children}
    </Button>
  );
}

// 로그인 유효성 검사 통과 후
function BeforeLoginButton({ children }) {
  return <Button inactive>{children}</Button>;
}

// 로그인 -> 회원가입
function GoSignupButton({ children, handleGoSignup }) {
  return (
    <Button normal onClick={handleGoSignup}>
      {children}
    </Button>
  );
}

// 회원가입 작성 중
function SignupButton({ children, requestRegister }) {
  return (
    <Button style={{ marginTop: "55px" }} active onClick={requestRegister}>
      {children}
    </Button>
  );
}

// 회원 가입 완료
function BeforeSignupButton({ children }) {
  return (
    <Button style={{ marginTop: "55px" }} disabled inactive>
      {children}
    </Button>
  );
}

// 이메일 인증
function CertificationButton({ children, requestToken }) {
  return (
    <Button
      onClick={requestToken}
      certificate
      active
      style={{ width: "190px" }}
    >
      {children}
    </Button>
  );
}

// 이메일 비인증
function UnCertificationButton({ children }) {
  return (
    <Button disabled certificate inactive style={{ width: "190px" }}>
      {children}
    </Button>
  );
}

// 토큰 넣고 인증
function ActiveTokenButton({ children, requestCompleteToken }) {
  return (
    <Button
      type="submit"
      onClick={requestCompleteToken}
      certificate
      active
      style={{ width: "105px" }}
    >
      {children}
    </Button>
  );
}

// 토큰 넣기 전
function InactiveTokenButton({ children }) {
  return (
    <Button disabled certificate inactive style={{ width: "105px" }}>
      {children}
    </Button>
  );
}

export {
  ActiveTokenButton,
  InactiveTokenButton,
  LoginButton,
  BeforeLoginButton,
  SignupButton,
  BeforeSignupButton,
  GoSignupButton,
  CertificationButton,
  UnCertificationButton,
};
