import styled from "styled-components";
import { MAIN_BOX_COLOR } from "../../../constants/color";

const Box = styled.div`
  width: 399px;
  height: 649px;
`;

export default function AuthBox({ children }) {
  return <Box>{children}</Box>;
}
