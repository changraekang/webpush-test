import styled from "styled-components";
import { grey1 } from "../../../constants/color";

const Box = styled.div`
  background: ${grey1};
  box-shadow: ${(props) => (props.signup ? "0px 4px 16px rgba(0, 0, 0, 0.08);" : "none")};
  padding: 60px;
`;

function SignupBox({ children }) {
  return <Box signup>{children}</Box>;
}

function LoginBox({ children }) {
  return <Box>{children}</Box>;
}

export {SignupBox, LoginBox}