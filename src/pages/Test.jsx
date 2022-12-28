import React, { useState } from "react";
import styled from "styled-components";
import {
  ACTIVE_BUTTON_COLOR,
  MAIN_COLOR,
  NAV_MY_MENU_COLOR,
  NAV_MY_MENU_LINE_COLOR,
} from "../constants/color";

import {
  AuthList,
  CategoryList,
  MemberList,
  MessageList,
  ProjectList,
} from "../atom/test";
import { instanceAxios } from "../api/axios";
import fox from "../assets/images/fox.png";
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
const TopWapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const TestButton = styled.button`
  width: 155px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.875rem;
  font-weight: 900;
  background-color: ${ACTIVE_BUTTON_COLOR};
  cursor: pointer;
  border-radius: 8px;
  border: none;
`;

const MyButton = styled.button`
  position: relative;
  display: flex;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  float: left;
  margin-left: 5px;
  padding: 15px;
  cursor: pointer;
  font-weight: 900;
  &:hover {
    background: ${MAIN_COLOR};
    border-radius: 8px;
  }
`;

const Test = () => {
  const [openAuthMenu, setOpenAuthMenu] = useState(true);
  const [openMemberMenu, setOpenMemberMenu] = useState(true);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(true);
  const [openProjectMenu, setOpenProjectMenu] = useState(true);
  const [openMessageMenu, setOpenMessageMenu] = useState(true);
  const [error, setError] = useState("");
  const [success, setSucces] = useState([]);
  const [title2, setTitle] = useState("");
  const [path2, setPath] = useState("");
  const handleOpenAuthMenu = () => {
    setOpenCategoryMenu(true);
    setOpenMemberMenu(true);
    setOpenMessageMenu(true);
    setOpenProjectMenu(true);
    !openAuthMenu ? setOpenAuthMenu(true) : setOpenAuthMenu(false);
  };
  const handleOpenMemberMenu = () => {
    setOpenCategoryMenu(true);
    setOpenMessageMenu(true);
    setOpenProjectMenu(true);
    setOpenAuthMenu(true);
    !openMemberMenu ? setOpenMemberMenu(true) : setOpenMemberMenu(false);
  };
  const handleOpenCategoryMenu = () => {
    setOpenMemberMenu(true);
    setOpenMessageMenu(true);
    setOpenProjectMenu(true);
    setOpenAuthMenu(true);
    !openCategoryMenu ? setOpenCategoryMenu(true) : setOpenCategoryMenu(false);
  };
  const handleOpenProjectMenu = () => {
    setOpenCategoryMenu(true);
    setOpenMemberMenu(true);
    setOpenMessageMenu(true);
    setOpenAuthMenu(true);
    !openProjectMenu ? setOpenProjectMenu(true) : setOpenProjectMenu(false);
  };
  const handleOpenMessageMenu = () => {
    setOpenCategoryMenu(true);
    setOpenMemberMenu(true);
    setOpenProjectMenu(true);
    setOpenAuthMenu(true);
    !openMessageMenu ? setOpenMessageMenu(true) : setOpenMessageMenu(false);
  };
  const onClickAuth = async (title, path) => {
    setTitle(title);
    setPath(path);
    setError("");
    setSucces([]);
    let data = {
      company: "필수",
      confirmPassword: "asd!1234",
      email: "444@naver.com",
      name: "강창래3",
      password: "asd!1234",
      phone: "010-4911-4073",
      token: "18073768",
    };
    /**
    let data = {
      email: "stork_kcr@naver.com",
      token: "74516212",
    };
    */

    try {
      if (path === "POST") {
        const response = await instanceAxios.post(`/auth/${title}`, data);
        console.log(response, "응답");
        let suc = JSON.stringify(response.data);
        setSucces(suc);
      } else {
        const response = await instanceAxios.get(`/auth/${title}`, data);
        console.log(response, "응답");
        let suc = JSON.stringify(response.data);
        setSucces(suc);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const onClickMember = async (title, path) => {
    setTitle(title);
    setPath(path);
    setError("");
    setSucces([]);
    let data = "";
    try {
      if (path === "POST") {
        const response = await instanceAxios.post(`/member/${title}`, data);
        console.log(response);
        let suc = JSON.stringify(response.data);
        setSucces(suc);
      } else if (path === "GET") {
        const response = await instanceAxios.get(`/member/${title}`, data);
        console.log(response);
        let suc = JSON.stringify(response.data);
        setSucces(suc);
      } else {
        const response = await instanceAxios.put(`/member/${title}`, data);
        console.log(response);
        let suc = JSON.stringify(response.data);
        setSucces(suc);
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  const onClickCategory = async (title, path) => {
    setTitle(title);
    setPath(path);
    setError("");
    setSucces([]);
    let api = title.replace("{id}", "1");
    let data = "";
    try {
      if (path === "POST") {
        const response = await instanceAxios.post(`/category/${api}`, data);
        let suc = JSON.stringify(response.data);
        setSucces(suc);
        console.log(response);
      } else if (path === "DELETE") {
        const response = await instanceAxios.delete(`/category/${api}`, data);
        console.log(response);
        let suc = JSON.stringify(response.data);
        setSucces(suc);
      } else if (path === "GET") {
        const response = await instanceAxios.get(`/category/${api}`, data);
        let suc = JSON.stringify(response.data);
        setSucces(suc);
        console.log(response);
      } else {
        const response = await instanceAxios.put(`/category/${api}`, data);
        let suc = JSON.stringify(response.data);
        setSucces(suc);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const onClickProject = async (title, path) => {
    setTitle(title);
    setPath(path);
    setError("");
    setSucces([]);
    let api = title.replace("{id}", "1");
    let data = "";
    try {
      const response = await instanceAxios.post(`/project/${api}`, data);
      console.log(response);
      let suc = JSON.stringify(response.data);
      setSucces(suc);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const onClickMessage = async (title, path) => {
    setTitle(title);
    setPath(path);
    setError("");
    setSucces([]);
    let data = "";
    try {
      const response = await instanceAxios.post(`/message/${title}`, data);
      let suc = JSON.stringify(response.data);
      setSucces(suc);
      console.log(response);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <>
      <TestTitle>
        TEST PAGE <img height="84px" src={fox}></img>
      </TestTitle>
      <TestWapper>
        <TopWapper>
          <MyButton onClick={handleOpenAuthMenu}>Auth</MyButton>
          <MyButton onClick={handleOpenCategoryMenu}>Category</MyButton>
          <MyButton onClick={handleOpenMemberMenu}>Member</MyButton>
          <MyButton onClick={handleOpenProjectMenu}>Project</MyButton>
          <MyButton onClick={handleOpenMessageMenu}>Mesaage</MyButton>
        </TopWapper>
        {openAuthMenu
          ? null
          : AuthList.map(({ title, explain, path }) => {
              if (title === title2) {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickAuth(title, path)}>
                        Auth
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>
                      결과: {error} {success}{" "}
                    </TestExplainFlex>
                  </TestWapper>
                );
              } else {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickAuth(title, path)}>
                        Auth
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>결과: </TestExplainFlex>
                  </TestWapper>
                );
              }
            })}
        {openMemberMenu
          ? null
          : MemberList.map(({ title, explain, path }) => {
              if (title2 === title && path2 === path) {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickMember(title, path)}>
                        Member
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>
                      결과: {error} {success}{" "}
                    </TestExplainFlex>
                  </TestWapper>
                );
              } else {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickMember(title, path)}>
                        Member
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>결과: </TestExplainFlex>
                  </TestWapper>
                );
              }
            })}
        {openCategoryMenu
          ? null
          : CategoryList.map(({ title, explain, path }) => {
              if (title === title2 && path2 === path) {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickCategory(title, path)}>
                        Category
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>
                      결과: {error} {success}
                    </TestExplainFlex>
                  </TestWapper>
                );
              } else {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickCategory(title, path)}>
                        Category
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>결과: </TestExplainFlex>
                  </TestWapper>
                );
              }
            })}
        {openMessageMenu
          ? null
          : MessageList.map(({ title, explain, path }) => {
              if (title === title2 && path2 === path) {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickMessage(title, path)}>
                        Message
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>
                      결과: {error} {success}{" "}
                    </TestExplainFlex>
                  </TestWapper>
                );
              } else {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickMessage(title, path)}>
                        Message
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>결과: </TestExplainFlex>
                  </TestWapper>
                );
              }
            })}
        {openProjectMenu
          ? null
          : ProjectList.map(({ title, explain, path }) => {
              if (title === title2 && path2 === path) {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickProject(title, path)}>
                        Project
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>
                      결과: {error} {success}{" "}
                    </TestExplainFlex>
                  </TestWapper>
                );
              } else {
                return (
                  <TestWapper key={explain}>
                    <TestButtonWapper>
                      <TestButton onClick={() => onClickProject(title, path)}>
                        Project
                      </TestButton>
                      <TestFlex>{title}</TestFlex>
                    </TestButtonWapper>
                    <TestFlex>{explain}</TestFlex>
                    <TestExplainFlex>결과: </TestExplainFlex>
                  </TestWapper>
                );
              }
            })}
      </TestWapper>
    </>
  );
};

export default Test;
