import styled from "styled-components";
import { grey1 } from "../../../constants/color";

const Box = styled.div`
  padding: 32px;
  width: 300px;
  height: 160px;
  border-radius: 16px;
  background-color: ${grey1};
  box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.06);
`;
const DemoShowBox = styled.div`
  padding: 32px;
  width: 100%;
  display: flex;
  margin-left: 25px;
  margin-right: 25px;
  border-radius: 16px;
  box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.06);
`;

export function BoardWrapBox({ children }) {
  return <Box>{children}</Box>;
}
export function BoardBox({ children }) {
  return <DemoShowBox>{children}</DemoShowBox>;
}
