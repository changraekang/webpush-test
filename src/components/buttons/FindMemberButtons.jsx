import styled from "styled-components";
import {
  primary4,
  grey1,
  grey3,
  grey5,
} from "../../constants/color";

const Button = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: 16px;
  cursor: pointer;
  border-radius: 32px;
  margin-top: 32px;
  background: ${(props) => (props.normal ? `${grey1}` : null)};
  background: ${(props) => (props.active ? `${primary4}` : null)};
  background: ${(props) =>
    props.inactive ? `${grey3}` : null};
  color: ${(props) => (props.normal ? `${primary4}` : null)};
  color: ${(props) => (props.active ? `${grey1}` : null)};
  color: ${(props) =>
    props.inactive ? `${grey5}` : null};
  border: 1px solid
    ${(props) => (props.normal ? `${primary4}` : "none")};
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  &:hover {
  }
`;

// 비밀번호 찾기(링크 발송 버튼)
function ActiveFindPasswordButton({ children, requestFind }) {
  return (
    <Button active onClick={requestFind}>
      {children}
    </Button>
  );
}

function InactiveFindPasswordButton({ children }) {
  return (
    <Button inactive disabled>
      {children}
    </Button>
  );
}

// 링크 발송 후 로그인 하러 가기
function GoLoginPage({ children, handleGoLogin }) {
  return (
    <Button active onClick={handleGoLogin}>
      {children}
    </Button>
  );
}

// 비밀번호 변경하기 버튼
function ActiveSetNewasswordButton({ children }) {
  return <Button active>{children}</Button>;
}

function InactiveSetNewPasswordButton({ children }) {
  return (
    <Button inactive disabled>
      {children}
    </Button>
  );
}

// 이메일 찾기
function ActiveFindEmailButton({ children }) {
  return <Button active>{children}</Button>;
}

function InactiveFindEmailButton({ children }) {
  return (
    <Button inactive disabled>
      {children}
    </Button>
  );
}

export {
  ActiveFindPasswordButton,
  InactiveFindPasswordButton,
  ActiveFindEmailButton,
  InactiveFindEmailButton,
  GoLoginPage,
  ActiveSetNewasswordButton,
  InactiveSetNewPasswordButton,
};
