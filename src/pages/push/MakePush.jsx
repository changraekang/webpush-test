import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PushBox from "../../components/containers/push/PushBox";
import Layout from "../../templates/Layout";
import { grey5, grey10, grey2 } from "../../constants/color";
import activeCheck from "../../assets/images/active-check.png";
import Fox from "../../assets/images/fox.png";
import inActiveCheck from "../../assets/images/inactive-check.png";
import { DemoBox, DemoWrapBox } from "../../components/containers/push/DemoBox";
import {
  ActivePushButton,
  InactivePushButton,
  RegisterImageButton,
} from "../../components/buttons/PushButtons";
import ProjectModal from "../../components/modals/ProjectModal";
import { instanceAxios } from "../../api/axios";
import { getCookie } from "../../cookie/controlCookie";
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-left: 40px;
`;
const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding-bottom: 100px;
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

const PageTitle = styled.h2`
  font-size: 40px;
  font-weight: 600;
  padding-bottom: 12px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 12px;
`;
const SubTitle = styled.h4`
  width: 100px;
  font-size: 24px;
  font-weight: 500;
  padding: 6px;
`;
const SubDemoTitle = styled.h4`
  width: 100%;
  font-size: 24px;
  font-weight: 500;
`;

const Message = styled.p`
  color: ${grey5};
  font-size: 14px;
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
  padding-right: 50px;
  background: ${grey2};
  border-radius: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  margin-top: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${grey5};
  color: ${grey10};
`;
const InputDate = styled.input`
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${grey5};
  color: ${grey10};
`;
const ImageInput = styled.input`
  width: 100%;
  padding: 16px;
  margin-top: 8px;
  margin-left: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${grey5};
  color: ${grey10};
`;
const InputArea = styled.input`
  width: 100%;
  padding: 16px;
  padding-bottom: 300px;
  margin-top: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${grey5};
  color: ${grey10};
`;

const RadioList = styled.ul`
  display: flex;
  margin: 14px 0;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
`;

const RadioLi = styled.li`
  display: flex;
  margin-right: 20px;
  align-items: center;
  gap: 4px;
`;
const SubMessage = styled.p`
  color: ${grey5};
  text-align: center;
  padding-top: 20px;
  padding-bottom: 60px;
`;
const LinkMessage = styled.p`
  color: ${grey5};
  text-align: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 320px;
  padding-bottom: 80px;
`;
const ReserveWrapper = styled.div`
  width: 320px;
  height: 36px;
  display: flex;
  justify-content: flex-start;
`;
export default function MakePush() {
  const [thisClock, setThisClock] = useState("");
  const [thisMonth, setThisMonth] = useState("");
  const [ReserveMin, setReserveMin] = useState("");
  const [timer, setTimer] = useState(1);
  const [submitDate, setSubmitDate] = useState(ReserveMin);
  const accessToken = getCookie("accessToken");
  const getClock = () => {
    const offset = 1000 * 60 * 60 * 9;
    const koreaNow = new Date(new Date().getTime() + offset);
    setReserveMin(koreaNow.toISOString().slice(0, 16));
    setThisClock(koreaNow.toISOString().slice(11, 16));
    setThisMonth(koreaNow.toISOString().slice(0, 10));
  };
  useEffect(() => {
    const checkProject = async () => {
      try {
        const response = await instanceAxios.get("/project/all");
        if (response.status === 200) {
          if (response.data.length > 0) {
            setisModalOpen(false);
          }
        }
      } catch (err) {
        // login yet
        console.error(err);
      }
    };
    checkProject();
    getClock();
    setInterval(getClock, 20000);
  }, []);

  const [isWebCheck, setisWebCheck] = useState(false);
  const [isMobileCheck, setisMobileCheck] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(true);
  const [isAdsCheck, setIsAdsCheck] = useState(false);
  const [isInfoCheck, setisInfoCheck] = useState(false);
  const [isEtcCheck, setisEtcCheck] = useState(false);
  const [isDirectCheck, setIsDirectCheck] = useState(false);
  const [isReserveCheck, setIsReserveCheck] = useState(false);
  const [inputs, setInputs] = useState({
    web: false,
    mobile: false,
    ads: false,
    info: false,
    etc: false,
    title: "",
    content: "",
    link: "",
    image: "",
    date: "",
  });

  // 이미지 파일 관리
  const [previewImg, setPreviewImg] = useState(null);
  const encodeFileBase64 = (file) => {
    const reader = new FileReader();
    // reader.readAsDataURL(file);
    setPreviewImg(file);

    // return new Promise((resolve) => {
    //   reader.onload = () => {
    //     setPreviewImg(file.result);
    //     resolve();
    //   }
    // })
  };

  // 이미지 파일 업로드
  const imageInputRef = useRef(null);
  const formData = new FormData();
  const [demoImg, setDomoImg] = useState("");
  const handleUploadImage = (e) => {
    const fileList = e.target.files;
    encodeFileBase64(fileList[0]);
    // formData.append('file', previewImg);
    // for(const keyValues of formData) console.log("for 문: ", keyValues);
    const url = URL.createObjectURL(fileList[0]);
    setDomoImg(url);
  };

  const onImgInputBtnClick = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };

  // 라디오 체크
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
    isDirectCheck ? setIsDirectCheck(false) : setIsDirectCheck(true);
    setIsReserveCheck(false);
  };
  const handleReserveCheckRadio = () => {
    isReserveCheck ? setIsReserveCheck(false) : setIsReserveCheck(true);
    setIsDirectCheck(false);
  };

  // 메세지 입력
  const { web, mobile, ads, info, etc, title, content, link, image, date } =
    inputs;
  const handleInputDates = (e) => {
    if (e.target.value.slice(0, 10) === thisMonth) {
      if (e.target.value.slice(11, 16) < thisClock) {
        setSubmitDate(ReserveMin);
        return alert("현재시간보다 빠르게 설정 할 수 없습니다.");
      }
    }
    setSubmitDate(e.target.value);
  };
  const handleInputValues = (e) => {
    if (isMobileCheck || isWebCheck) {
      e.preventDefault();
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
        web: isWebCheck,
        mobile: isMobileCheck,
        ads: isAdsCheck,
        info: isInfoCheck,
        etc: isEtcCheck,
      });
    } else {
      alert("Please select Push Type");
    }
  };

  // 제출
  const onClickSubmit = () => {
    if (!isMobileCheck && !isWebCheck) {
      return alert("Please select Push Type");
    }
    if (!title || !content || !link) {
      return alert("Please type DM content");
    }
    if (!isDirectCheck && !isReserveCheck) {
      return alert("Please select publish type");
    }
    if (isDirectCheck) {
      inputs.date = thisMonth + " " + thisClock;
    }
    if (isReserveCheck) {
      if (submitDate.slice(0, 10) === thisMonth) {
        if (submitDate.slice(11, 16) < thisClock) {
          setSubmitDate(ReserveMin);
          return alert("현재시간보다 빠르게 설정 할 수 없습니다.");
        }
      }
    }
    if (isReserveCheck && submitDate) {
      inputs.date = submitDate;
    } else {
      inputs.date = ReserveMin;
    }
    inputs.image = previewImg;
    console.log(inputs, "제출");
  };
  return (
    <Layout>
      <TitleWrapper>
        <PageTitle>PUSH 작성</PageTitle>
        <Message>
          고객들에게 날릴 웹푸시를 작성 및 등록할 수 있는 페이지입니다.
        </Message>
      </TitleWrapper>
      <PageWrapper>
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
            {/**
            {isMobileCheck || isWebCheck ? (
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
            ) : null}
            */}
            <PushBox>
              <Title>02.메시지 내용</Title>
              <WrapMessage>
                <SubTitle>타이틀</SubTitle>
                <Input
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={title}
                  name="title"
                  onChange={handleInputValues}
                ></Input>
              </WrapMessage>
              <WrapAreaMessage>
                <SubTitle>내용</SubTitle>
                <InputArea
                  type="textarea"
                  placeholder="웹푸시에 넣을 내용을 입력해주세요."
                  value={content}
                  name="content"
                  onChange={handleInputValues}
                ></InputArea>
              </WrapAreaMessage>
              <WrapMessage>
                <SubTitle>링크</SubTitle>
                <Input
                  type="text"
                  placeholder="연결할 주소를 입력해주세요 ex.(www.example.com)"
                  value={link}
                  name="link"
                  onChange={handleInputValues}
                ></Input>
              </WrapMessage>
              <WrapMessage>
                <SubTitle>이미지</SubTitle>
                <ImageInput
                  placeholder="이미지를 등록하세요"
                  value={previewImg ? previewImg.name : ""}
                  name="image"
                  readOnly={true}
                ></ImageInput>
                <ImageInput
                  placeholder="이미지를 등록하세요"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleUploadImage}
                ></ImageInput>
                <RegisterImageButton handleUploadImage={onImgInputBtnClick}>
                  이미지 등록
                </RegisterImageButton>
              </WrapMessage>
            </PushBox>
            <PushBox>
              <Title>03.발송 유형</Title>
              <RadioList>
                <RadioLi onClick={handleDirectCheckRadio}>
                  {!isDirectCheck && (
                    <img src={inActiveCheck} alt="즉시발송 체크 아이콘" />
                  )}
                  {isDirectCheck && (
                    <img src={activeCheck} alt="즉시발송 체크 아이콘" />
                  )}
                  즉시발송
                </RadioLi>
                <ReserveWrapper>
                  <RadioLi onClick={handleReserveCheckRadio}>
                    {!isReserveCheck && (
                      <img src={inActiveCheck} alt="예약발송 체크 아이콘" />
                    )}
                    {isReserveCheck && (
                      <img src={activeCheck} alt="예약발송 체크 아이콘" />
                    )}
                    예약발송
                  </RadioLi>
                  {isReserveCheck && (
                    <InputDate
                      type="datetime-local"
                      value={submitDate ? submitDate : ReserveMin}
                      onChange={handleInputDates}
                      min={ReserveMin}
                    ></InputDate>
                  )}
                </ReserveWrapper>
              </RadioList>
            </PushBox>
          </Section>
          <DemoSection>
            <DemoWrapBox>
              <Title>웹푸시 미리보기</Title>
              <DemoWrapperBox>
                <DemoBox>
                  <>
                    <img src={Fox} width="192px" height="192px" alt="여우" />
                  </>
                  <DemoSection>
                    <SubDemoTitle>{inputs.title}</SubDemoTitle>
                    <SubMessage>{inputs.content}</SubMessage>
                    <LinkMessage>{inputs.link}</LinkMessage>
                  </DemoSection>
                </DemoBox>
              </DemoWrapperBox>
            </DemoWrapBox>
          </DemoSection>
        </SectionWrapper>
        <ButtonWrapper>
          {content &&
            title &&
            link &&
            (isMobileCheck || isWebCheck) &&
            (isDirectCheck || isReserveCheck) && (
              <ActivePushButton handleSubmit={onClickSubmit}>
                발송
              </ActivePushButton>
            )}
          {(!content ||
            !title ||
            !link ||
            (!isMobileCheck && !isWebCheck) ||
            (!isDirectCheck && !isReserveCheck)) && (
            <InactivePushButton>발송</InactivePushButton>
          )}
        </ButtonWrapper>
      </PageWrapper>
      {isModalOpen && <ProjectModal setClose={setisModalOpen} />}
    </Layout>
  );
}
