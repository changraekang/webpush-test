import styled from "styled-components";
import { primary4, grey1, grey3, grey5 } from "../../constants/color";

const Button = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: ${(props) => (props.certificate ? "10px" : " 12px")};
  cursor: pointer;
  border-radius: 32px;
  font-size: ${(props) => (props.certificate ? `16px` : null)};
  font-size: ${(props) => (props.token ? `14px` : null)};
  background: ${(props) => (props.normal ? `${grey1}` : null)};
  background: ${(props) => (props.active ? `${primary4}` : null)};
  background: ${(props) => (props.inactive ? `${grey3}` : null)};
  color: ${(props) => (props.normal ? `${primary4}` : null)};
  color: ${(props) => (props.active ? `${grey1}` : null)};
  color: ${(props) => (props.inactive ? `${grey5}` : null)};
  border: 1px solid ${(props) => (props.normal ? `${primary4}` : "none")};
  border: 1px solid ${(props) => (props.inactive ? `${grey5}` : "none")};
  cursor: ${(props) => (props.inactive ? `default` : null)};
  &:hover {
  }
`;

// 회원가입 작성 중
function SignupButton({ children, requestRegister }) {
  return (
    <Button
      style={{ marginTop: "55px", width: "200px", margin: "44px auto 0" }}
      active
      onClick={requestRegister}
    >
      {children}
    </Button>
  );
}

// 회원 가입 완료
function BeforeSignupButton({ children }) {
  return (
    <Button
      style={{ marginTop: "55px", width: "200px", margin: "44px auto 0" }}
      disabled
      inactive
    >
      {children}
    </Button>
  );
}

// 이메일 인증
function CertificationButton({ children, requestToken }) {
  return (
    <Button onClick={requestToken} certificate normal>
      {children}
    </Button>
  );
}

// 이메일 비인증
function UnCertificationButton({ children }) {
  return (
    <Button disabled certificate inactive>
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
      token
      active
      style={{ width: "100px" }}
    >
      {children}
    </Button>
  );
}

// 토큰 넣기 전
function InactiveTokenButton({ children }) {
  return (
    <Button disabled token inactive style={{ width: "100px" }}>
      {children}
    </Button>
  );
}

export {
  SignupButton,
  BeforeSignupButton,
  CertificationButton,
  UnCertificationButton,
  ActiveTokenButton,
  InactiveTokenButton,
};
