import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MobileSidebar from "../components/MobileSidebar";

function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen main-content transition-all duration-300">
        {/* Navbar */}
        <Navbar setOpen={setOpen} />

        {/* Pages */}
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
