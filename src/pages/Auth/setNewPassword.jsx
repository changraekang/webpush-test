import styled from "styled-components";
import FindMemberBox from "../../components/containers/auth/FindMemberBox";
import {
  MAIN_BACKGROUND_COLOR,
  AUTH_MESSAGE_COLOR,
  AUTH_LABEL_COLOR,
  INACTIVE_INPUT_BORDER_COLOR,
  ACTIVE_INPUT_BORDER_COLOR,
  AUTH_WARNING_COLOR,
  AUTH_MAIN_COLOR,
} from "../../constants/color";
import { useEffect, useState } from "react";
import {
  ActiveSetNewasswordButton,
  InactiveSetNewPasswordButton
} from '../../components/buttons/FindMemberButtons'
import { instanceAxios } from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-family: "Pretendard-Regular";
  background: ${AUTH_MAIN_COLOR};
`;

const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 12px;
`;

const WarningMessage = styled.p`
  color: ${AUTH_WARNING_COLOR};
  padding-top: 15px;
  text-align: start;
`;
const SubMessage = styled.p`
  color: ${AUTH_MESSAGE_COLOR};
  text-align: center;
`;

const FormStyle = styled.form`
  margin-top: 43px;
  width: 437px;
`;

const LabelStyle = styled.label`
  color: ${AUTH_LABEL_COLOR};
`;

const InputStyle = styled.input`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  margin-top: 8px;
  box-sizing: border-box;
  border: 1px solid ${INACTIVE_INPUT_BORDER_COLOR};

  &:focus {
    border: 1px solid ${ACTIVE_INPUT_BORDER_COLOR};
  }
`;
  
export default function SetNewPassword() {
  const navigate  = useNavigate();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [inputs, setInputs] = useState({
    newPassword : '', 
    confirmPassword : '',
  });
  
  useEffect(() => {
    const location = window.location;
    setToken(location.search.split('=')[1].split('&')[0]);
    setEmail(location.search.split('=')[2]);
    }, [])

  const { newPassword, confirmPassword } = inputs;
  
  const handleInputValues = (e) => { 
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  const data = {
    "confirmPassword": confirmPassword,
    "email": email,
    "newPassword": newPassword,
    "token": token
  }

  const requesetNewPassword = async(e) => {
    e.preventDefault();
    try {
      const response = await instanceAxios.post('/auth/password/reset', data);
      if(response.status === 200) {
        alert(response.data.data);
        navigate('/');
      }
      console.log(response);
    }catch(err) {
      console.error(err);
    }
  }
    
  return (
    <Section>
         <h1 className="ir">새 비밀번호 설정 페이지</h1>
        <FindMemberBox>
          <Title>새 비밀번호 설정</Title>
          <SubMessage>새로운 비밀번호를 설정하고 DMPUSH를 이용하세요.</SubMessage>
          <FormStyle action="post" onSubmit={requesetNewPassword}>
            <div>
              <InputStyle
                onChange={handleInputValues}
                value={newPassword}
                type="password"
                name="newPassword"
                placeholder="새 비밀번호"
              />
            </div>
            <div>
              <InputStyle
                onChange={handleInputValues}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                placeholder="새 비밀번호 확인"
              />
            </div>
            {(!newPassword || !confirmPassword) &&
              <InactiveSetNewPasswordButton>
                비밀번호 변경하기
              </InactiveSetNewPasswordButton>
            }
            {(newPassword && confirmPassword) &&
              <ActiveSetNewasswordButton>
                비밀번호 변경하기
              </ActiveSetNewasswordButton>
            }
          </FormStyle>
        </FindMemberBox>
    </Section>
  )
}
