import FindMemberBox from "../../components/containers/auth/FindMemberBox";
import styled from "styled-components";
import {ActiveFindEmailButton, InactiveFindEmailButton} from '../../components/buttons/FindMemberButtons'
import {MAIN_BACKGROUND_COLOR, AUTH_MESSAGE_COLOR,AUTH_LABEL_COLOR,INACTIVE_INPUT_BORDER_COLOR, ACTIVE_INPUT_BORDER_COLOR} from '../../constants/color'
import { useState } from "react";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: 'Pretendard-Regular';
  background-color: ${MAIN_BACKGROUND_COLOR};
`

const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 12px;
`

const SubMessage = styled.p`
  color: ${AUTH_MESSAGE_COLOR};
  text-align: center; 
`

const FormStyle = styled.form` 
  margin-top: 43px;
  width: 437px;
`

const LabelStyle = styled.label`
  color: ${AUTH_LABEL_COLOR};
`

const InputStyle = styled.input`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  margin-top: 8px;
  box-sizing: border-box;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};

  &:focus{
    border: 1px solid ${ACTIVE_INPUT_BORDER_COLOR};
  }
`

export default function FindPassword() {
  const [phone, setPhone] = useState('');

  const handleInput = (e) => {
    setPhone(e.target.value)
  }
  return (
    <Section>
        <h1 className="ir">이메일 찾기</h1> 
      <FindMemberBox>
        <Title>이메일 찾기</Title>
        <SubMessage>회원가입 시 입력한 이메일을 입력해주세요!</SubMessage>
          <FormStyle action="post">
            <LabelStyle htmlFor="phone">휴대폰 번호</LabelStyle>
            <div>
              <InputStyle onChange={handleInput} value={phone} type="text" id='phone' placeholder="휴대폰 번호를 입력해주세요."/> 
            </div>
            {phone && 
              <ActiveFindEmailButton>확인</ActiveFindEmailButton>
            }
            {!phone && 
              <InactiveFindEmailButton>확인</InactiveFindEmailButton>
            }
          </FormStyle>
      </FindMemberBox>
    </Section>
  )
}
