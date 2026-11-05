import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/features/home/pages/HomePage";
import UserDashboard from "@/page/user/userDashboard";
import TravelGuide from "@/page/user/guide";
import Hotel from "@/page/user/hotel";

const Allroute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/guide" element={<TravelGuide />} />
          <Route path="/user/hotel" element={<Hotel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Allroute;
