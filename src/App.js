import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import UserList from "./UserList.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
