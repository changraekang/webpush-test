import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { instanceAxios } from "../../api/axios";
import {
  grey11,
  grey1,
  grey2,
  primary4,
  grey5,
  grey3,
  grey6,
  primary3,
} from "../../constants/color";
import { getCookie } from "../../cookie/controlCookie";
import { InputGroup } from "../inputs/InputGroups";

const Wrapper = styled.div`
  position: fixed;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  display: flex;
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

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${grey1};
  width: 560px;
  height: 544px;
`;

const Title = styled.h2`
  color: ${grey11};
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 12px;
  align-items: center;
`;
const SubTitle = styled.h2`
  color: ${grey6};
  font-size: 12px;
  font-weight: 400;
  padding-bottom: 12px;
  align-items: center;
`;
const WrapContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CatContents = styled.div`
  width: 324px;
  display: flex;
  padding: 10px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${grey5};
  &:hover {
    border: 1px solid ${primary3};
  }
`;
const SelectCatContents = styled.div`
  width: 324px;
  display: flex;
  padding: 10px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${primary3};
  color: ${grey1};
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: "Pretendard-Regular";
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  width: 520px;
  height: 392px;
  padding: 16px 24px 16px 16px;
  pointer-events: auto;
  background-color: ${grey2};
  border-radius: 8px;
  outline: 0;
`;
const ProjectInputWrap = styled.div`
  width: 399px;
`;
const ButtonWrapper = styled.div`
  width: 520px;
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 36px;
  background: ${grey3};
  border: 1px solid ${grey5};
  border-radius: 32px;
  &:hover {
    background-color: ${primary4};
    color: ${grey1};
  }
`;
const ProjectModal = (props) => {
  const [step, setStep] = useState(1);
  const [homepage, setHomepage] = useState("");
  const [cat, setCat] = useState("");
  const [url, setUrl] = useState("");
  const [catArray, setCatArray] = useState([]);

  useEffect(() => {
  const checkCategory = async () => {
    try {
      const response = await instanceAxios.get("/category/all");
      if (response.status === 200) {
        const data = response.data;
        setCatArray(data);
      }
    } catch (err) {
      // login yet
      console.error(err);
    }
  };
    checkCategory();
  }, []);

  const handleClose = async () => {
    let body = {
      name: homepage,
      projectUrl: url,
      code: cat,
    };
    try {
      const response = await instanceAxios.post("/project/add", body);
      if (response.status === 200) {
        console.log(response);
        props.setClose(false);
      }
    } catch (err) {
      console.error(err);
      console.error("실패");
    }
  };
  const handleNext = () => {
    setStep(2);
  };
  const onClickCat = (cat) => {
    setCat(cat);
    console.log(cat);
  };
  const renderWriteCatModal = () => {
    return (
      <ModalWrapper>
        <>{step}</>
        <Title>홈페이지</Title>
        <SubTitle>DMPUSH를 사용할 홈페이지와 주소를 입력해주세요</SubTitle>
        <ModalContent>
          <WrapContents>
            <form action="post">
              <ProjectInputWrap>
                <SubTitle>홈페이지 명</SubTitle>
                <InputGroup
                  setValue={setHomepage}
                  value={homepage}
                  type="text"
                  placeholder="홈페이지명을 입력해주세요"
                />
              </ProjectInputWrap>
              <ProjectInputWrap>
                <SubTitle>홈페이지 URL</SubTitle>
                <InputGroup
                  setValue={setUrl}
                  value={url}
                  type="text"
                  placeholder="https://"
                />
              </ProjectInputWrap>
            </form>
          </WrapContents>
        </ModalContent>
      </ModalWrapper>
    );
  };
  const renderWriteUrlModal = () => {
    return (
      <ModalWrapper>
        <>{step}</>
        <Title>카테고리</Title>
        <SubTitle>운영중인 사이트의 카테고리를 선택해주세요</SubTitle>
        <ModalContent>
          <WrapContents>
            <form action="post">
              {catArray.map(({ name, code }) => {
                if (code === cat) {
                  return (
                    <SelectCatContents
                      key={code}
                      onClick={() => onClickCat(code)}
                    >
                      {" "}
                      {name}
                    </SelectCatContents>
                  );
                } else {
                  return (
                    <CatContents key={code} onClick={() => onClickCat(code)}>
                      {" "}
                      {name}
                    </CatContents>
                  );
                }
              })}
            </form>
          </WrapContents>
        </ModalContent>
      </ModalWrapper>
    );
  };
  return (
    <Wrapper>
      <Modal>
        {step === 1 ? renderWriteCatModal() : renderWriteUrlModal()}
        <ButtonWrapper>
          {step === 2 ? (
            <Button onClick={handleClose}> 시작하기</Button>
          ) : (
            <Button onClick={handleNext}>다음</Button>
          )}
        </ButtonWrapper>
      </Modal>
    </Wrapper>
  );
};

export default ProjectModal;
