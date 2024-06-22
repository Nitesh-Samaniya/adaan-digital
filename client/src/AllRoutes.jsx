import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Profile from "./component/Profile";
import SignUp from "./component/Signup";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default AllRoutes;
