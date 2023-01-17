import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PushBox } from "../../components/containers/push/PushBox";
import Layout from "../../templates/Layout";
import { grey5, grey10, grey2, grey4, grey3 } from "../../constants/color";
import activeCheck from "../../assets/images/active-check.png";
import Rectangle from "../../assets/images/demoBox.png";
import inActiveCheck from "../../assets/images/inactive-check.png";
import { DemoBox, DemoWrapBox } from "../../components/containers/push/DemoBox";
import plusIcon from "../../assets/images/plus.png";
import minusIcon from "../../assets/images/minus.png";
import {
  ActivePushButton,
  InactivePushButton,
  RegisterImageButton,
  RegisterIconButton,
} from "../../components/buttons/PushButtons";
import ProjectModal from "../../components/modals/ProjectModal";
import { instanceAxios } from "../../api/axios";
import { getCookie } from "../../cookie/controlCookie";
import { MyIcons, MyProject, MyPushProject } from "../../atom/Atom";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
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
const WrapHomepages = styled.ul`
  display: flex;
  font-weight: 600;
  margin-bottom: 40px;
  border-bottom: 3px solid black;
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
  justify-content: space-between;
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
const ButtonWrapperBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 500px;
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

const DemoImg = styled.img`
  width: 192px;
  height: 192px;
  object-fit: cover;
`;

const IconBox = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-color: ${grey5};
  margin-top: 20px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MinusIconBtn = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  left: -12px;
  top: -6px;
`;

const DeleteIconImg = styled.img`
  width: 30px;
  height: 30px;
`;

const AlignIcon = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  margin-left: 29px;
`;
export default function PushDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [pushDetail, setPushDetail] = useState([]);

  const [thisClock, setThisClock] = useState("");
  const [thisMonth, setThisMonth] = useState("");
  const [ReserveMin, setReserveMin] = useState("");
  const [pushType, setPushType] = useState("");
  const [pushTypeDemo, setPushTypeDemo] = useState("advertising");
  const [submitDate, setSubmitDate] = useState(ReserveMin);
  const [pid, setPid] = useState("");
  const [myProject, setMyProject] = useRecoilState(MyProject);
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);
  const getPushDetail = async () => {
    try {
      const response = await instanceAxios.get(`/message/${params.id}`, {});
      if (response.status === 200) {
        setPushDetail(response.data);
        setInputs({
          title: response.data.title,
          content: response.data.content,
          link: response.data.link,
          image: "",
          date: response.data.date,
          pid: response.data.pid,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getClock = () => {
    const offset = 1000 * 60 * 60 * 9;
    const koreaNow = new Date(new Date().getTime() + offset);
    setReserveMin(koreaNow.toISOString().slice(0, 16).replace("T", " "));
    setThisClock(koreaNow.toISOString().slice(11, 16));
    setThisMonth(koreaNow.toISOString().slice(0, 10));
  };
  useEffect(() => {
    console.log(pushDetail, "디테일");
    getPushDetail();
    getClock();
    setInterval(getClock, 20000);
  }, []);

  const [isWebCheck, setisWebCheck] = useState(false);
  const [isMobileCheck, setisMobileCheck] = useState(false);
  const [isAdsCheck, setIsAdsCheck] = useState(false);
  const [isInfoCheck, setisInfoCheck] = useState(false);
  const [isEtcCheck, setisEtcCheck] = useState(false);
  const [isDirectCheck, setIsDirectCheck] = useState(false);
  const [isReserveCheck, setIsReserveCheck] = useState(false);
  const [isChange, setIsChange] = useState(true);
  const [inputs, setInputs] = useState({
    title: pushDetail.title,
    content: pushDetail.content,
    link: pushDetail.link,
    image: "",
    date: pushDetail.date,
    pid: myPushProject.pid,
  });
  useEffect(() => {
    if (isWebCheck && isMobileCheck) {
      setPushType("web_push");
      setPushTypeDemo("other");
    } else if (isMobileCheck) {
      setPushType("mobile_app_push");
    } else if (isWebCheck) {
      setPushType("web_push");
    }
  }, [isWebCheck, isMobileCheck]);
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
  };
  // 수정
  const onClickChange = () => {
    setIsChange(false);
  };
  // 제출
  const onClickSubmit = async (e) => {
    e.preventDefault();
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
      inputs.date = submitDate.replace("T", " ");
    } else {
      inputs.date = ReserveMin;
    }
    inputs.image = previewImg;

    let data = {
      pushType: pushType,
      messageType: pushTypeDemo,
      title: inputs.title,
      content: inputs.content,
      sendType: "advertising",
      link: inputs.link,
      sendTime: inputs.date,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    formData.append("file", previewImg);
    try {
      const response = await instanceAxios.post(
        `/message/${myPushProject.pid}/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("메세지 등록 성공🎉");
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  // 이미지 파일 업로드
  const imageInputRef = useRef(null);
  const iconInputRef = useRef(null);
  const [demoImg, setDomoImg] = useState("");
  const [iconImg, setIconImg] = useState(null);
  const formData = new FormData();

  // 이미지 파일 관리
  const encodeFileBase64 = (file) => {
    const reader = new FileReader();
    // reader.readAsDataURL(file);
    // setPreviewImg(file);
    // return new Promise((resolve) => {
    //   reader.onload = () => {
    //     setPreviewImg(file.result);
    //     resolve();
    //   }
    // })
  };
  const [previewImg, setPreviewImg] = useState(null);
  const handleUploadImage = (e) => {
    const fileList = e.target.files;
    setPreviewImg(fileList[0]);
    // formData.append('file', previewImg);
    // for(const keyValues of formData) console.log("for 문: ", keyValues);
    const imageUrl = URL.createObjectURL(fileList[0]);
    setDomoImg(imageUrl);
  };

  const handleUploadIcon = (e) => {
    const fileList = e.target.files;
    setIconImg(fileList[0]);
  };

  const onImgInputBtnClick = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };

  const onIconInputBtnClick = (e) => {
    e.preventDefault();
    iconInputRef.current.click();
  };

  // 아이콘 추가하기
  const requestAddIcons = async () => {
    try {
      formData.append("icon", iconImg);
      const response = await instanceAxios.post(
        `/image/${myPushProject.pid}/icon/upload`,
        formData
      );
      if (response.status === 200) {
        console.log("🚩아이콘 등록 성공", response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (iconImg) {
      requestAddIcons();
    }
  }, [iconImg]);

  const [iconArr, setIconArr] = useRecoilState(MyIcons);
  const requestIconAll = async () => {
    try {
      const response = await instanceAxios.get(
        `/image/${myPushProject.pid}/icon/all`
      );
      if (response.status === 200) {
        setIconArr(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 아이콘 삭제하기
  const deleteIcon = async () => {
    try {
      // const response = await instanceAxios.delete(`/image/icon/${iid}`, {});
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (myPushProject) {
      requestIconAll();
    }
  }, [myPushProject]);

  return (
    <Layout>
      <TitleWrapper>
        <WrapHomepages></WrapHomepages>
        <PageTitle>PUSH 상세 </PageTitle>
        <ButtonWrapperBox>
          <Message>고객들에게 날릴 웹푸시를 수정하는 페이지입니다.</Message>
          <ActivePushButton handleSubmit={onClickChange}>
            수정하기
          </ActivePushButton>
        </ButtonWrapperBox>
      </TitleWrapper>
      <PageWrapper>
        <SectionWrapper>
          <Section>
            <PushBox>
              <Title>02.메시지 내용</Title>
              <WrapMessage>
                <SubTitle>타이틀</SubTitle>
                <Input
                  type="text"
                  value={title}
                  name="title"
                  readOnly={isChange}
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
                  readOnly={isChange}
                  onChange={handleInputValues}
                ></InputArea>
              </WrapAreaMessage>
              <WrapMessage>
                <SubTitle>링크</SubTitle>
                <Input
                  type="text"
                  placeholder="연결할 주소를 입력해주세요 ex.(www.example.com)"
                  value={link}
                  readOnly={isChange}
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
              {/* 아이콘!!!! 🐰 */}
              <WrapMessage icon>
                <SubTitle>아이콘</SubTitle>
                <AlignIcon>
                  {/* map 돌릴 예정 */}
                  {iconArr.map((iid, name, url) => {
                    <IconBox key={iid}>
                      <MinusIconBtn>
                        <DeleteIconImg src={minusIcon} alt="아이콘 삭제하기" />
                      </MinusIconBtn>
                      <Icon src={url} alt={name} />
                    </IconBox>;
                  })}
                </AlignIcon>
                <ImageInput
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  ref={iconInputRef}
                  onChange={handleUploadIcon}
                />
                <RegisterIconButton handleUploadIcon={onIconInputBtnClick}>
                  아이콘 등록
                </RegisterIconButton>
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
                  <DemoImg
                    src={demoImg ? demoImg : Rectangle}
                    alt="데모이미지"
                  />
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
            myPushProject.pid &&
            (isMobileCheck || isWebCheck) &&
            (isDirectCheck || isReserveCheck) && (
              <ActivePushButton handleSubmit={onClickSubmit}>
                발송
              </ActivePushButton>
            )}
          {(!content ||
            !title ||
            !link ||
            !myPushProject.pid ||
            (!isMobileCheck && !isWebCheck) ||
            (!isDirectCheck && !isReserveCheck)) && (
            <InactivePushButton>발송</InactivePushButton>
          )}
        </ButtonWrapper>
      </PageWrapper>
    </Layout>
  );
}
