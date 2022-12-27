import logo from '../assets/images/logo.png';
import mypageLogo from '../assets/images/mypage-logo.png';
import styled from 'styled-components';
import {SIDE_NAV_COLOR} from '../constants/color';
import {NAV_MAIN_COLOR} from '../constants/color';
import {NAV_FONT_COLOR} from '../constants/color';

const Header = styled.header`
  display: flex;
`
const Nav = styled.nav`
  background: ${SIDE_NAV_COLOR};
  color: #fff;
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

const MyButton = styled.button`
  display: block;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  float: right;
  cursor: pointer;
`

export default function Layout({children}) {
  return (
    <Header>
    {/* 왼쪽 */}
      <Nav>
          <MainLogo src={logo} alt="메인 로고" />
          <NavLi>
              <li>대시보드</li>
              <li>PUSH 관리</li>
              <ul style={{"display" : "none"}}>
                  <li>push 작성</li>
                  <li>push 리스트</li>
              </ul>
          </NavLi>
      </Nav>

      {/* 오른쪽 */}
      <WrapRight>
          <TopHeader>
              <MyButton>
                <img src={mypageLogo} alt="마이페이지 로고" />
                김태희(사용자)
              </MyButton>
          </TopHeader>
          <main>
            { children }
          </main>  
      </WrapRight>
    </Header>
  )
}
