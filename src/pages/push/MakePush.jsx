import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PushBox } from "../../components/containers/push/PushBox";
import Layout from "../../templates/Layout";
import {
  grey5,
  grey10,
  grey2,
  grey4,
  grey3,
  primary4,
  grey1,
} from "../../constants/color";
import chrome from "../../assets/images/chrome_logo.png";
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
  DeleteIconButton,
} from "../../components/buttons/PushButtons";
import { instanceAxios } from "../../api/axios";
import { getCookie } from "../../cookie/controlCookie";
import {
  AlertMessage,
  IsAlertOpen,
  MyProject,
  MyPushProject,
} from "../../atom/Atom";
import { useRecoilState } from "recoil";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  gap: 25px;
  justify-content: center;
  margin-bottom: 40px;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Pretendard-Regular";
`;
const DemoSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PageTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 12px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 12px;
`;
const SubTitle = styled.h4`
  width: 150px;
  font-size: 16px;
  font-weight: 500;
  padding: 6px;
`;
const SubDemoTitle = styled.h4`
  width: 300px;
  font-size: 16px;
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
  width: 500px;
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
  margin-left: 30px;
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
  padding-top: 6px;
  padding-bottom: 15px;
`;
const LinkMessage = styled.p`
  color: ${grey5};
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
  width: 100%;
  height: 250px;
  border-radius: 8px 8px 0 0;
  /* object-fit: contain; */
`;

const SelectIconDiv = styled.div`
  border: 1px solid ${primary4};
  margin-top: -10px;
`;

const IconBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  padding: 5px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AlignIcon = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  margin: 20px 0 0 29px;
`;

const WrapDemoContent = styled.div`
  padding: 20px;
`;

const WrapBrowserImg = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ChromeImg = styled.img`
  width: 23px;
`;
const WrapIconDiv = styled.div`
  width: 60px;
  height: 60px;
  background: ${grey4};
`;

const IconButnsAlign = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;
`;
export default function MakePush() {
  const navigate = useNavigate();

  const [thisClock, setThisClock] = useState("");
  const [thisMonth, setThisMonth] = useState("");
  const [ReserveMin, setReserveMin] = useState("");
  const [pushType, setPushType] = useState("");
  const [pushTypeDemo, setPushTypeDemo] = useState("advertising");
  const [submitDate, setSubmitDate] = useState(ReserveMin);
  const [pid, setPid] = useState("");
  const [myProject, setMyProject] = useRecoilState(MyProject);
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);
  const [iconUrl, setIconUrl] = useState(null);
  const [iid, setIid] = useState(null);

  // Alert Modal
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(IsAlertOpen);
  const [alertMessage, setAlertMessage] = useRecoilState(AlertMessage);

  const getClock = () => {
    const offset = 1000 * 60 * 60 * 9;
    const koreaNow = new Date(new Date().getTime() + offset);
    setReserveMin(koreaNow.toISOString().slice(0, 16).replace("T", " "));
    setThisClock(koreaNow.toISOString().slice(11, 16));
    setThisMonth(koreaNow.toISOString().slice(0, 10));
  };
  useEffect(() => {
    console.log(myProject);

    getClock();
    setInterval(getClock, 20000);
  }, []);

  const [isWebCheck, setisWebCheck] = useState(true);
  const [isMobileCheck, setisMobileCheck] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isAdsCheck, setIsAdsCheck] = useState(false);
  const [isInfoCheck, setisInfoCheck] = useState(false);
  const [isEtcCheck, setisEtcCheck] = useState(false);
  const [isDirectCheck, setIsDirectCheck] = useState(false);
  const [isReserveCheck, setIsReserveCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    web: false,
    mobile: false,
    title: "",
    content: "",
    link: "https://",
    image: "",
    date: "",
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
  // ????????? ??????
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
    console.log(thisClock.slice(0, 2) - 9 + thisClock.slice(2), "??????");
    setIsReserveCheck(false);
  };
  const handleReserveCheckRadio = () => {
    isReserveCheck ? setIsReserveCheck(false) : setIsReserveCheck(true);
    setIsDirectCheck(false);
  };

  // ????????? ??????
  const { web, mobile, ads, info, etc, title, content, link, image, date } =
    inputs;
  const handleInputDates = (e) => {
    if (e.target.value.slice(0, 10) === thisMonth) {
      if (e.target.value.slice(11, 16) < thisClock) {
        setSubmitDate(ReserveMin);
        return (
          setIsAlertOpen(true),
          setAlertMessage("?????????????????? ????????? ?????? ??? ??? ????????????.")
        );
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

  // ????????? ?????? ?????????
  const imageInputRef = useRef(null);
  const iconInputRef = useRef(null);
  const [demoImg, setDomoImg] = useState("");
  const [iconImg, setIconImg] = useState(null);
  // const [selected, setSelectedIcon] = useState("");
  const formData = new FormData();

  const [previewImg, setPreviewImg] = useState(null);
  const handleUploadImage = (e) => {
    const fileList = e.target.files;
    setPreviewImg(fileList[0]);
    // formData.append('file', previewImg);
    // for(const keyValues of formData) console.log("for ???: ", keyValues);
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
    if (iconArr.length > 2) {
      setIsAlertOpen(true);
      setAlertMessage("???????????? 3????????? ????????? ??????????????? ????");
    } else {
      iconInputRef.current.click();
    }
  };

  // ????????? ????????????
  const requestAddIcons = async () => {
    try {
      formData.append("icon", iconImg);
      const response = await instanceAxios.post(
        `/${myPushProject.pid}/icon/upload`,
        formData
      );
      if (response.status === 200) {
        console.log("????????????? ?????? ??????", response);
        setIconImg(response.data.url);
        requestIconAll();
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

  const [iconArr, setIconArr] = useState([]);
  const requestIconAll = async () => {
    try {
      const response = await instanceAxios.get(
        `/${myPushProject.pid}/icon/all`
      );
      if (response.status === 200) {
        setIconArr(response.data);
      }
      console.log(response.data, "????????????");
    } catch (err) {
      console.error(err);
    }
  };

  // ????????? ????????????
  const deleteIcon = async (e) => {
    e.preventDefault();
    console.log(iid, "iid????????????");
    if (iid === null) {
      alert("????????? ???????????? ?????????????????? ????");
    } else {
      if (window.confirm("???????????? ?????????????????????????")) {
        try {
          const response = await instanceAxios.delete(
            `${myPushProject.pid}/icon/${iid}`,
            {}
          );
          console.log(response);
          if (response === 200) {
            setIsAlertOpen(true);
            setAlertMessage("??????????????? ???????????? ????????????????????? ????");
            // requestIconAll();
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  useEffect(() => {
    if (myPushProject) {
      requestIconAll();
      if (myPushProject.expiryDate) {
        setIsAlertOpen(true);
        setAlertMessage("???????????? ?????????????????????");
        navigate("/dashboard");
      }
    }
  }, [myPushProject]);

  const handleIconSelect = (e) => {
    console.log(e.target.src);
    const imageSrc = e.target.src;
    if (imageSrc === iconUrl) {
      setIconUrl(null);
      setIid(null);
    } else {
      setIconUrl(e.target.src);
      setIid(imageSrc.split("/").at(-1));
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (link.includes("https://")) {
        return;
      } else {
        setIsAlertOpen(true);
        setAlertMessage('????????? "https://"??? ???????????????????');
      }
    }
  };

  // ??????
  const onClickSubmit = async (e) => {
    e.preventDefault();
    if (!link.includes("https://")) {
      return (
        setIsAlertOpen(true), setAlertMessage('????????? "https://"??? ???????????????????')
      );
    }

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
      let time;
      if (thisClock.slice(0, 2) - 9 > 10) {
        time = thisClock.slice(0, 2) - 9;
      } else {
        time = "0" + thisClock.slice(0, 2) - 9;
      }
      inputs.date =
        thisMonth + "0" + thisClock.slice(0, 2) - 9 + thisClock.slice(2);
    }
    if (isReserveCheck) {
      if (submitDate.slice(0, 10) === thisMonth) {
        if (submitDate.slice(11, 16) < thisClock) {
          setSubmitDate(ReserveMin);
          return (
            setIsAlertOpen(true),
            setAlertMessage("?????????????????? ????????? ?????? ??? ??? ????????????.")
          );
        }
      }
    }
    setIsLoading(true);
    if (isReserveCheck && submitDate) {
      inputs.date = submitDate.replace("T", " ");
    } else {
      inputs.date = "2023-01-20 00:00";
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
      iid: iid,
    };
    console.log(inputs.date, "data");
    formData.append(
      "request",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    formData.append("file", previewImg);
    try {
      const response = await instanceAxios.post(
        `/${myPushProject.pid}/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setIsAlertOpen(true);
        setAlertMessage("????????? ?????? ??????????");
        setIsLoading(false);
        window.location.reload();
      }
      console.log(response);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return (
    <Layout>
      {/* ????????? */}
      {isLoading && <Loading></Loading>}
      <TitleWrapper>
        <WrapHomepages>
          {myPushProject.name ? myPushProject.name : "??????????????? ??????????????????"}
        </WrapHomepages>
        <PageTitle>PUSH ?????? </PageTitle>
        <Message>
          ??????????????? ?????? ???????????? ?????? ??? ????????? ??? ?????? ??????????????????.
        </Message>
      </TitleWrapper>
      <PageWrapper>
        <SectionWrapper>
          <Section>
            <PushBox>
              <Title>01.PUSH ??????</Title>
              <RadioList>
                <RadioLi onClick={handleWebCheckRadio}>
                  {!isWebCheck && (
                    <img src={inActiveCheck} alt="????????? ?????? ?????????" />
                  )}
                  {isWebCheck && (
                    <img src={activeCheck} alt="????????? ?????? ?????????" />
                  )}
                  ??? ??????
                </RadioLi>
                <RadioLi>
                  {!isMobileCheck && (
                    <img src={inActiveCheck} alt="??????????????? ?????? ?????????" />
                  )}
                  {isMobileCheck && (
                    <img src={activeCheck} alt="??????????????? ?????? ?????????" />
                  )}
                  ????????? ??? ??????
                </RadioLi>
              </RadioList>
            </PushBox>
            {/**
            {isMobileCheck || isWebCheck ? (
              <PushBox>
                <Title>02.????????? ??????</Title>
                <RadioList>
                  <RadioLi onClick={handleAdsCheckRadio}>
                    {!isAdsCheck && (
                      <img src={inActiveCheck} alt="????????? ?????? ?????????" />
                    )}
                    {isAdsCheck && (
                      <img src={activeCheck} alt="????????? ?????? ?????????" />
                    )}
                    ?????????
                  </RadioLi>
                  <RadioLi onClick={handleInfoCheckRadio}>
                    {!isInfoCheck && (
                      <img src={inActiveCheck} alt="????????? ?????? ?????????" />
                    )}
                    {isInfoCheck && (
                      <img src={activeCheck} alt="?????? ?????? ?????????" />
                    )}
                    ?????????
                  </RadioLi>
                  <RadioLi onClick={handleEtcCheckRadio}>
                    {!isEtcCheck && (
                      <img src={inActiveCheck} alt="??????????????? ?????? ?????????" />
                    )}
                    {isEtcCheck && (
                      <img src={activeCheck} alt="??????????????? ?????? ?????????" />
                    )}
                    ??????
                  </RadioLi>
                </RadioList>
              </PushBox>
            ) : null}
            */}
            <PushBox>
              <Title>02.????????? ??????</Title>
              <WrapMessage>
                <SubTitle>?????????</SubTitle>
                <Input
                  type="text"
                  placeholder="????????? ??????????????????."
                  value={title}
                  name="title"
                  onChange={handleInputValues}
                ></Input>
              </WrapMessage>
              <WrapAreaMessage>
                <SubTitle>??????</SubTitle>
                <InputArea
                  type="textarea"
                  placeholder="???????????? ?????? ????????? ??????????????????."
                  value={content}
                  name="content"
                  onChange={handleInputValues}
                ></InputArea>
              </WrapAreaMessage>
              <WrapMessage>
                <SubTitle>??????</SubTitle>
                <Input
                  type="text"
                  placeholder="????????? ????????? ?????????????????? ex.(www.example.com)"
                  value={link}
                  name="link"
                  onKeyDown={onKeyDown}
                  onChange={handleInputValues}
                ></Input>
              </WrapMessage>
              <WrapMessage>
                <SubTitle>?????????</SubTitle>
                <ImageInput
                  placeholder="???????????? ???????????????"
                  value={previewImg ? previewImg.name : ""}
                  name="image"
                  readOnly={true}
                ></ImageInput>
                <ImageInput
                  placeholder="???????????? ???????????????"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleUploadImage}
                ></ImageInput>
                <RegisterImageButton handleUploadImage={onImgInputBtnClick}>
                  ????????? ??????
                </RegisterImageButton>
              </WrapMessage>
              {/* ?????????!!!! ???? */}
              <WrapMessage icon>
                <SubTitle>?????????</SubTitle>
                <AlignIcon>
                  {/* map ?????? ?????? */}
                  {iconArr.map(({ url }, index) => {
                    if (url === iconUrl) {
                      return (
                        <SelectIconDiv key={index}>
                          <IconBox onClick={handleIconSelect}>
                            <Icon src={url} alt={url} />
                          </IconBox>
                        </SelectIconDiv>
                      );
                    } else {
                      return (
                        <IconBox onClick={handleIconSelect} key={index}>
                          <Icon src={url} alt={url} />
                        </IconBox>
                      );
                    }
                  })}
                </AlignIcon>
                <ImageInput
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  ref={iconInputRef}
                  onChange={handleUploadIcon}
                />
                <IconButnsAlign>
                  {myPushProject.expiryDate ? null : (
                    <RegisterIconButton handleUploadIcon={onIconInputBtnClick}>
                      ????????? ??????
                    </RegisterIconButton>
                  )}
                  {iconUrl ? (
                    <DeleteIconButton deleteIcon={deleteIcon}>
                      ????????? ??????
                    </DeleteIconButton>
                  ) : null}
                </IconButnsAlign>
              </WrapMessage>
            </PushBox>
            <PushBox>
              <Title>03.?????? ??????</Title>
              <RadioList>
                <RadioLi onClick={handleDirectCheckRadio}>
                  {!isDirectCheck && (
                    <img src={inActiveCheck} alt="???????????? ?????? ?????????" />
                  )}
                  {isDirectCheck && (
                    <img src={activeCheck} alt="???????????? ?????? ?????????" />
                  )}
                  ????????????
                </RadioLi>
                <ReserveWrapper>
                  <RadioLi onClick={handleReserveCheckRadio}>
                    {!isReserveCheck && (
                      <img src={inActiveCheck} alt="???????????? ?????? ?????????" />
                    )}
                    {isReserveCheck && (
                      <img src={activeCheck} alt="???????????? ?????? ?????????" />
                    )}
                    ????????????
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
              <Title>????????? ????????????</Title>
              <DemoWrapperBox>
                <DemoBox>
                  <DemoImg
                    src={demoImg ? demoImg : Rectangle}
                    alt="???????????????"
                  />
                  <DemoSection>
                    <WrapDemoContent>
                      <WrapBrowserImg>
                        <ChromeImg src={chrome} alt="?????? ??????" />
                        <p>Chrome</p>
                      </WrapBrowserImg>
                      <div
                        style={{
                          display: "flex",
                          gap: "18px",
                          alignItems: "flex-start",
                          marginTop: "20px",
                        }}
                      >
                        <WrapIconDiv>
                          <img style={{ width: "100%" }} src={iconUrl} alt="" />
                        </WrapIconDiv>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <SubDemoTitle>{inputs.title}</SubDemoTitle>
                          <SubMessage>{inputs.content}</SubMessage>
                          <LinkMessage>{inputs.link}</LinkMessage>
                        </div>
                      </div>
                    </WrapDemoContent>
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
            !myPushProject.expiryDate &&
            (isMobileCheck || isWebCheck) &&
            (isDirectCheck || isReserveCheck) && (
              <ActivePushButton handleSubmit={onClickSubmit}>
                ??????
              </ActivePushButton>
            )}
          {(!content ||
            !title ||
            !link ||
            !myPushProject.pid ||
            myPushProject.expiryDate ||
            (!isMobileCheck && !isWebCheck) ||
            (!isDirectCheck && !isReserveCheck)) && (
            <InactivePushButton>??????</InactivePushButton>
          )}
        </ButtonWrapper>
      </PageWrapper>
    </Layout>
  );
}
