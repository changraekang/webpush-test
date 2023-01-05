import FindMemberBox from "../../components/containers/auth/FindMemberBox";
import styled from "styled-components";
import {
  ActiveFindEmailButton,
  GoLoginPage,
  InactiveFindEmailButton,
} from "../../components/buttons/FindMemberButtons";
import {
  MAIN_BACKGROUND_COLOR,
  AUTH_MESSAGE_COLOR,
  AUTH_LABEL_COLOR,
  MAIN_FONT_COLOR,
} from "../../constants/color";
import mainImage from "../../assets/images/mainpage.png";
import exclamationImg from "../../assets/images/Exclamation.png";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  background-color: ${MAIN_BACKGROUND_COLOR};
`;
const ImageSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
  background-image: ${MAIN_BACKGROUND_COLOR};
`;

const ResultSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
`;
const FormStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 43px;
  width: 437px;
`;
const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 12px;
`;

const ButtonWrap = styled.div`
  width: 240px;
  display: flex;
  justify-content: center;
`;
const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 0px;
  gap: 8px;

  width: 360px;
  height: 195px;

  /* Grey/20 */

  background: #f0f0f0;
`;

const Check = styled.img`
  width: 40px;
  height: 40px;
`;
const Message = styled.label`
  color: ${AUTH_LABEL_COLOR};
`;
const Warning = styled.label`
  padding-top: 5px;
  line-height: 32px;
  color: ${MAIN_FONT_COLOR};
`;
const MainImage = styled.img`
  width: 712px;
  height: 654px;
`;

export default function NotFoundEmail() {
  const navigate = useNavigate();
  const params = useParams();
  const handleRefindEmail = (e) => {
    e.preventDefault();
    navigate("/findEmail");
  };
  return (
    <Section>
      <ImageSection>
        <MainImage src={mainImage} alt="메인이미지" />
      </ImageSection>
      <ResultSection>
        <FormStyle>
          <BoxWrap>
            <Check src={exclamationImg} alt="느낌표표시"></Check>
            <Warning>앗! 일치하는 메일을 찾을 수 없습니다!</Warning>
          </BoxWrap>
          <ButtonWrap>
            <GoLoginPage handleGoLogin={handleRefindEmail}>
              다시찾기
            </GoLoginPage>
          </ButtonWrap>
        </FormStyle>
      </ResultSection>
    </Section>
  );
}
