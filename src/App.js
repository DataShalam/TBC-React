import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import MainPage from "./MainPage/MainPage";
import Header from "./Header/Header.jsx";
import UsersPage from "./UsersPage/UsersPage.jsx";
import UserPage from "./UserPage/UserPage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <Header />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/blogs" element={<MainPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId" element={<UserPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
