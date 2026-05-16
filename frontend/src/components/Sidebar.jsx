import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaMoneyBill,
  FaPlus,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },

    {
      name: "Transactions",
      path: "/transactions",
      icon: <FaMoneyBill />,
    },

    {
      name: "Add Transaction",
      path: "/add-transaction",
      icon: <FaPlus />,
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
    },
  ];

  return (
    <div className="sidebar w-64 border-r min-h-screen hidden md:flex flex-col justify-between transition-all duration-300">
      <div>
        {/* Logo */}
        <div className="p-5 text-3xl font-bold text-green-500">FinTrack</div>

        {/* Menu */}
        <div className="mt-5">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-4 transition-all duration-200
  hover:bg-black hover:text-white
  ${location.pathname === item.path ? "bg-black text-white font-bold" : ""}`}
            >
              {item.icon}

              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-5">
        <button
          onClick={logoutHandler}
          className="flex items-center gap-3 text-red-500"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
