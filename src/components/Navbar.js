import React from "react";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Search Bar */}
      <div className="flex items-center">
        <AiOutlineSearch size={24} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-4 py-2 focus:outline-none"
        />
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4">
        <AiOutlineBell size={24} className="text-gray-600" />
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
