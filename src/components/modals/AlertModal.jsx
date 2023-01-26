import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { instanceAxios } from "../../api/axios";
import { AlertCode, AlertMessage, IsAlertOpen } from "../../atom/Atom";
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
  z-index: 10;
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
  position: fixed;
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${grey1};
  width: 360px;
  padding: 40px 0;
  border-radius: 16px;
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
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 12px;
  align-items: center;
`;
const WrapContents = styled.div`
  width: 400px;
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
  width: 340px;
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
  position: relative;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 0 0;
  font-family: "Pretendard-Regular";
`;

const CloseModal = styled.p`
  position: absolute;
  right: 13px;
  top: -13px;
  width: 24px;
  height: 14px;
  cursor: pointer;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  padding: 16px 24px 16px 16px;
  pointer-events: auto;
  border-radius: 8px;
  outline: 0;
  margin-bottom: 24px;
`;
const ProjectInputWrap = styled.div`
  width: 399px;
  margin-top: 20px;
`;
const ButtonWrapper = styled.div`
  width: 520px;
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
`;
const Button = styled.div`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  color: ${primary4};
  background: ${grey1};
  border: 1px solid ${primary4};
  border-radius: 24px;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${primary4};
    color: ${grey1};
  }
`;
const AlertModal = () => {
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(IsAlertOpen);
  const [alertMessage, setAlertMessage] = useRecoilState(AlertMessage);
  const [alertCode, setAlertCode] = useRecoilState(AlertCode);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (alertCode === 1) {
      navigate("/");
    }
  };

  const renderCloseModal = () => {
    return (
      <Button
        onClick={() => {
          setIsAlertOpen(false);
          if (alertCode === 1) {
            navigate("/");
          }
        }}
      >
        닫기
      </Button>
    );
  };
  const renderModal = () => {
    return (
      <ModalWrapper>
        <ModalContent>
          <WrapContents>{alertMessage}</WrapContents>
        </ModalContent>
        {renderCloseModal()}
      </ModalWrapper>
    );
  };
  return (
    <Wrapper onClick={handleAlertClose}>
      <Modal onClick={(event) => event.stopPropagation()}>
        {renderModal()}
      </Modal>
    </Wrapper>
  );
};

export default AlertModal;
