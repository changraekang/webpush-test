import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Router,
  Routes,
} from "react-router-dom";
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

function App() {
  return (
    <>
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
          <Route path="/makePush" element={<MakePush />} />
          {/* 에러페이지 */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
