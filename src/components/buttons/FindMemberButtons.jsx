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
import { BUTTON_SIZE } from "../../constants/fontSize";

const Button = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: 16px;
  cursor: pointer;
  border-radius: 32px;
  margin-top: 40px;
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
function ActiveFindEmailButton({ children, phoneSubmit }) {
  return (
    <Button active onClick={phoneSubmit}>
      {children}
    </Button>
  );
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
