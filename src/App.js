import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Router,
  Routes,
} from "react-router-dom";
import './styles/global.css'
import Main from "./pages/Main";
import Test from "./pages/Test";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MakePush from "./pages/MakePush";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/makePush" element={<MakePush />} />
          {/* 에러페이지 */}
          <Route exact path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
