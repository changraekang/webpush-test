import logo from '../assets/images/logo.png';
import mypageLogo from '../assets/images/mypage-logo.png';
import styled from 'styled-components';
import {NAV_MY_MENU_HOVER_COLOR, NAV_MY_MENU_LINE_COLOR,NAV_MY_MENU_COLOR, SIDE_NAV_COLOR ,NAV_FONT_HOVER_COLOR,NAV_MAIN_COLOR,NAV_BUTTON_HOVER_COLOR,NAV_FONT_COLOR} from '../constants/color';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { instanceAxios } from '../api/axios';
import {deviceDetect} from "react-device-detect";
import { getCookie, setAccessTokenToCookie, setRefreshTokenToCookie } from '../cookie/controlCookie';
import { logout } from '../cookie/controlCookie';

const Header = styled.header`
  display: flex;
  font-family: 'Pretendard-Regular';
`
const Nav = styled.nav`
  background: ${SIDE_NAV_COLOR};
  color: ${NAV_FONT_COLOR};
  padding: 40px;
  /* height: 100vh */
`

const MainLogo = styled.img`
  width: 152px;
  height: 44px;
`

const NavLi = styled.ul`
  margin-top: 61px;
`

const WrapRight = styled.div`
  display:flex;
  flex-direction: column;
  flex-grow: 1;
`

const TopHeader = styled.div`
  background: ${NAV_MAIN_COLOR};
  padding: 21px;
`

const LI = styled.li`
  margin-bottom: 32px;
  `
  
const A = styled.a`
color: ${NAV_FONT_COLOR};

&:hover {
  color : ${NAV_FONT_HOVER_COLOR};
}
`

const SubNav = styled.ul`
  margin: 0 0 20px 30px;
`

const SubLI = styled.li`
  margin-bottom:20px;
`

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
  color:${NAV_MY_MENU_COLOR};
  margin-right: 20px;
  &:hover {
    background: ${NAV_MY_MENU_HOVER_COLOR};
    border-radius: 8px;
  }
`

const MyMenu = styled.ul`
  position: absolute;
  right: 20px;
  top: 55px;
  width: 105px;
  border-radius: 8px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.16);
  background-color: ${NAV_MY_MENU_COLOR};
  text-align: center;
  padding: 16px;

  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 80%;
    height: 2px;
    background-color: ${NAV_MY_MENU_LINE_COLOR};
    left: 15px;
    top: 55px;
  }
`
const MyMenuLi = styled.li`
  cursor: pointer;
  margin: ${(props) => (props.first ? "12px 0 26px" : "14px 0")};
`
//${(props) => (props.last ? "32px" : "16px")};

export default function Layout({children}) {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [openMyMenu, setOpenMyMenu] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  const handleOpenNav = () => {
    !openNav ? setOpenNav(true) : setOpenNav(false)
  }

  const handleOpenMyMenu = () => {
    !openMyMenu ? setOpenMyMenu(true) : setOpenMyMenu(false)
  }

  const [browserName, setBrowserName] = useState("");
  useEffect(()=> {
    setBrowserName(deviceDetect().browserName.toUpperCase());
    if(browserName === "CHOROME" || "SAFARI" || "EDGE" || "OPERA" || "FIREFOX" || "INTERNET EXPLORER") {
     setBrowserName("PC");
    } 
    console.log("브라우저 이름 : ", browserName);
  },[browserName]);

  // refreshToken 재발급
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const logoutTimer = () => {
    if(accessToken && refreshToken) {
      logout();
      alert('세션이 만료되었습니다.');
      navigate("/");
    }
  }  

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

  const requestAccessToken = async (token) => {
    try{
      const response = await instanceAxios.post('/auth/refresh', {
        "refreshToken" : token,
      });
      const tokenType = response.data.tokenType;
      const headersToken = tokenType + response.data.accessToken;
      setAccessTokenToCookie(headersToken);
      setRefreshTokenToCookie(response.data.refreshToken);
      instanceAxios.defaults.headers.common['Authorization'] = headersToken;
      console.log(response,"토큰 초기화"); 
    } catch (err){
      console.error(err)
    }
  }
  
  useEffect(() => {
    requestAccessToken(refreshToken);
  }, [])

  return (
    <Header>
    {/* 왼쪽 */}
      <Nav>
          <MainLogo src={logo} alt="메인 로고" />
          <NavLi>
              <LI><A href='#'>대시보드</A></LI>
              <LI onClick={handleOpenNav}><A href='#'>PUSH 관리</A></LI>
              {openNav && 
                <SubNav>
                  <SubLI><Link to="/makePush">push 작성</Link></SubLI>
                  <SubLI><Link to="/test">push 리스트</Link></SubLI>
                </SubNav>
              }  
            
          </NavLi>
      </Nav>

      {/* 오른쪽 */}
      <WrapRight>
          <TopHeader>
              <MyButton onClick={handleOpenMyMenu}>
                김태희(master)
              </MyButton>
              {openMyMenu && 
                <MyMenu>
                  <MyMenuLi first>MASTER</MyMenuLi>
                  <MyMenuLi>비밀변경</MyMenuLi>
                  <MyMenuLi onClick={logout}>
                    로그아웃
                  </MyMenuLi>
                </MyMenu>
              }
          </TopHeader>
          <main>
            { children }
          </main>  
      </WrapRight>
    </Header>
  )
}
