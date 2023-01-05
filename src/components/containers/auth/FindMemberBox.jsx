import styled from "styled-components";
import { MAIN_BOX_COLOR } from "../../../constants/color";

const Box = styled.div`
  background: ${MAIN_BOX_COLOR};
  padding: 40px 58px;
`;

export default function FindMemberBox({ children }) {
  return <Box>{children}</Box>;
}
