import React from "react";
import styled from "styled-components";
import loadinggif from "../../assets/images/loading.gif";
import { primary2, primary4, primary6 } from "../../constants/color";
const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  display: flex;
  color: ${primary6};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard-Regular";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

export default function Loading() {
  return (
    <Wrapper>
      <img src={loadinggif} style={{ width: 150 }} alt="Loading" />
      <br></br>
      <br></br>loading...
    </Wrapper>
  );
}
