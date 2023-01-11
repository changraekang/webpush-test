import styled from "styled-components";
import { grey1 } from "../../../constants/color";

const Box = styled.div`
  background: ${grey1};
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
