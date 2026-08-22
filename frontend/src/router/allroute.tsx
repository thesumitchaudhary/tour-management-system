import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeDasboard from "@/page/homePages/dashbord";
import UserDashboard from "@/page/user/userDashboard";

const Allroute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeDasboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Allroute;
