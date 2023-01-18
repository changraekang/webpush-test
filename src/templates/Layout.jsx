import logo from "../assets/images/logo.png";
import mypageLogo from "../assets/images/mypage-logo.png";
import alarm from "../assets/images/alarm.png";
import plus from "../assets/images/plus.png";
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
} from "../constants/color";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  IsOpenModal,
} from "../atom/Atom";
import ProjectModal from "../components/modals/ProjectModal";
import settingHomepage from "../assets/images/homepageSetting.png";

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
  align-items: start;
  justify-content: space-between;
  background: ${grey1};
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.05);
  padding: 21px;
  z-index: 4;
`;

const LI = styled.li`
  margin-bottom: 16px;
`;

const A = styled.a`
  color: ${grey10};
`;

const SubNav = styled.ul`
  margin: 0 0 20px 30px;
`;

const SubLI = styled.li`
  color: ${grey10};
  margin-bottom: 12px;
`;
const LinkStyle = styled(Link)`
  color: ${grey10};
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
    background: ${grey4};
    border-radius: 8px;
  }
`;

const MyMenu = styled.ul`
  position: absolute;
  right: 20px;
  top: 55px;
  width: 105px;
  border-radius: 8px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.16);
  background-color: ${grey1};
  text-align: center;
  padding: 16px;

  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 80%;
    height: 2px;
    background-color: ${grey10};
    left: 15px;
    top: 55px;
  }
`;

const WrapBell = styled.div`
  cursor: pointer;
  margin-bottom: 45px;
  font-size: 14px;
  color: ${grey7};
`;

const Bell = styled.img`
  width: 10px;
  height: 11px;
  margin: 8px 8px 0 0;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  padding: 0 8px;
  cursor: pointer;
`;

const MyMenuLi = styled.li`
  cursor: pointer;
  margin: ${(props) => (props.first ? "12px 0 26px" : "14px 0")};
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
const ProjectSelectOptions = styled.button`
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  color: ${grey1};
  background-color: ${primary4};
  cursor: pointer;
`;

export default function Layout({ children }) {
  const [myCategory, setMyCategory] = useRecoilState(MyCategory);
  const navigate = useNavigate();
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isOpenMyMenu, setIsOpenMyMenu] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isOpenMobal, setIsOpenModal] = useState(false);
  //const [isOpenMobal, setIsOpenModal] = useRecoilState(IsOpenModal); recoil 나중에 다시 한번 시도
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [refreshToken, setRefreshToken] = useState(getCookie("refreshToken"));
  const [myProfile, setMyProfile] = useRecoilState(MyProfile);
  const [myProject, setMyProject] = useRecoilState(MyProject);
  const [myPushProject, setMyPushProject] = useRecoilState(MyPushProject);

  const requestAccessToken = async () => {
    try {
      const response = await instanceAxios.post("/auth/refresh", {
        refreshToken: refreshToken,
      });

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
        const response = await instanceAxios.get("/project/all");
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
  const handlePushProject = (categoryCode, pid, name, projectUrl) => {
    handleOpenPushProject();
    let body = {
      categoryCode: categoryCode,
      projectUrl: projectUrl,
      pid: pid,
      name: name,
    };
    setMyPushProject(body);
  };

  const handleAddProject = () => {
    if (myProject.length > 2) {
      alert("프로젝트는 3개까지 가능합니다.");
    } else {
      setIsOpenModal(true);
    }
  };

  // refreshToken 재발급
  const logoutTimer = () => {
    logoutSession();
    alert("세션이 만료되었습니다.");
    navigate("/");
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
                <LinkStyle to="/makePush">push 작성</LinkStyle>
              </SubLI>
              <SubLI>
                <LinkStyle to="/pushList">push 리스트</LinkStyle>
              </SubLI>
            </SubNav>
          )}
          <LI>
            <LinkStyle to="/insertPush">Push 설정</LinkStyle>
          </LI>
        </NavLi>
      </Nav>

      {/* 오른쪽 */}
      <WrapRight>
        <TopHeader>
          <ProLi>
            {myProject.map(({ categoryCode, pid, name, projectUrl }) => {
              if (pid !== myPushProject.pid) {
                return (
                  <li
                    key={pid}
                    onClick={() =>
                      handlePushProject(categoryCode, pid, name, projectUrl)
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
            })}
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
            {myProfile.name}(master)
          </MyButton>
          {isOpenMyMenu && (
            <MyMenu>
              <MyMenuLi first>MASTER</MyMenuLi>
              <MyMenuLi>
                <LinkStyle to="/myPage">마이프로필</LinkStyle>
              </MyMenuLi>
              <MyMenuLi>
                <LinkStyle to="/myPage/newPassword">비밀번호 변경</LinkStyle>
              </MyMenuLi>
              <MyMenuLi onClick={logout}>로그아웃</MyMenuLi>
            </MyMenu>
          )}
        </TopHeader>
        <main>{children}</main>
      </WrapRight>
    </Header>
  );
}
