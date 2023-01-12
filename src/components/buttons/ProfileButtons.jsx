import styled from "styled-components";
import { primary4, grey1, grey3, grey5 } from "../../constants/color";

const Button = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 32px;
  font-size: ${(props) => (props.certificate ? `14px` : `16px`)};
  background: ${(props) => (props.normal ? `${grey1}` : null)};
  background: ${(props) => (props.active ? `${primary4}` : null)};
  background: ${(props) => (props.inactive ? `${grey3}` : null)};
  color: ${(props) => (props.normal ? `${primary4}` : null)};
  color: ${(props) => (props.active ? `${grey1}` : null)};
  color: ${(props) => (props.inactive ? `${grey5}` : null)};
  border: 1px solid ${(props) => (props.normal ? `${primary4}` : "none")};
  cursor: ${(props) => (props.inactive ? `default` : null)};
  &:hover {
  }
`;
export function UpdateProfileBtn({children, updateMyInfo}) {
  return (
    <Button active onClick={updateMyInfo}>{children}</Button>
  )
}

export function UpdateInactiveProfileBtn({children}) {
  return (
    <Button inactive disabled>{children}</Button>
  )
}

export function UpdatePasswordBtn({children, updatePassword}) {
    return (
      <Button active onClick={updatePassword}>{children}</Button>
    )
}
