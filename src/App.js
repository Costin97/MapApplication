import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapPage from "./components/MapPage";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />}></Route>
        <Route exact path="/loginpage" element={<LoginPage />}></Route>
        <Route exact path="/mappage" element={<MapPage />}></Route>
        <Route exact path="/signuppage" element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
