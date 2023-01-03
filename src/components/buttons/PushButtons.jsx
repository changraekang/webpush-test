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
  font-size: ${BUTTON_SIZE};
  border-radius: 8px;
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
const ImageButton = styled.button`
  display: block;
  border: none;
  width: 225px;
  padding: 10px;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: ${BUTTON_SIZE};
  border-radius: 8px;
  color: ${ACTIVE_BUTTON_COLOR};
  border: 1px solid ${NORMAL_BUTTON_BORDER_COLOR};

  &:hover {
    background-color: ${ACTIVE_BUTTON_COLOR};
    color: ${INACTIVE_BUTTON_FONT_COLOR};
  }
`;

// DM 발송
function ActivePushButton({ children, handleSubmit }) {
  return (
    <Button onClick={handleSubmit} active>
      {children}
    </Button>
  );
}

function InactivePushButton({ children }) {
  return <Button inactive>{children}</Button>;
}

// 이미지 등록
function RegisterImageButton({ children, handleUploadImage }) {
  return <ImageButton onClick={handleUploadImage}>{children}</ImageButton>;
}

export { ActivePushButton, InactivePushButton, RegisterImageButton };
