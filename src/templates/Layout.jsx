import logo from "../assets/images/logo.png";
import mypageLogo from "../assets/images/mypage-logo.png";
import alarm from "../assets/images/alarm.png";
import plus from "../assets/images/plus.png";
import member from "../assets/images/member.png";
import logoutIcon from "../assets/images/logout.png";
import profile from "../assets/images/profile.png";
import password from "../assets/images/password.png";
import styled from "styled-components";
import {
  grey3,
  grey1,
  primary4,
  primary5,
  grey7,
  grey10,
  grey11,
  grey4,
  grey5,
  grey6,
  primary1,
  grey9,
} from "../constants/color";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instanceAxios } from "../api/axios";
import { deviceDetect } from "react-device-detect";
import {
  getCookie,
  logoutSession,
  setAccessTokenToCookie,
  setRefreshTokenToCookie,
} from "../cookie/controlCookie";
import { logout } from "../cookie/controlCookie";
import { useRecoilState } from "recoil";
import {
  MyCategory,
  MyProfile,
  MyProject,
  MyPushProject,
  IsAlertOpen,
  AlertMessage,
  AlertCode,
} from "../atom/Atom";
import ProjectModal from "../components/modals/ProjectModal";
import settingHomepage from "../assets/images/homepageSetting.png";
import AlertModal from "../components/modals/AlertModal";

const Header = styled.header`
  display: flex;
  font-family: "Pretendard-Regular";
`;

const Nav = styled.nav`
  padding: 40px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.05);
  z-index: 5;
`;

const MainLogo = styled.img`
  width: 152px;
`;

const NavLi = styled.ul`
  margin-top: 61px;
`;
const ProLi = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const WrapRight = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: space-between;
  flex-grow: 1;
`;

const TopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${grey1};
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.05);
  padding: 21px;
  z-index: 4;
`;

const LI = styled.li`
  margin-bottom: 16px;
  font-weight: 600;
`;

const A = styled.a`
  color: ${grey10};
`;

const SubNav = styled.ul`
  background: ${grey3};
  padding: 14px 14px 2px;
  border-radius: 8px;
  margin: -6px 0 16px;
`;

const SubLI = styled.li`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
`;
const LinkStyle = styled(Link)`
  color: ${(props) => (props.sub ? `${grey7}` : `${grey9}`)};
`;

const MyButton = styled.button`
  position: relative;
  display: block;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  float: right;
  padding: 6px 8px;
  cursor: pointer;
  font-weight: 900;
  color: ${grey10};
  margin-right: 20px;
  &:hover {
    /* background: ${grey3}; */
    border-radius: 8px;
  }
`;

const MyMenu = styled.ul`
  width: 150px;
  position: absolute;
  right: 20px;
  top: 58px;
  border-radius: 8px;
  box-shadow: 3px -3px 50px rgba(0, 0, 0, 0.13);
  background-color: ${grey1};
  text-align: center;
  padding: 16px;

  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 80%;
    height: 1px;
    background-color: ${grey5};
    left: 15px;
    top: 55px;
  }

  &::before {
    display: block;
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    border-bottom: 28px solid ${grey1};
    border-left: 0px solid transparent;
    border-right: 28px solid transparent;
    right: 0;
    top: -14px;
    transform: rotate(270deg);
  }
`;

const WrapBell = styled.div`
  cursor: pointer;
  margin-bottom: 45px;
  font-size: 14px;
  color: ${grey7};
`;

const Bell = styled.img`
  width: 13px;
  height: 13px;
  margin: 8px 4px 0 0;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  padding: 0 8px;
  cursor: pointer;
`;

const MyMenuLi = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${(props) => (props.first ? `${grey10}` : ` ${grey7}`)};
  margin: ${(props) => (props.first ? "12px 0 26px" : "16px 0")};
  justify-content: ${(props) => (props.first ? "center" : "")};
`;

const MyMenuIcon = styled.img`
  width: ${(props) => (props.profileIcon ? "18px" : "15px")};
`;

const ProjectOptions = styled.li`
  padding: 6px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${primary4};
  border-bottom: 3px solid ${grey1};
  cursor: pointer;
  &:hover {
    border-bottom: 3px solid ${primary4};
  }
`;
const ProjectEXpiredOptions = styled.li`
  padding: 6px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${primary1};
  background-color: ${grey4};
  border-bottom: 3px solid ${grey1};
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    border-bottom: 3px solid ${primary4};
  }
`;
const ProjectSelectOptions = styled.button`
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  color: ${grey1};
  background-color: ${primary4};
  cursor: pointer;
`;
const ProjectExpiredSelectOptions = styled.button`
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  color: ${grey1};
  background-color: ${grey10};
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 30px;
`;

export default function Layout({ children }) {
  const [myCategory, setMyCategory] = useRecoilState(MyCategory);
  const navigate = useNavigate();
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isOpenMyMenu, setIsOpenMyMenu] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isOpenMobal, setIsOpenModal] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [refreshToken, setRefreshToken] = useState(getCookie("refreshToken"));
  const [myProfile, setMyProfile] = useRecoilState(MyProfile);
  const [myProject, setMyProject] = useRecoilState(MyProject);
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);

  // Alert Modal
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(IsAlertOpen);
  const [alertMessage, setAlertMessage] = useRecoilState(AlertMessage);
  const [alertCode, setAlertCode] = useRecoilState(AlertCode);

  const para = document.location.href;
  const params = para.search("pushdetail");
  const requestAccessToken = async () => {
    try {
      const response = await instanceAxios.post("/auth/refresh", {
        refreshToken: refreshToken,
      });
      setMinutes(4);
      setSeconds(59);
      const tokenType = response.data.tokenType;
      const headersToken = tokenType + response.data.accessToken;
      setAccessTokenToCookie(headersToken);
      setRefreshTokenToCookie(response.data.refreshToken);
      instanceAxios.defaults.headers.common["Authorization"] = headersToken;
      console.log(response, "토큰 초기화");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const checkAccount = async () => {
      try {
        const response = await instanceAxios.post("/member/me");
        if (response.status === 200) {
          console.log(response, "회원확인");
        }
      } catch (err) {
        // login yet
        navigate("/");
        console.error(err);
      }
    };
    const getCategory = async () => {
      try {
        const response = await instanceAxios.get("/category/all");
        setMyCategory(response.data);
        // console.log(myCategory, "🍓");
      } catch (err) {
        console.error(err);
      }
    };

    const checkProject = async () => {
      try {
        const response = await instanceAxios.get("/all");
        if (response.status === 200) {
          setMyProject(response.data);
          if (response.data.length === 0) {
            setIsOpenModal(true);
          }
        }
      } catch (err) {
        // login yet
        console.error(err);
      }
    };
    checkProject();
    if (!refreshToken) {
      // login yet
      navigate("/");
    } else {
      checkAccount();
    }
    getCategory();
    requestAccessToken(refreshToken);
    console.log(params, "주소");
  }, []);
  const handleOpenNav = () => {
    !isOpenNav ? setIsOpenNav(true) : setIsOpenNav(false);
  };
  const handleOpenPushProject = () => {
    !isProjectOpen ? setIsProjectOpen(true) : setIsProjectOpen(false);
  };

  const handleOpenMyMenu = () => {
    !isOpenMyMenu ? setIsOpenMyMenu(true) : setIsOpenMyMenu(false);
  };
  const handlePushProject = (
    categoryCode,
    pid,
    name,
    projectUrl,
    expiryDate
  ) => {
    handleOpenPushProject();
    let body = {
      categoryCode: categoryCode,
      projectUrl: projectUrl,
      pid: pid,
      name: name,
      expiryDate: expiryDate,
    };
    setMyPushProject(body);
  };

  const handleAddProject = () => {
    if (myProject.length > 2) {
      setIsAlertOpen(true);
      setAlertMessage("프로젝트는 3개까지 가능합니다.⚠️");
    } else {
      setIsOpenModal(true);
    }
  };

  // refreshToken 재발급
  const logoutTimer = () => {
    window.localStorage.removeItem("recoil-persist");
    logoutSession();
    setIsAlertOpen(true);
    setAlertMessage("세션이 만료되었습니다.🤷‍♂️");
    setAlertCode(1);
  };
  const handlelogout = () => {
    setAlertMessage("로그아웃 성공🎉");
    setIsAlertOpen(true);
    setAlertCode(2);
    logout();
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          logoutTimer();
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <Header>
      {/* 왼쪽 */}

      <Nav>
        {isOpenMobal && <ProjectModal setClose={setIsOpenModal} />}
        <Link to="/dashboard">
          <MainLogo src={logo} alt="메인 로고" />
        </Link>
        <NavLi>
          <LI>
            <WrapBell onClick={requestAccessToken}>
              <p>
                {minutes} : {seconds < 10 ? "0" + seconds : seconds}
              </p>
              <Bell src={alarm} alt="alarm" />
              로그인 연장하기
            </WrapBell>
          </LI>
          <LI>
            <LinkStyle to="/dashboard">대시보드</LinkStyle>
          </LI>
          <LI onClick={handleOpenNav}>
            <A href="#">PUSH 관리</A>
          </LI>
          {isOpenNav && (
            <SubNav>
              <SubLI>
                <LinkStyle sub to="/makePush">
                  PUSH 작성
                </LinkStyle>
              </SubLI>
              <SubLI>
                <LinkStyle sub to="/pushList">
                  PUSH 리스트
                </LinkStyle>
              </SubLI>
            </SubNav>
          )}
          <LI>
            <LinkStyle to="/insertPush">PUSH 설정</LinkStyle>
          </LI>
        </NavLi>
      </Nav>

      {/* 오른쪽 */}
      <WrapRight>
        <TopHeader>
          <ProLi>
            {myProject.map(
              ({ categoryCode, pid, name, projectUrl, expiryDate }) => {
                if (params > 0) {
                  return null;
                } else if (expiryDate) {
                  if (pid !== myPushProject.pid) {
                    return (
                      <li
                        key={pid}
                        onClick={() =>
                          handlePushProject(
                            categoryCode,
                            pid,
                            name,
                            projectUrl,
                            expiryDate
                          )
                        }
                      >
                        <button>
                          <ProjectEXpiredOptions>{name}</ProjectEXpiredOptions>
                        </button>
                      </li>
                    );
                  } else {
                    return (
                      <li key={pid}>
                        <ProjectExpiredSelectOptions>
                          {name}
                        </ProjectExpiredSelectOptions>
                      </li>
                    );
                  }
                } else {
                  if (pid !== myPushProject.pid) {
                    return (
                      <li
                        key={pid}
                        onClick={() =>
                          handlePushProject(
                            categoryCode,
                            pid,
                            name,
                            projectUrl,
                            expiryDate
                          )
                        }
                      >
                        <button>
                          <ProjectOptions>{name}</ProjectOptions>
                        </button>
                      </li>
                    );
                  } else {
                    return (
                      <li key={pid}>
                        <ProjectSelectOptions>{name}</ProjectSelectOptions>
                      </li>
                    );
                  }
                }
              }
            )}
            <Icon src={plus} alt="plus" onClick={handleAddProject} />
            <Icon
              src={settingHomepage}
              alt="홈페이지 관리하기"
              onClick={() => {
                navigate("/homepage");
              }}
            />
          </ProLi>
          <MyButton onClick={handleOpenMyMenu}>
            <ProfileImg src={member} alt="프로필 버튼 사진" />
            {myProfile.name}
            {isOpenMyMenu && (
              <MyMenu>
                <MyMenuLi first>{myProfile.email}</MyMenuLi>
                <MyMenuLi>
                  <MyMenuIcon
                    profileIcon={true}
                    src={profile}
                    alt="내 정보 아이콘"
                  />
                  <LinkStyle to="/myPage">내 정보</LinkStyle>
                </MyMenuLi>
                <MyMenuLi>
                  <MyMenuIcon src={password} alt="비밀번호 변경 아이콘" />
                  <LinkStyle to="/myPage/newPassword">비밀번호 변경</LinkStyle>
                </MyMenuLi>
                <MyMenuLi logout>
                  <MyMenuIcon src={logoutIcon} alt="로그아웃 아이콘" />
                  <LinkStyle onClick={handlelogout}>로그아웃</LinkStyle>
                </MyMenuLi>
              </MyMenu>
            )}
          </MyButton>
        </TopHeader>
        <main>{children}</main>
      </WrapRight>
      {/* alert */}
      {isAlertOpen && <AlertModal></AlertModal>}
      {/* alert */}
    </Header>
  );
}
