import styled from "styled-components";
import { grey1 } from "../../../constants/color";

const Box = styled.div`
  background: ${grey1};
  padding: 40px 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function FindMemberBox({ children }) {
  return <Box>{children}</Box>;
}
