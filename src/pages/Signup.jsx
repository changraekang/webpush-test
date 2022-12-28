import styled from "styled-components";
import AuthBox from "../component/containers/AuthBox";
import {AUTH_TITLE_COLOR,AUTH_MESSAGE_COLOR,AUTH_LABEL_COLOR, MAIN_BACKGROUND_COLOR, INACTIVE_INPUT_BORDER_COLOR, INACTIVE_INPUT_FONT_COLOR,ACTIVE_INPUT_COLOR, EMAIL_OPTION_BORDER_COLOR} from '../constants/color';
import {SAMLL_INPUT_SIZE} from '../constants/fontSize';
import logo from '../assets/images/logo.png';
import {CertificationButton,UnCertificationButton,SignupButton,BeforeSignupButton,} from "../component/buttons/AuthButtons";
import { useState } from "react";
import { useNavigate } from "react-router";
import SignupAgreement from '../component/agreement/SignupAgreement'

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
  padding: 100px 0;
  font-family: 'Pretendard-Regular';
  /* padding: 186px 0; */
  background-color: ${MAIN_BACKGROUND_COLOR};
`

const WrapLogo = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 43px;
`
const Title = styled.h2`
  color: ${AUTH_TITLE_COLOR};
  font-size: 32px;
  font-weight: 600;
  padding-bottom: 12px;
`

const Message = styled.p`
  color: ${AUTH_MESSAGE_COLOR};
`

const Logo = styled.img`
  width: 258px;
  height: 74px;
  `

const WrapContents = styled.div`
  width: 437px;
`
const InputAlign = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: ${(props) => (props.last ? "32px" : "12px")};
  margin-bottom: ${(props) => (props.agreement ? "24px" : null)};
`

const Input = styled.input`
  width: 100%;
  width: ${(props => (props.first ? "134px" : "100%"))};
  padding: 16px;
  margin-top: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};
  color: ${INACTIVE_INPUT_FONT_COLOR};
`

const Label = styled.label`
  color: ${AUTH_LABEL_COLOR};
`

const EmailInput = styled.input`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};
  color: ${INACTIVE_INPUT_FONT_COLOR};
  cursor: pointer;
`

const EmailList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 176px;
  right: 95px;
  top: 55px;
  font-size: ${SAMLL_INPUT_SIZE};
  background-color: ${ACTIVE_INPUT_COLOR};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  border: 1px solid ${EMAIL_OPTION_BORDER_COLOR};
  text-align: center;
  z-index: 5;
`

const EmailOptions = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid ${EMAIL_OPTION_BORDER_COLOR};
  border-bottom: ${(props)=> (props.last ? "none" : `1px solid ${EMAIL_OPTION_BORDER_COLOR}`  )};
 
`
//--------------로그인 페이지--------------------------
export default function Signup() {
  const navigate = useNavigate();
  const emailList = ["naver.com", "hanmail.net", "kakao.com", "gmail.com"] 
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const [email, setEmail] = useState('')
  const handleOpenEmail = () => {
    !isOpenEmail ? setIsOpenEmail(true) : setIsOpenEmail(false);
  }

  const handleSelectEmail = (e) => {
    handleOpenEmail();
    setEmail(e.target.value);
    console.log(email);
  } 

  return (
    <Section>
      <h1 className="ir">회원가입</h1>
      <AuthBox>
        <WrapLogo>
          <Title>회원 가입</Title>
          <Message>DMPUSH와 함께 마케팅에 날개를 달아보세요!</Message>
          {/* <Logo src={logo} alt="메인로고" /> */}
        </WrapLogo>
        <WrapContents>
          <form action="post">
            <Label htmlFor="email">이메일</Label>
            <InputAlign>
              <Input first type="text" placeholder="아이디" id="email"/>
              <span>@</span>
              <EmailInput 
                type="text" 
                placeholder="이메일 선택" 
                readOnly 
                onClick={handleOpenEmail}
                value={email}
              />
              {isOpenEmail && 
                <EmailList>
                  {emailList.map((item, index)=>(
                    <EmailOptions key={index} onClick={handleSelectEmail}>
                      <button value={item}>{item}</button>
                    </EmailOptions>
                  ))}
                  <EmailOptions last onClick={handleSelectEmail}>
                    <button value=''>직접입력</button>
                  </EmailOptions>
                </EmailList>
              }
              <UnCertificationButton>인증하기</UnCertificationButton>
            </InputAlign>

            <Label htmlFor="password">비밀번호</Label>
            <InputAlign>
              <Input type="text" id="password" placeholder="비밀번호를 입력해주세요."/>
            </InputAlign>

            <Label htmlFor="checkPassword">비밀번호 확인</Label>
            <InputAlign>
              <Input type="text" id="checkPassword" placeholder="비밀번호를 확인해주세요."/>
            </InputAlign>

            <Label htmlFor="name">이름</Label>
            <InputAlign>
              <Input type="text" id="name" placeholder="이름(본인 성명)을 입력해주세요."/>
            </InputAlign>

            <Label htmlFor="phone">휴대폰 번호</Label>
            <InputAlign>
              <Input type="text" id="phone" placeholder="휴대폰 번호를 입력해주세요."/>
            </InputAlign>

            <Label htmlFor="company">회사명</Label>
            <InputAlign last>
              <Input type="text" id="company" placeholder="회사명을 입력해주세요."/>
            </InputAlign>

            <SignupAgreement />
            <BeforeSignupButton type="submit">회원가입</BeforeSignupButton>
          </form>
        </WrapContents>
      </AuthBox>  
    </Section>
  )
}
