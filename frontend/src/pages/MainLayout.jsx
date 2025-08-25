import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";



function MainLayout() {

  return (
    <div className="min-h-screen bg-[#e3e7ef]">
      {/* Top Navigation Bar */}
        <div className="">
          <Navbar/>
        </div>

        {/* Main Content Area */}
        <div className="w-full pt-10 ">
          <Outlet />
        </div>
    
    </div>
  );
}
export default MainLayout;
