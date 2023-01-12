import React from "react";
import { BoardWrapBox } from "../components/containers/dashboard/BoardBox";
import Layout from "../templates/Layout";
import styled from "styled-components";
import { grey3 } from "../constants/color";
const PageWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 40px;
  background-color: ${grey3};
  height: 100vh;
`;
const DashBoard = () => {
  return (
    <Layout>
      <PageWrapper>
        <BoardWrapBox>전체 발송량</BoardWrapBox>
        <BoardWrapBox>발송중</BoardWrapBox>
        <BoardWrapBox>발송 완료</BoardWrapBox>
      </PageWrapper>
    </Layout>
  );
};

export default DashBoard;
