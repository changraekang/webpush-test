import styled from "styled-components";
import { InsertScriptBox } from "../../components/containers/homepage/HomepageBox";
import Layout from "../../templates/Layout";
import { InputGroup } from "../../components/inputs/InputGroups";
import UpdateProfile from "../../components/buttons/ProfileButtons";
import { instanceAxios } from "../../api/axios";
import { useEffect, useState } from "react";
import {
  grey1,
  grey4,
  primary4,
  error3,
  grey3,
  grey8,
  grey5,
  grey11
} from "../../constants/color";
import {
  SelectedHomepage,
  SelectHomepage,
  AfterCopy,
  BeforeCopy,
} from "../../components/buttons/HompageButtons";
import { useRecoilState } from "recoil";
import {
  AlertMessage,
  IsAlertOpen,
  MyCategory,
  MyProject,
  MyPushProject,
} from "../../atom/Atom";
import { async } from "q";
import { useRef } from "react";
const WrapInputs = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const LabelStyle = styled.label`
  display: flex;
  font-size: 16px;
  margin-bottom: 10px;
  /* width: 180px; */
`;
const WrapButton = styled.div`
  width: 180px;
  margin: 40px auto 0;
`;

const TopAlign = styled.ul`
  display: flex;
  gap: 10px;
  position: relative;
  margin-bottom: 40px;
  justify-content: space-between;

  ::after {
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    height: 2px;
    background-color: ${grey4};
    bottom: -20px;
    left: 0;
  }
`;

const WrapHomepages = styled.ul`
  display: flex;
  gap: 10px;
  position: relative;
  align-items: center;
`;

const TxtBox = styled.div`
  width: fit-content;
  background-color: ${grey3};
  border-radius: 8px;
  padding: 20px;
  font-size: 14px;
  color: ${grey8};
`;

const DemoArticle = styled.article`
  width: 500px;
  min-height: ;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 16px;
  background: ${grey1};
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
`

const DemoTitle = styled.p`
  color: ${(props) => (props.default ? `${grey5}` : `${grey11}`)};
  font-size: 18px;
  font-weight: 600;  
  padding-bottom:16px;
  white-space:normal;
`
const DemoCont = styled.p`
  color: ${(props) => (props.default ? `${grey5}` : `${grey11}`)};
  font-size: 16px; 
  white-space:normal;
  min-height: 20px;
`
const DemoBtnAlign = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: center;
  gap: 12px;"
`
const DemoBtn = styled.button`
  cursor: pointer;
  display: block;
  width: 100px;
  border: none;
  padding: 8px 6px;
  border-radius: 8px;
  background: ${primary4};
  color: ${grey1};
  font-size: 16px;
  font-weight: 600;
  text-align: center;"
`

export default function InsertPush() {
  const [myProject, setMyProject] = useRecoilState(MyProject);
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);
  const [pid, setPid] = useState(myPushProject.pid);

  // Alert Modal
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(IsAlertOpen);
  const [alertMessage, setAlertMessage] = useRecoilState(AlertMessage);

  // script
  const [script, setScript] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [copyScript, setCopyScript] = useState("");

  useEffect(() => {
    console.log(pid, "💕⚠️pid");
    console.log(myPushProject, "myPushProject🐰");
  }, [pid, myPushProject]);

  const getOneHomepage = async () => {
    try {
      const response = await instanceAxios.get(`/${pid}`);
      console.log("하나의 프로젝트⭐", response.data);
      if (response.status === 200) {
        setMyPushProject(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (pid) {
      getOneHomepage();
    }
  }, [pid]);

  const handleGetScript = async () => {
    try {
      const response = await instanceAxios.get(`/${pid}/resource`);
      console.log(response);
      if (response.status === 200) {
        console.log("출력하기 성공");
        setScript(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (pid) {
      handleGetScript();
    }
  }, [pid]);

  useEffect(() => {
    setCopyScript(
      `<script>let dmpush_title = "${title}";</script> \n` +
        `<script>let dmpush_content = "${content}";</script> \n` +
        script
    );
  }, [title, content]);

  const handleCopyScript = (text) => {
    try {
      if(!title || !content) {
        setIsAlertOpen(true);
        setAlertMessage("타이틀과 내용을 작성해주세요😃");
      } else {
        navigator.clipboard.writeText(text);
        setIsAlertOpen(true);
        setAlertMessage("클립보드에 복사되었습니다😆");
      }
    } catch (error) {
      setIsAlertOpen(true);
      setAlertMessage("복사에 실패하였습니다🥹");
    }
  };

  const handleCopytextAreaValue = () => {
    setCopyScript(
      `<script>let dmpush_title = "${title}";</script>` +
      `<script>let dmpush_content = "${content}";</script>` +
      script
    );
  };

  const handleRenderBtns = () => {
    return (
      <>
        {myProject?.map(({ name, pid }) => {
          if (pid === myPushProject.pid) {
            return (
              <li key={pid}>
                <SelectedHomepage
                  setValue={() => {
                    setPid(pid);
                  }}
                >
                  {name}
                </SelectedHomepage>
              </li>
            );
          } else {
            return (
              <li key={pid}>
                <SelectHomepage
                  setValue={() => {
                    setPid(pid);
                  }}
                >
                  {name}
                </SelectHomepage>
              </li>
            );
          }
        })}
      </>
    );
  };

  return (
    <Layout>
      <InsertScriptBox>
        <TopAlign>
          <WrapHomepages>{handleRenderBtns()}</WrapHomepages>
          {/* <GetScript>출력하기</GetScript> */}
        </TopAlign>
        {/* 오픈 팝업 데모 */}
        <DemoArticle>
          {title && <DemoTitle>{title}</DemoTitle>}
          {!title && <DemoTitle default>타이틀</DemoTitle>}
          {content && <DemoCont>{content}</DemoCont>}
          {!content && <DemoCont default>내용</DemoCont>}
          <DemoBtnAlign>
            <DemoBtn>다음에</DemoBtn>
            <DemoBtn>알림 받기</DemoBtn>
          </DemoBtnAlign>
        </DemoArticle>
        <WrapInputs>
          <LabelStyle htmlFor="link">타이틀</LabelStyle>
          <div>
            <InputGroup 
            type="text" 
            setValue={setTitle} 
            maxLength={20} 
            placeholder="최대 20자 입력 가능"
            />
          </div>
        </WrapInputs>
        <WrapInputs>
          <LabelStyle htmlFor="link">내용</LabelStyle>
          <div>
            <InputGroup 
            type="text" 
            setValue={setContent} 
            maxLength={100}
            placeholder="최대 100자 입력 가능"
            />
          </div>
        </WrapInputs>
        <WrapInputs>
          <TxtBox>
            <p id="title">
              {'<script>let dmpush_title = "'}
              {title}
              {'";</script>'}
            </p>
            <p id="content">
              {'<script>let dmpush_content = "'}
              {content}
              {'";</script>'}
            </p>
            <p>{script.split(" ")}</p>
          </TxtBox>
        </WrapInputs>
        <input
          onChange={handleCopytextAreaValue}
          type="text"
          value={copyScript}
          hidden
          readOnly
        />
        <WrapButton>
          {!script && <BeforeCopy>복사하기</BeforeCopy>}
          {script && (
            <AfterCopy
              handleCopyScript={() => {
                handleCopyScript(copyScript);
              }}
            >
              복사하기
            </AfterCopy>
          )}
        </WrapButton>
      </InsertScriptBox>
    </Layout>
  );
}