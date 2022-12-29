import styled from "styled-components";

const Box = styled.div`
  padding: 32px;
  width: 100%;
  margin: 10px;
  border: 1px solid #afafaf;
  border-radius: 16px;
`;

export default function PushBox({ children }) {
  return <Box>{children}</Box>;
}
