import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "./styles/global.css";
import Test from "./pages/Test";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import MakePush from "./pages/push/MakePush";
import FindEmail from "./pages/Auth/FindEmail";
import FindPassword from "./pages/Auth/FindPassword";
import SetNewPassword from "./pages/Auth/setNewPassword";
import ResultFindEmail from "./pages/Auth/ResultFindEmail";
import NotFoundEmail from "./pages/Auth/NotFoundEmail";
import ErrorPassword from "./pages/Auth/ErrorPassword";
import MyPage from "./pages/profile/MyPage";
import Homepage from "./pages/homepage/Homepage";
import PushList from "./pages/push/PushList";
import DashBoard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";
import NewPassword from "./pages/profile/NewPassword";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/findEmail" element={<FindEmail />} />
            <Route path="/resultEmail/:id" element={<ResultFindEmail />} />
            <Route path="/notFoundemail" element={<NotFoundEmail />} />
            <Route path="/findPassword" element={<FindPassword />} />
            <Route path="/error_newPassword" element={<ErrorPassword />} />
            <Route path="/setNewPassword" element={<SetNewPassword />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/makePush" element={<MakePush />} />
            <Route path="/pushList" element={<PushList />} />

            {/* 나의 정보 수정 */}
            <Route path="/myPage" element={<MyPage />} />
            {/* 비밀번호 수정 */}
            <Route path="/myPage/newPassword" element={<NewPassword />} />
            {/* 홈페이지 관리 */}
            <Route path="/homepage" element={<Homepage />} />
            {/* 에러페이지 */}
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
