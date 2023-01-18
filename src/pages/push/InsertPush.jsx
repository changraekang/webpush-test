import styled from "styled-components";
import {InsertScriptBox} from "../../components/containers/homepage/HomepageBox";
import Layout from '../../templates/Layout';
import { InputGroup } from '../../components/inputs/InputGroups'
import UpdateProfile from '../../components/buttons/ProfileButtons';
import { instanceAxios } from '../../api/axios';
import { useEffect, useState } from 'react';
import { grey1, grey4, primary4, error3 } from "../../constants/color";
import {SelectedHomepage, SelectHomepage, AfterCopy, BeforeCopy} from "../../components/buttons/HompageButtons";
import { useRecoilState } from "recoil";
import { MyCategory, MyProject, MyPushProject } from "../../atom/Atom";
import { async } from "q";
const WrapInputs = styled.div`
  width: 100%;
  margin-bottom: 12px;
`

const LabelStyle = styled.label`
  display: flex;
  font-size: 16px;
  margin-bottom: 10px;
  /* width: 180px; */
`
const WrapButton = styled.div`
  width: 180px;
  margin: 40px auto 0;
`

const TopAlign = styled.ul`
  display: flex;
  gap: 10px;
  position: relative;
  margin-bottom: 40px;
  justify-content: space-between;

    ::after {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${grey4};
    bottom: -20px;
    left: 0;
  }
`

const WrapHomepages = styled.ul`
  display: flex;
  gap: 10px;
  position: relative;
  align-items: center;
`

 const GetScript = styled.button`
  color: ${error3};
  font-weight: 600;
 `

export default function InsertPush() {
  const [myProject, setMyProject] = useRecoilState(MyProject);
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);
  const [pid, setPid] = useState(myPushProject.pid);
  const [script, setScript] = useState('');

  useEffect(() => {
      console.log(pid, "💕⚠️pid");
      console.log(myPushProject, "myPushProject🐰");
}, [pid, myPushProject])

  const getOneHomepage = async() => {
  try{
    const response = await instanceAxios.get(`/project/${pid}`);
      console.log("하나의 프로젝트⭐" , response.data);
      if(response.status === 200) {
        setMyPushProject(response.data);
      }    
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
  if(pid) {
      getOneHomepage()
  }
  }, [pid])


  const handleGetScript = async() => {
      try {
      const response = await instanceAxios.get(`/project/${pid}/resource`);
      console.log(response);
      if(response.status === 200) {
          console.log('출력하기 성공');
          setScript(response.data);
      }
      } catch (err) {
      console.error(err);
      }
  }
  
  const handleCopyScript = (text) => {
    try {
        navigator.clipboard.writeText(text);
        alert('클립보드에 복사되었습니다.');
      } catch (error) {
        alert('클립보드 복사에 실패하였습니다.');
      }
  }

  const handleRenderBtns = () => {
    return (
      <>
        {myProject?.map(({name, pid})=> {
          if(pid === myPushProject.pid) {
            return (
              <li key={pid}>
              <SelectedHomepage setValue={()=> {setPid(pid);}}>
                  {name}
              </SelectedHomepage >
              </li>
            )
          } else {
            return (
              <li key={pid}>
              <SelectHomepage setValue={()=> {setPid(pid);}}>
                  {name}
              </SelectHomepage >
              </li>
            )
          }
        })}
      </>
    )
  }

  return (
    <Layout>
      <InsertScriptBox>
        <TopAlign>
          <WrapHomepages>
            {handleRenderBtns()}
          </WrapHomepages>
          <GetScript onClick={handleGetScript}>출력하기</GetScript>
        </TopAlign>
        <WrapInputs>
          <LabelStyle htmlFor="script">스크립트</LabelStyle>
          <InputGroup 
          type="text" 
          id='script' 
          value={script}
          />
        </WrapInputs>
        <WrapButton>
            {!script && <BeforeCopy>복사하기</BeforeCopy>}
            {script && <AfterCopy handleCopyScript={()=> {handleCopyScript(script)}}>복사하기</AfterCopy>}
        </WrapButton>
      </InsertScriptBox>
    </Layout>
  )
}
