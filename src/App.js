import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import UserList from "./UserList.js";
import CreateUser from "./CreateUser.js";
import EditUser from "./EditUser.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
