import FindMemberBox from "../../components/containers/auth/FindMemberBox";
import styled from "styled-components";
import {
  ActiveFindEmailButton,
  InactiveFindEmailButton,
} from "../../components/buttons/FindMemberButtons";
import {
  MAIN_BACKGROUND_COLOR, 
  grey9,
  grey11,
  grey5,
  primary4,
} from "../../constants/color";
import mainImage from "../../assets/images/mainpage.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instanceAxios } from "../../api/axios";

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
const InputSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  /* padding: 186px 0; */
`;

const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 12px;
`;

const SubMessage = styled.p`
  color: ${grey9};
  font-weight: 400;
  line-height: 27px;
  text-align: center;
`;

const FormStyle = styled.form`
  margin-top: 32px;
  width: 437px;
`;

const LabelStyle = styled.label`
  color: ${grey11};
`;
const MainImage = styled.img`
  width: 712px;
  height: 654px;
`;
const InputStyle = styled.input`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  margin-top: 8px;
  box-sizing: border-box;
  border: 1px solid ${grey5};

  &:focus {
    border: 1px solid ${primary4};
  }
`;

export default function FindPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  
  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  useEffect(() => {
    if (phone.length === 10) {
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phone.length === 13) {
      setPhone(
        phone.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phone]);

  const handleNumberInput = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const requsetFindEmail = async(e) => {
    e.preventDefault();
    try {
      const response = await instanceAxios.post('/auth/email', {
        name : name,
        phone : phone
      });
      console.log(response);
      if(response.status === 200) {
        navigate(`/resultEmail/${response.data.data}`);
      } 
    } catch (err) {
      console.log(err)
      navigate("/notFoundemail");
    }
  }
  return (
    <Section>
      <ImageSection>
        <MainImage src={mainImage} alt="메인이미지" />
      </ImageSection>
      <InputSection>
        <h1 className="ir">이메일 찾기</h1>
        <FindMemberBox>
          <Title>이메일 찾기</Title>
          <SubMessage>회원가입 시 입력한 전화번호를 입력해주세요!</SubMessage>
          <FormStyle onSubmit={requsetFindEmail}>
            <div>
            <div>
              <InputStyle
                onChange={handleNameInput}
                value={name}
                type="text"
                id="name"
                placeholder="성함을 입력해주세요."
              />
            </div>
              <InputStyle
                onChange={handleNumberInput}
                value={phone}
                type="text"
                id="phone"
                placeholder="휴대폰 번호를 입력해주세요."
              />
            </div>
            {phone && (
              <ActiveFindEmailButton>
                확인
              </ActiveFindEmailButton>
            )}
            {!phone && <InactiveFindEmailButton>확인</InactiveFindEmailButton>}
          </FormStyle>
        </FindMemberBox>
      </InputSection>
    </Section>
  );
}
