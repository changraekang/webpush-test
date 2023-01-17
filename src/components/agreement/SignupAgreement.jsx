import { useEffect, useState } from "react";
import styled from "styled-components";
import inActiveCheck from "../../assets/images/inactive-radio.png";
import activeCheck from "../../assets/images/active-radio.png";
import { grey9 } from "../../constants/color";
import SignupArgeeModal from "../modals/SignupArgeeModal";

const DesingLine = styled.div`
  width: 100%;
  height: 1px;
  background: #afafaf;
  margin-bottom: 25px;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const InputAlign = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: ${(props) => (props.last ? "32px" : "12px")};
`;
const PaperButton = styled.button`
  width: 60px;
  height: 30px;
  color: ${grey9};
  display: flex;
  cursor: pointer;
  align-items: flex-start;
`;
export default function SignupAgreement(props) {
  const [over14age, setOver14age] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [personalagreement, setPersonalagreement] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [allAgreement, setAllAgreement] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const handleOver14age = () => {
    !over14age ? setOver14age(true) : setOver14age(false);
  };
  const handleAgreement = () => {
    !agreement ? setAgreement(true) : setAgreement(false);
  };
  const handlePersonal = () => {
    !personalagreement
      ? setPersonalagreement(true)
      : setPersonalagreement(false);
  };
  const handleMarket = () => {
    !marketing ? setMarketing(true) : setMarketing(false);
  };
  const openPersonal = (e) => {
    e.preventDefault();
    setOpenModal(true);
    setModalContent("personal");
  };
  const openAgree = (e) => {
    e.preventDefault();
    setOpenModal(true);
    setModalContent("agreement");
  };
  const openMarketing = (e) => {
    e.preventDefault();
    setOpenModal(true);
    setModalContent("marketing");
  };
  const handleAllMarket = () => {
    if (allAgreement === false) {
      setAllAgreement(true);
      if (agreement === false) {
        setAgreement(true);
      }
      if (marketing === false) {
        setMarketing(true);
      }
      if (over14age === false) {
        setOver14age(true);
      }
      if (personalagreement === false) {
        setPersonalagreement(true);
      }
    } else {
      setAgreement(false);
      setMarketing(false);
      setOver14age(false);
      setPersonalagreement(false);
      setAllAgreement(false);
    }
  };
  useEffect(() => {
    if (agreement && personalagreement && marketing && over14age) {
      setAllAgreement(true);
    }
    if (!agreement || !personalagreement || !over14age || !marketing) {
      setAllAgreement(false);
    }
    if (agreement && personalagreement && over14age) {
      props.setAgree(true);
    }
    if (!agreement || !personalagreement || !over14age) {
      props.setAgree(false);
    }
  }, [agreement, personalagreement, marketing, over14age]);
  return (
    <>
      <InputAlign agreement onClick={handleAllMarket}>
        <InputAlign>
          {!allAgreement && <img src={inActiveCheck} alt="전체동의" />}
          {allAgreement && <img src={activeCheck} alt="전체동의" />}
          <label htmlFor="agreement">전체 약관동의</label>
        </InputAlign>
      </InputAlign>
      <DesingLine></DesingLine>
      <Wrapper agreement>
        <InputAlign onClick={handleOver14age}>
          {!over14age && <img src={inActiveCheck} alt="전체동의" />}
          {over14age && <img src={activeCheck} alt="전체동의" />}
          <label htmlFor="agreement1">만 14세 이상입니다.(필수)</label>
        </InputAlign>
        <PaperButton disabled>전문보기</PaperButton>
      </Wrapper>

      <Wrapper agreement>
        <InputAlign onClick={handlePersonal}>
          {!personalagreement && <img src={inActiveCheck} alt="전체동의" />}
          {personalagreement && <img src={activeCheck} alt="전체동의" />}
          <label htmlFor="agreement2">DMPUSH 개인정보동의.(필수)</label>
        </InputAlign>
        <PaperButton onClick={openPersonal}>전문보기</PaperButton>
      </Wrapper>
      <Wrapper agreement>
        <InputAlign onClick={handleAgreement}>
          {!agreement && <img src={inActiveCheck} alt="전체동의" />}
          {agreement && <img src={activeCheck} alt="전체동의" />}
          <label htmlFor="agreement3">DMPUSH 이용약관.(필수)</label>
        </InputAlign>
        <PaperButton onClick={openAgree}>전문보기</PaperButton>
      </Wrapper>
      <Wrapper agreement>
        <InputAlign onClick={handleMarket}>
          {!marketing && <img src={inActiveCheck} alt="전체동의" />}
          {marketing && <img src={activeCheck} alt="전체동의" />}
          <label htmlFor="agreement4">DMPUSH 마케팅동의.(선택)</label>
        </InputAlign>
        <PaperButton onClick={openMarketing}>전문보기</PaperButton>
        {openModal && (
          <SignupArgeeModal setClose={setOpenModal} content={modalContent} />
        )}
      </Wrapper>
    </>
  );
}
