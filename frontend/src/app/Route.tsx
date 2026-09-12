import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/features/home/pages/HomePage";
import UserDashboard from "@/page/user/userDashboard";

const Allroute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Allroute;
