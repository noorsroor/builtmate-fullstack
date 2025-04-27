// src/components/admin/Sidebar.jsx

import { NavLink } from "react-router-dom";
import { FaUser, FaUserTie, FaClipboardList, FaLightbulb, FaCog, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "Users", path: "/admin/users", icon: <FaUser /> },
    { name: "Professionals", path: "/admin/professionals", icon: <FaUserTie /> },
    { name: "Bookings", path: "/admin/bookings", icon: <FaClipboardList /> },
    { name: "Ideas", path: "/admin/ideas", icon: <FaLightbulb /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
    { name: "Profile", path: "/admin/profile", icon: <FaUser /> },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-64 bg-white shadow-lg fixed flex flex-col p-6"
    >
      <div className="text-2xl font-bold text-gray-800 mb-10">Admin Panel</div>

      <nav className="flex-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 my-2 rounded-lg transition ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-md">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6">
        <button className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
