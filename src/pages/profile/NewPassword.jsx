import styled from 'styled-components'
import {PasswordBox} from '../../components/containers/profile/ProfileBox'
import { error3 } from '../../constants/color'
import Layout from '../../templates/Layout';
import { InputGroup, InputValidateGroup } from '../../components/inputs/InputGroups'
import {UpdatePasswordBtn} from '../../components/buttons/ProfileButtons';
import { instanceAxios } from '../../api/axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { MyProfile } from '../../atom/Atom';

const WrapInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 380px;
  /* gap: 180px; */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const LabelStyle = styled.label`
  display: flex;
  /* width: 180px; */
`
const WrapButton = styled.div`
  width: 180px;
  margin: 40px auto 0;
`
const LabelWarning = styled.span`
  display: block;
  color: ${error3};
  font-size: 12px;
  margin: 8px 0 0;
`;

export default function NewPassword() {
  const [myProfile, setMyProfile] = useRecoilState(MyProfile)
  const [email, setEmail] = useState(myProfile.email);
  const [confimPassword, setConfimPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const handleValidPassword = (e) => {
    setNewPassword(e.target.value);
    if (e.target.name === "newPassword") {
      const regex = /(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()+|=-])(?=.*[0-9]).{8,25}/;
      if (regex.test(e.target.value)) {
        setNewPassword(e.target.value);
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
   }
  }


  const updateData = {
    "email": email,
    "confimPassword": confimPassword,
    "currentPassword": currentPassword,
    "newPassword": newPassword,
  }

  const updatePassword = async(e) => {
    e.preventDefault();
    if(window.confirm('비밀번호를 수정하시겠습니까?')) {
      try{
        const response = await instanceAxios.put('/member/password/update', updateData)
        console.log(response, "비밀번호 변경 api");
        const data = response.data; 
        if(response.status === 200) {
          // setEmail(data.email);
          // setPhone(data.phone);
          // setCompany(data.company);
          alert('성공적으로 비밀번호를 수정하였습니다.🎉');
          window.location.reload();
        }
      } catch (err) {
          console.error(err);
      }
    }
  }
  return (
    <Layout>
        <PasswordBox>
        <form action="post">
          <WrapInputs>
            <LabelStyle htmlFor="currentPassword">기존 비밀번호</LabelStyle>
            <div>
              <InputGroup 
              type="password"
              id='currentPassword' 
              value={currentPassword === undefined ? '' : currentPassword} 
              setValue={setCurrentPassword}
              />
            </div>
          </WrapInputs>
          <WrapInputs>
            <LabelStyle htmlFor="newPassword">새 비밀번호</LabelStyle>
            <div>
              <InputValidateGroup 
              type="password" 
              id='newPassword' 
              name='newPassword' 
              value={newPassword === undefined ? '' : newPassword} 
              placeholder="한글, 영문, 특수문자 포함 8자 이상"
              setValue={handleValidPassword}
              />
              {!isValidPassword && newPassword && <LabelWarning>한글, 영문, 특수문자 포함한 8자 이상</LabelWarning>}
            </div>
          </WrapInputs>
          <WrapInputs>
            <LabelStyle htmlFor="confimPassword">새비밀번호 확인</LabelStyle>
            <div>
              <InputGroup 
              type="password" 
              id='confimPassword' 
              value={confimPassword === undefined ? '' : confimPassword} 
              setValue={setConfimPassword}
              />
              { confimPassword != newPassword && confimPassword && <LabelWarning>비밀번호가 일치하지 않습니다.</LabelWarning>}
            </div>
          </WrapInputs>
            <WrapButton>
              <UpdatePasswordBtn updatePassword={updatePassword}>수정</UpdatePasswordBtn>
            </WrapButton>
        </form>
      </PasswordBox>
    </Layout>
  )
}
