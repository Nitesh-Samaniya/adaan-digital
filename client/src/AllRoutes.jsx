import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Profile from "./component/Profile";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AllRoutes;
