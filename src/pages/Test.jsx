import React from "react";
import styled from "styled-components";
import { ACTIVE_BUTTON_COLOR } from "../constants/color";
import { AuthList } from "../atom/test";
import { instanceAxios } from "../api/axios";
const TestWapper = styled.div`
  display: flex;
  width: 155px;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const TestButtonWapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const TestFlex = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-bottom: 10px;
  align-items: center;
  font-family: sans-serif;
`;
const TestExplainFlex = styled.div`
  width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 10px;
  font-family: sans-serif;
  font-weight: bold;
  color: red;
`;
const TestTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;
  font-family: sans-serif;
  font-size: x-large;
  font-weight: bold;
`;
const TestButton = styled.button`
  width: 155px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.875rem;
  background-color: ${ACTIVE_BUTTON_COLOR};
  cursor: pointer;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  border-radius: 8px;
  border: none;
`;
const Test = () => {
  const onClickAuth = async (title) => {
    console.log(title, "주소");
    let data = "";
    try {
      const response = await instanceAxios.post(`/auth/${title}`, data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TestTitle>TEST PAGE</TestTitle>
      {AuthList.map(({ title, explain }) => {
        return (
          <TestWapper key={explain}>
            <TestButtonWapper>
              <TestButton onClick={() => onClickAuth(title)}>Auth</TestButton>
              <TestFlex>{title}</TestFlex>
            </TestButtonWapper>
            <TestFlex>{explain}</TestFlex>
            <TestExplainFlex>결과</TestExplainFlex>
          </TestWapper>
        );
      })}
    </>
  );
};

export default Test;
