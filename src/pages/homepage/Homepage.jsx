import styled from "styled-components";
import HomepageBox from "../../components/containers/homepage/HomepageBox";
import Layout from '../../templates/Layout';
import { InputGroup } from '../../components/inputs/InputGroups'
import UpdateProfile from '../../components/buttons/ProfileButtons';
import { instanceAxios } from '../../api/axios';
import { useEffect, useState } from 'react';
import HompageButton from "../../components/buttons/HompageButtons";
import { grey1, grey4, primary4 } from "../../constants/color";
import {SelectHomepage, UpdateHomepage} from "../../components/buttons/HompageButtons";
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

const WrapHomepages = styled.ul`
  display: flex;
  gap: 10px;
  position: relative;
  margin-bottom: 40px;

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

export default function Homepage() {
  const [projectArr, setProjectArr] = useState([]);
  const [homepage, setHomepage] = useState('');
  const [link, setLink] = useState('');
  const [cateogry, setCategory] = useState('');
  const [pid, setPid] = useState('');
  console.log("pid💙💙", pid)
  console.log(projectArr, "projectArr🐰")
  

  const getOneHomepage = async() => {
    try{
      const response = await instanceAxios.get(`/project/${pid}`);
      console.log("하나의 프로젝트⭐" , response.data);
      if(response.status === 200) {
        const data = response.data;   
        setHomepage(data.name);
        setLink(data.projectUrl);
        setCategory(data.categoryCode);
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

  const getHomepageAll = async() => {
    try{
      const response = await instanceAxios.get('/project/all');
      console.log("프로젝트 불러오기" , response.data);
      const data = response.data;   
      if(response.status === 200) {
        setProjectArr(response.data);
        setPid(response.data[0].pid);
        if(pid === '') {
          setHomepage(data[0].name);
          setLink(data[0].projectUrl);
          setCategory(data[0].categoryCode);
        }
      }
    } catch (err) {
        console.error(err);
    }
  }
    
    useEffect(() => {
      getHomepageAll();
    }, [])

  const updateData = {
    "code": cateogry,
    "name": homepage,
    "projectUrl": link
  }  

  const updateHomePage = async(e) => {
    e.preventDefault()
    try{
      const response = await instanceAxios.put(`/project/${pid}`, updateData);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Layout>
      <HomepageBox>
        <WrapHomepages>
          {projectArr?.map(({name, pid})=> {
            return (
              <li key={pid}>
                <SelectHomepage setValue={()=> {setPid(pid);}}>
                  {name}
                </SelectHomepage >
              </li>
            ) 
          })}
        </WrapHomepages>
      <form action="post">
        <WrapInputs>
          <LabelStyle htmlFor="homepage">홈페이지명</LabelStyle>
          <div>
          <InputGroup 
          type="text" 
          id='homepage' 
          value={homepage === undefined ? '' : homepage} 
          setValue={setHomepage}
          />
          </div>
        </WrapInputs>
        <WrapInputs>
          <LabelStyle htmlFor="link">홈페이지주소</LabelStyle>
          <div>
          <InputGroup 
          type="text" 
          id='link' 
          value={link === undefined ? '' : link} 
          setValue={setLink}
          />
          </div>
        </WrapInputs>
        <WrapInputs>
          <LabelStyle htmlFor="category">카테고리</LabelStyle>
          <div>
          <InputGroup 
          type="text" 
          id='category' 
          value={cateogry === undefined ? '' : cateogry} 
          setValue={setCategory}
          />
          </div>
        </WrapInputs>
          <WrapButton>
          <UpdateHomepage updateHomePage={updateHomePage}>수정</UpdateHomepage>
          </WrapButton>
        </form>
      </HomepageBox>
    </Layout>
  )
}
