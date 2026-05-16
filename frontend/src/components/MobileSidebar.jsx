import { Link } from "react-router-dom";

import { FaHome, FaMoneyBill, FaPlus, FaChartBar } from "react-icons/fa";

function MobileSidebar({ open, setOpen }) {
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
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"}
      md:hidden`}
    >
      <div className="p-5 text-3xl font-bold text-green-500">FinTrack</div>

      <div className="mt-5">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
          >
            {item.icon}

            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileSidebar;
