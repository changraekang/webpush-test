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
  font-size: 24px;
  border-radius: 8px;
  background: ${(props) => (props.normal ? `${grey1}` : null)};
  background: ${(props) => (props.active ? `${primary4}` : null)};
  background: ${(props) =>
    props.inactive ? `${grey3}` : null};
  color: ${(props) => (props.normal ? `${primary4}` : null)};
  color: ${(props) => (props.active ? `${grey1}` : null)};
  color: ${(props) =>
    props.inactive ? `${grey1}` : null};
  border: 1px solid
    ${(props) => (props.normal ? `${primary4}` : "none")};

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
  font-size: 24px;
  border-radius: 8px;
  color: ${primary4};
  border: 1px solid ${primary4};

  &:hover {
    background-color: ${primary4};
    color: ${grey5};
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
  return (
    <Button inactive disabled>
      {children}
    </Button>
  );
}

// 이미지 등록
function RegisterImageButton({ children, handleUploadImage }) {
  return <ImageButton onClick={handleUploadImage}>{children}</ImageButton>;
}

export { ActivePushButton, InactivePushButton, RegisterImageButton };
