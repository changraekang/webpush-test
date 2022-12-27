import "./App.css";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Router,
  Routes,
} from "react-router-dom";
import Test from "./pages/Test";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 에러페이지 */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
