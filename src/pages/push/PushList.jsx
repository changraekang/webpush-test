import React from "react";
import Layout from "../../templates/Layout";
import styled from "styled-components";
import fox from "../../assets/images/fox.png";
import { grey3 } from "../../constants/color";
const PageWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 40px;
  background-color: ${grey3};
  height: 100vh;
`;
const Fox = styled.img`
  width: 150px;
  height: 150px;
`;
const Title = styled.p`
  font-size: large;
  font-weight: bold;
`;
const PushList = () => {
  return (
    <Layout>
      <PageWrapper>
        <Title>안녕!</Title>
        <Fox src={fox} />
      </PageWrapper>
    </Layout>
  );
};

export default PushList;
