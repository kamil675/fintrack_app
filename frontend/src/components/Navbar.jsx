import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

function Navbar({ setOpen }) {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="navbar p-4 shadow flex justify-between items-center bg-white dark:bg-gray-800">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={() => setOpen(true)} className="text-2xl md:hidden">
          <FaBars />
        </button>

        <h1 className="text-2xl font-bold text-green-500">FinTrack</h1>
      </div>

      {/* Center Navigation */}
      <div className="hidden md:flex items-center gap-6 font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-500" : "hover:text-green-500"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? "text-green-500" : "hover:text-green-500"
          }
        >
          Transactions
        </NavLink>

        <NavLink
          to="/add-transaction"
          className={({ isActive }) =>
            isActive ? "text-green-500" : "hover:text-green-500"
          }
        >
          Add Transaction
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "text-green-500" : "hover:text-green-500"
          }
        >
          Analytics
        </NavLink>
      </div>

      {/* Right */}
      <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
}

export default Navbar;
