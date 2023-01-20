import styled from "styled-components";

const Box = styled.div`
  padding: 32px;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
`;
const DemoShowBox = styled.div`
  width: 100%;
  margin-left: 0;
  box-shadow: 0px -3px 16px rgba(0, 0, 0, 0.25);
  /* display: flex; */
  /* gap: 20px; */
  /* padding: 32px; */
  border-radius: 8px;
`;

export function DemoWrapBox({ children }) {
  return <Box>{children}</Box>;
}
export function DemoBox({ children }) {
  return <DemoShowBox>{children}</DemoShowBox>;

}
