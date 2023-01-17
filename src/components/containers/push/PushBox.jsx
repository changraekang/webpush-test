import styled from "styled-components";
import { grey1 } from "../../../constants/color";

const Box = styled.div`
  padding: 32px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #afafaf;
  border-radius: 16px;
`;
const ListBox = styled.div`
  padding: 32px;
  background-color: ${grey1};
  width: 100%;
  margin: 10px;
  border: 1px solid #afafaf;
  border-radius: 16px;
`;

export function PushBox({ children }) {
  return <Box>{children}</Box>;
}
export function PushListBoxs({ children }) {
  return <ListBox>{children}</ListBox>;
}
