import React, { useState } from "react";
import styled from "styled-components";
import PushBox from "../../components/containers/push/PushBox";
import Layout from "../../templates/Layout";
import {
  MAIN_SUBTITLE_FONT_COLOR,
  INACTIVE_INPUT_BORDER_COLOR,
  MAIN_FONT_COLOR,
  MAIN_DEMOBOX_COLOR,
} from "../../constants/color";
import {
  MAIN_SUBCONTENT_SIZE,
  MAIN_TITLE_SIZE,
  MAIN_SUBTITLE_SIZE,
  MAIN_CONTENT_SIZE
} from "../../constants/fontSize";
import activeCheck from "../../assets/images/active-check.png";
import Fox from "../../assets/images/fox.png";
import inActiveCheck from "../../assets/images/inactive-check.png";
import { DemoBox, DemoWrapBox } from "../../components/containers/push/DemoBox";

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-left: 40px;
`;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Section = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 10px;
  width: 877px;
  padding-left: 10px;
  padding-bottom: 400px;
  /* height: 100vh; */
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
`;
const DemoSection = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 10px;
`;
const DemoShowSection = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 10px;
`;

const PageTitle = styled.h2`
  font-size: ${MAIN_TITLE_SIZE};
  font-weight: 600;
  padding-bottom: 12px;
`;

const Title = styled.h3`
  font-size: ${ MAIN_SUBTITLE_SIZE};
  font-weight: 600;
  padding-bottom: 12px;
`;
const SubTitle = styled.h4`
  width: 100px;
  font-size: ${MAIN_SUBTITLE_SIZE};
  font-weight: 500;
  padding: 6px;
`;
const SubDemoTitle = styled.h4`
  width: 100%;
  font-size: ${MAIN_SUBTITLE_SIZE};
  font-weight: 500;
`;

const Message = styled.p`
  font-size: ${MAIN_SUBCONTENT_SIZE};
  color: ${MAIN_SUBTITLE_FONT_COLOR};
`;

const WrapMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const WrapAreaMessage = styled.div`
  width: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const DemoWrapperBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 550px;
  height: 383px;
  left: 32px;
  top: 77px;

  background: ${MAIN_DEMOBOX_COLOR};
  border-radius: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  margin-top: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};
  color: ${MAIN_FONT_COLOR};
`;
const InputArea = styled.input`
  width: 100%;
  padding: 16px;
  padding-bottom: 300px;
  margin-top: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};
  color: ${MAIN_FONT_COLOR};
`;

const RadioList = styled.ul`
  display: flex;
  margin: 14px 0;
  justify-content: flex-start;
  align-items: center;
  font-size: ${MAIN_CONTENT_SIZE};
`;

const RadioLi = styled.li`
  display: flex;
  margin-right: 20px;
  align-items: center;
  gap: 4px;
`;
const SubMessage = styled.p`
  color: ${MAIN_SUBTITLE_FONT_COLOR};
  text-align: center;
`;

export default function MakePush() {
  const [isWebCheck, setisWebCheck] = useState(false);
  const [isMobileCheck, setisMobileCheck] = useState(false);
  const [isAdsCheck, setIsAdsCheck] = useState(false);
  const [isInfoCheck, setisInfoCheck] = useState(false);
  const [isEtcCheck, setisEtcCheck] = useState(false);
  const [isDirectCheck, setisDirectCheck] = useState(false);

  const handleWebCheckRadio = () => {
    isWebCheck ? setisWebCheck(false) : setisWebCheck(true);
  };
  const handleMobileCheckRadio = () => {
    isMobileCheck ? setisMobileCheck(false) : setisMobileCheck(true);
  };
  const handleAdsCheckRadio = () => {
    isAdsCheck ? setIsAdsCheck(false) : setIsAdsCheck(true);
  };
  const handleInfoCheckRadio = () => {
    isInfoCheck ? setisInfoCheck(false) : setisInfoCheck(true);
  };
  const handleEtcCheckRadio = () => {
    isEtcCheck ? setisEtcCheck(false) : setisEtcCheck(true);
  };
  const handleDirectCheckRadio = () => {
    isDirectCheck ? setisDirectCheck(false) : setisDirectCheck(true);
  };

  return (
    <Layout>
      <TitleWrapper>
        <PageTitle>PUSH 작성</PageTitle>
        <Message>
          고객들에게 날릴 웹푸시를 작성 및 등록할 수 있는 페이지입니다.
        </Message>
      </TitleWrapper>
      <SectionWrapper>
        <Section>
          <PushBox>
            <Title>01.PUSH 유형</Title>
            <RadioList>
              <RadioLi onClick={handleWebCheckRadio}>
                {!isWebCheck && (
                  <img src={inActiveCheck} alt="웹푸시 체크 아이콘" />
                )}
                {isWebCheck && (
                  <img src={activeCheck} alt="웹푸시 체크 아이콘" />
                )}
                웹 푸시
              </RadioLi>
              <RadioLi onClick={handleMobileCheckRadio}>
                {!isMobileCheck && (
                  <img src={inActiveCheck} alt="모바일푸시 체크 아이콘" />
                )}
                {isMobileCheck && (
                  <img src={activeCheck} alt="모바일푸시 체크 아이콘" />
                )}
                모바일 웹 푸시
              </RadioLi>
            </RadioList>
          </PushBox>
          <PushBox>
            <Title>02.메시지 유형</Title>
            <RadioList>
              <RadioLi onClick={handleAdsCheckRadio}>
                {!isAdsCheck && (
                  <img src={inActiveCheck} alt="광고성 체크 아이콘" />
                )}
                {isAdsCheck && (
                  <img src={activeCheck} alt="웹푸시 체크 아이콘" />
                )}
                광고성
              </RadioLi>
              <RadioLi onClick={handleInfoCheckRadio}>
                {!isInfoCheck && (
                  <img src={inActiveCheck} alt="정보성 체크 아이콘" />
                )}
                {isInfoCheck && (
                  <img src={activeCheck} alt="기타 체크 아이콘" />
                )}
                정보성
              </RadioLi>
              <RadioLi onClick={handleEtcCheckRadio}>
                {!isEtcCheck && (
                  <img src={inActiveCheck} alt="모바일푸시 체크 아이콘" />
                )}
                {isEtcCheck && (
                  <img src={activeCheck} alt="모바일푸시 체크 아이콘" />
                )}
                기타
              </RadioLi>
            </RadioList>
          </PushBox>
          <PushBox>
            <Title>03.메시지 내용</Title>
            <WrapMessage>
              <SubTitle>타이틀</SubTitle>
              <Input type="text" placeholder="제목을 입력해주세요."></Input>
            </WrapMessage>
            <WrapAreaMessage>
              <SubTitle>내용</SubTitle>
              <InputArea
                type="textarea"
                placeholder="웹푸시에 넣을 내용을 입력해주세요."
              ></InputArea>
            </WrapAreaMessage>
            <WrapMessage>
              <SubTitle>링크</SubTitle>
              <Input
                type="text"
                placeholder="연결할 주소를 입력해주세요"
              ></Input>
            </WrapMessage>
            <WrapMessage>
              <SubTitle>이미지</SubTitle>
              <Input
                type="text"
                placeholder="이메일을 입력하세요"
                readOnly={true}
              ></Input>
            </WrapMessage>
          </PushBox>
          <PushBox>
            <Title>04.발송 유형</Title>
            <RadioList>
              <RadioLi onClick={handleDirectCheckRadio}>
                {!isWebCheck && (
                  <img src={inActiveCheck} alt="웹푸시 체크 아이콘" />
                )}
                {isWebCheck && (
                  <img src={activeCheck} alt="웹푸시 체크 아이콘" />
                )}
                즉시발송
              </RadioLi>
              <RadioLi onClick={handleMobileCheckRadio}>
                <img src={inActiveCheck} alt="모바일푸시 체크 아이콘" />
                예약발송
              </RadioLi>
            </RadioList>
          </PushBox>
        </Section>
        <DemoSection>
          <DemoWrapBox>
            <Title>웹푸시 미리보기</Title>
            <DemoWrapperBox>
              <DemoBox>
                <>
                  <img src={Fox} width="192px" height="192px" />
                </>
                <DemoSection>
                  <SubDemoTitle>제목 타이틀</SubDemoTitle>
                  <SubMessage>
                    내용이들어가는 부분입니다.내용이들어가는
                    부분입니다.내용이들어가는 부분입니다.내용이들어가는
                    부분입니다.내용이들어가는 부분입니다.내용이들어가는
                    부분입니다.내용이들어가는 부분입니다.내용이들어가는
                    부분입니다.내용이들어가는 부분입니다.내용이들어가는
                    부분입니다.내용이들어가는 부분입니다.내용...
                  </SubMessage>
                  <SubMessage>제목 타이틀</SubMessage>
                </DemoSection>
              </DemoBox>
            </DemoWrapperBox>
          </DemoWrapBox>
        </DemoSection>
      </SectionWrapper>
    </Layout>
  );
}
