import styled from "styled-components";
import { HomepageBox } from "../../components/containers/homepage/HomepageBox";
import Layout from "../../templates/Layout";
import { DropboxInput, InputGroup } from "../../components/inputs/InputGroups";
import UpdateProfile from "../../components/buttons/ProfileButtons";
import { instanceAxios } from "../../api/axios";
import { useEffect, useState } from "react";
import HompageButton, {
  DeleteHomepage,
  DeleteSelectedHomepage,
} from "../../components/buttons/HompageButtons";
import { grey1, grey4, primary4, error3 } from "../../constants/color";
import {
  SelectedHomepage,
  SelectHomepage,
  BeforeUpdateHomepage,
  AfterUpdateHomepage,
} from "../../components/buttons/HompageButtons";
import { useRecoilState } from "recoil";
import { CategoryDropbox } from "../../components/dropbox/dropbox";
import {
  AlertMessage,
  IsAlertOpen,
  MyProject,
  MyPushProject,
  MyCategory,
} from "../../atom/Atom";

const WrapInputs = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 380px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const LabelStyle = styled.label`
  display: flex;
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

const DeleteBtn = styled.button`
  color: ${error3};
  font-weight: 600;
`;

export default function Homepage() {
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const [myProject, setMyProject] = useRecoilState(MyProject);
  const [myCategory, setMyCategory] = useRecoilState(MyCategory);
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);
  const [homepage, setHomepage] = useState(myPushProject.name);
  const [pid, setPid] = useState(myPushProject.pid);
  const [link, setLink] = useState(myPushProject.projectUrl);
  const [cateogryName, setCategoryName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");

  // Alert Modal
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(IsAlertOpen);
  const [alertMessage, setAlertMessage] = useRecoilState(AlertMessage);

  const getOneHomepage = async () => {
    try {
      const response = await instanceAxios.get(`/${pid}`);
      console.log("????????? ???????????????", response.data);
      if (response.status === 200) {
        setMyPushProject(response.data);
        setHomepage(response.data.name);
        setLink(response.data.projectUrl);
        setCategoryName(myCategory[response.data.categoryCode - 1].name)
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

  const updateData = {
    code: categoryCode,
    name: homepage,
    projectUrl: link,
  };

  const updateHomePage = async (e) => {
    e.preventDefault();
    if (window.confirm("???????????? ????????? ?????????????????????????????")) {
      try {
        const response = await instanceAxios.put(`/${myPushProject.pid}`,
          updateData
        );
        if (response.status === 200) {
          // setIsAlertOpen(true);
          // setAlertMessage("??????????????? ????????? ?????????????????????.????");
          // handlePushProject();
        }
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteHomePage = async (e) => {
    e.preventDefault();
    if (window.confirm("?????? ??????????????? ?????????????????????????")) {
      try {
        const response = await instanceAxios.delete(
          `/${myPushProject.pid}`
        );
        if (response.status === 200) {
          setIsAlertOpen(true);
          setAlertMessage("??????????????? ?????????????????????.??????");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const renderSubmitButton = () => {
    if (
      myPushProject.projectUrl === link &&
      myPushProject.name === homepage &&
      myCategory[myPushProject.categoryCode - 1]?.name === cateogryName
    ) {
      return <BeforeUpdateHomepage>??????</BeforeUpdateHomepage>;
    } else {
      return (
        <AfterUpdateHomepage updateHomePage={updateHomePage}>
          ??????
        </AfterUpdateHomepage>
      );
    }
  };
  const renderHomepageList = () => {
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

  const handleClickDropbox = () => {
    isOpenDrop ? setIsOpenDrop(false) : setIsOpenDrop(true);
  };

  const handleClickDropItem = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
    setCategoryCode(e.target.id);
    setIsOpenDrop(false);
  };

  return (
    <Layout>
      <HomepageBox>
        <TopAlign>
          <WrapHomepages>{renderHomepageList()}</WrapHomepages>
          {myPushProject.expiryDate ? (
            <>{myPushProject.expiryDate.slice(0, 10)}??? ?????? ???????????????</>
          ) : (
            <DeleteBtn onClick={deleteHomePage}>????????????</DeleteBtn>
          )}
        </TopAlign>
        <form action="post">
          <WrapInputs>
            <LabelStyle htmlFor="homepage">???????????????</LabelStyle>
            <div>
              <InputGroup
                type="text"
                value={homepage}
                id="homepage"
                setValue={setHomepage}
              />
            </div>
          </WrapInputs>
          <WrapInputs>
            <LabelStyle htmlFor="link">??????????????????</LabelStyle>
            <div>
              <InputGroup
                type="text"
                value={link}
                id="link"
                setValue={setLink}
              />
            </div>
          </WrapInputs>
          <WrapInputs>
            <LabelStyle htmlFor="category">????????????</LabelStyle>
            <div>
              <DropboxInput
                type="text"
                value={cateogryName}
                id="category"
                readOnly={true}
                handleClick={handleClickDropbox}
              />
            </div>
            {isOpenDrop && (
              <CategoryDropbox
                arrList={myCategory}
                ver="40px"
                hor="174px"
                width="205px"
                handleClick={handleClickDropItem}
              />
            )}
          </WrapInputs>
          {myPushProject.expiryDate ? null : (
            <WrapButton>{renderSubmitButton()}</WrapButton>
          )}
        </form>
      </HomepageBox>
    </Layout>
  );
}
