import styled from "styled-components";
import { MAIN_BOX_COLOR } from "../../../constants/color";

const Box = styled.div`
  background: ${MAIN_BOX_COLOR};
  padding: 40px 58px;
  display: flex;
  margin-top: 80px;
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
`;

export default function SetPasswordBox({ children }) {
  return <Box>{children}</Box>;
}
