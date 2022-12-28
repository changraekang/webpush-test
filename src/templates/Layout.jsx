import logo from '../assets/images/logo.png';
import mypageLogo from '../assets/images/mypage-logo.png';
import styled from 'styled-components';
import {NAV_MY_MENU_HOVER_COLOR, NAV_MY_MENU_LINE_COLOR,NAV_MY_MENU_COLOR, SIDE_NAV_COLOR ,NAV_FONT_HOVER_COLOR,NAV_MAIN_COLOR,NAV_BUTTON_HOVER_COLOR,NAV_FONT_COLOR} from '../constants/color';
import { useEffect, useState } from 'react';


const Header = styled.header`
  display: flex;
  font-family: 'Pretendard-Regular';
`
const Nav = styled.nav`
  background: ${SIDE_NAV_COLOR};
  color: ${NAV_FONT_COLOR};
  padding: 40px;
  height: 100vh
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
  margin: ${(props) => (props.first ? "12px 0 26px" : "14px 0")};
`
//${(props) => (props.last ? "32px" : "16px")};

export default function Layout({children}) {
  const [openNav, setOpenNav] = useState(false);
  const [openMyMenu, setOpenMyMenu] = useState(false);

  const handleOpenNav = () => {
    !openNav ? setOpenNav(true) : setOpenNav(false)
  }

  const handleOpenMyMenu = () => {
    !openMyMenu ? setOpenMyMenu(true) : setOpenMyMenu(false)
  }

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
                  <SubLI><A href='#'>push 작성</A></SubLI>
                  <SubLI><A href='#'>push 리스트</A></SubLI>
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
                  <MyMenuLi>로그아웃</MyMenuLi>
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
