import styled from "styled-components"
import {ACTIVE_BUTTON_COLOR, ACTIVE_BUTTON_FONT_COLOR,INACTIVE_BUTTON_COLOR, INACTIVE_BUTTON_FONT_COLOR,NORMAL_BUTTON_COLOR, NORMAL_BUTTON_FONT_COLOR,NORMAL_BUTTON_BORDER_COLOR} from '../../constants/color'
import {BUTTON_SIZE, CERTIFICATION_BUTTON_SIZE} from '../../constants/fontSize'

const Button = styled.button`
  display: block;
  border: none;
  width: 100%;
  padding: 16px;
  cursor: pointer;
  border-radius: 8px;
  font-size: ${(props)=>(props.certificate ? `${CERTIFICATION_BUTTON_SIZE}` : `${BUTTON_SIZE}`)};
  background: ${(props)=>(props.normal ? `${NORMAL_BUTTON_COLOR}` : null)};
  background: ${(props) => (props.active ? `${ACTIVE_BUTTON_COLOR}` : null)};
  background: ${(props) => (props.inactive ? `${INACTIVE_BUTTON_COLOR}` : null)};
  color: ${(props)=> (props.normal ? `${NORMAL_BUTTON_FONT_COLOR}` : null)};
  color: ${(props) => (props.active ? `${ACTIVE_BUTTON_FONT_COLOR}` : null)};
  color: ${(props) => (props.inactive ? `${INACTIVE_BUTTON_FONT_COLOR}` : null)};
  border: 1px solid ${(props)=> (props.normal ? `${NORMAL_BUTTON_BORDER_COLOR}` : "none")};
`
//로그인 유효성 통과 전
function LoginButton({children}) {
  return (
    <Button active>{children}</Button>
  )
}

// 로그인 유효성 검사 통과 후
function BeforeLoginButton({children}) {
  return (
    <Button inactive>{children}</Button>
  )
}

// 로그인 -> 회원가입
function GoSignupButton({children, handleGoSignup}) {
  return (
    <Button normal onClick={handleGoSignup}>{children}</Button>
  )
}

// 회원가입 작성 중
function SignupButton({children}) {
  return (
    <Button active>{children}</Button>
  )
}

// 회원 가입 완료
function BeforeSignupButton({children}) {
  return (
    <Button inactive>{children}</Button>
  )
}


// 이메일 인증
function CertificationButton({children}) {
  return (
    <Button certificate active>{children}</Button>
  )
}

// 이메일 비인증
function UnCertificationButton({children}) {
  return (
    <Button certificate inactive>{children}</Button>
  )
}


export {LoginButton,BeforeLoginButton,SignupButton,BeforeSignupButton,GoSignupButton,CertificationButton,UnCertificationButton}
