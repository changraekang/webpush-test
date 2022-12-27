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
import Layout from "./templates/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          {/* 에러페이지 */}
          <Route exact path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
