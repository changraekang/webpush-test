import styled from "styled-components";
import {
  primary4,
  grey1,
  grey3,
  grey5,
  grey10,
  grey6,
} from "../../constants/color";

const Button = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: ${(props) => (props.homepage ? "6px 10px " : "12px 16px")};
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

const DeleteButton = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: ${(props) => (props.homepage ? "6px 10px " : "12px 16px")};
  cursor: pointer;
  border-radius: 32px;
  font-size: ${(props) => (props.certificate ? `14px` : `16px`)};
  background: ${(props) => (props.normal ? `${grey1}` : null)};
  background: ${(props) => (props.active ? `${grey10}` : `${grey3}`)};
  background: ${(props) => (props.inactive ? `${grey6}` : null)};
  color: ${(props) => (props.normal ? `${primary4}` : null)};
  color: ${(props) => (props.active ? `${grey1}` : null)};
  color: ${(props) => (props.inactive ? `${grey5}` : null)};
  border: 1px solid ${(props) => (props.normal ? `${primary4}` : "none")};
  cursor: ${(props) => (props.inactive ? `default` : null)};
  &:hover {
  }
`;

const HomepageBtn = styled.button`
  display: block;
  border-radius: 30px;
  background-color: ${primary4};
  color: ${grey1};
  padding: 6px 8px;
`;

export function SelectHomepage({ children, setValue }) {
  return (
    <Button homepage normal onClick={setValue}>
      {children}
    </Button>
  );
}
export function SelectedHomepage({ children, setValue }) {
  return (
    <Button homepage active onClick={setValue}>
      {children}
    </Button>
  );
}

export function DeleteHomepage({ children, setValue }) {
  return (
    <DeleteButton homepage normal onClick={setValue}>
      {children}
    </DeleteButton>
  );
}
export function DeleteSelectedHomepage({ children, setValue }) {
  return (
    <DeleteButton homepage active onClick={setValue}>
      {children}
    </DeleteButton>
  );
}

export function BeforeUpdateHomepage({ children }) {
  return (
    <Button inactive disabled>
      {children}
    </Button>
  );
}
export function AfterUpdateHomepage({ children, updateHomePage }) {
  return (
    <Button active onClick={updateHomePage}>
      {children}
    </Button>
  );
}

export function BeforeCopy({ children }) {
  return (
    <Button inactive disabled>
      {children}
    </Button>
  );
}

export function AfterCopy({ children, handleCopyScript }) {
  return (
    <Button active onClick={handleCopyScript}>
      {children}
    </Button>
  );
}
