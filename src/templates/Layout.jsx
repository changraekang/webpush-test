import logo from "../assets/images/logo.png";
import mypageLogo from "../assets/images/mypage-logo.png";
import alarm from "../assets/images/alarm.png";
import styled from "styled-components";
import {
  grey3,
  grey1,
  primary4,
  primary5,
  grey5,
  grey10,
  grey11,
} from "../constants/color";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instanceAxios } from "../api/axios";
import { deviceDetect } from "react-device-detect";
import {
  getCookie,
  setAccessTokenToCookie,
  setRefreshTokenToCookie,
} from "../cookie/controlCookie";
import { logout } from "../cookie/controlCookie";
import { useRecoilState } from "recoil";
import { MyProfile } from "../atom/Atom";

const Header = styled.header`
  display: flex;
  font-family: "Pretendard-Regular";
`;
const Nav = styled.nav`
  padding: 40px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
  /* height: 100vh */
`;

const MainLogo = styled.img`
  width: 152px;
  height: 44px;
`;

const NavLi = styled.ul`
  margin-top: 61px;
`;
const ProLi = styled.ul``;

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
  background: ${grey3};

  padding: 21px;
`;

const LI = styled.li`
  margin-bottom: 32px;
`;

const A = styled.a`
  color: ${grey10};
`;

const SubNav = styled.ul`
  margin: 0 0 20px 30px;
`;

const SubLI = styled.li`
  color: ${grey10};
  margin-bottom: 20px;
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
  padding: 5px;
  cursor: pointer;
  font-weight: 900;
  color: ${grey10};
  margin-right: 20px;
  &:hover {
    background: ${grey3};
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
const MyProject = styled.ul`
  position: absolute;
  left: 220px;
  top: 55px;
  width: 105px;
  border-radius: 8px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.16);
  background-color: ${grey1};
  text-align: center;
  padding: 16px;
`;
const Logo = styled.img`
  width: 15px;
  height: 15px;
`;
const MyMenuLi = styled.li`
  cursor: pointer;
  margin: ${(props) => (props.first ? "12px 0 26px" : "14px 0")};
`;
const MyProLi = styled.li`
  cursor: pointer;
  padding-bottom: 3px;
  border-bottom: 1px solid ${grey11};
  margin: ${(props) => (props.first ? "12px 0 26px" : "14px 0")};
`;
//${(props) => (props.last ? "32px" : "16px")};

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openMyMenu, setOpenMyMenu] = useState(false);
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(0);
  const [refreshToken, setRefreshToken] = useState(getCookie("refreshToken"));
  const [myProfile, setMyProfile] = useRecoilState(MyProfile);
  const [project, setProject] = useState([]);
  useEffect(() => {
    if (!refreshToken) {
      // login yet
      navigate("/");
    } else {
      const checkProject = async () => {
        try {
          const response = await instanceAxios.get("/project/all");
          if (response.status === 200) {
            setProject(response.data);
          }
        } catch (err) {
          // login yet
          console.error(err);
        }
      };
      checkProject();
    }
    requestAccessToken(refreshToken);
  }, []);
  const handleOpenNav = () => {
    !openNav ? setOpenNav(true) : setOpenNav(false);
  };
  const handleOpenProject = () => {
    !openProject ? setOpenProject(true) : setOpenProject(false);
  };

  const handleOpenMyMenu = () => {
    !openMyMenu ? setOpenMyMenu(true) : setOpenMyMenu(false);
  };

  // refreshToken 재발급
  const logoutTimer = () => {
    logout();
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

  const requestAccessToken = async () => {
    try {
      const response = await instanceAxios.post("/auth/refresh", {
        refreshToken: refreshToken,
      });

      const tokenType = response.data.tokenType;
      const headersToken = tokenType + response.data.accessToken;
      setAccessTokenToCookie(headersToken);
      setRefreshTokenToCookie(response.data.refreshToken);
      setMinutes(8);
      setSeconds(59);
      instanceAxios.defaults.headers.common["Authorization"] = headersToken;
      console.log(response, "토큰 초기화");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Header>
      {/* 왼쪽 */}
      <Nav>
        <MainLogo src={logo} alt="메인 로고" />
        <NavLi>
          <LI>
            {minutes} : {seconds < 10 ? "0" + seconds : seconds}{" "}
            <div onClick={requestAccessToken}>
              <Logo src={alarm} alt="alarm"></Logo>
              로그인 연장하기
            </div>
          </LI>

          <LI>
            <LinkStyle to="/dashboard">대시보드</LinkStyle>
          </LI>
          <LI onClick={handleOpenNav}>
            <A href="#">PUSH 관리</A>
          </LI>
          {openNav && (
            <SubNav>
              <SubLI>
                <LinkStyle to="/makePush">push 작성</LinkStyle>
              </SubLI>
              <SubLI>
                <LinkStyle to="/pushList">push 리스트</LinkStyle>
              </SubLI>
            </SubNav>
          )}
        </NavLi>
      </Nav>

      {/* 오른쪽 */}
      <WrapRight>
        <TopHeader>
          <ProLi>
            <MyButton onClick={handleOpenProject}>홈페이지 관리</MyButton>
            {openProject ? (
              <MyProject>
                {project.map(({ name, pid }) => {
                  return <MyProLi key={pid}>{name}</MyProLi>;
                })}
              </MyProject>
            ) : null}
          </ProLi>
          <MyButton onClick={handleOpenMyMenu}>
            {myProfile.name}(master)
          </MyButton>
          {openMyMenu && (
            <MyMenu>
              <MyMenuLi first>MASTER</MyMenuLi>
              <MyMenuLi>
                <LinkStyle to="/myPage">마이프로필</LinkStyle>
              </MyMenuLi>
              <MyMenuLi>비밀변경</MyMenuLi>
              <MyMenuLi onClick={logout}>로그아웃</MyMenuLi>
            </MyMenu>
          )}
        </TopHeader>
        <main>{children}</main>
      </WrapRight>
    </Header>
  );
}
