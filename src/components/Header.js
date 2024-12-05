import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaClipboardList, FaUserCheck, FaTachometerAlt } from 'react-icons/fa';

function Header() {
  const location = useLocation();

  // Function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path ? 'border-b-2 border-white' : '';
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <FaTachometerAlt className="text-2xl mr-2" />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/admin/dashboard" // Corrected the path to point to the dashboard route
              className={`flex items-center space-x-2 p-2 hover:bg-gray-700 rounded ${isActive('/admin/dashboard')}`}
            >
              <FaTachometerAlt className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/candidates"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-700 rounded ${isActive('/candidates')}`}
            >
              <FaUsers className="text-xl" />
              <span>Candidates</span>
            </Link>
          </li>
          <li>
            <Link
              to="/view-attendance"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-700 rounded ${isActive('/attendance')}`}
            >
              <FaCalendarAlt className="text-xl" />
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link
              to="/absentees"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-700 rounded ${isActive('/absentees')}`}
            >
              <FaClipboardList className="text-xl" />
              <span>Absentees</span>
            </Link>
          </li>
          <li>
            <Link
              to="/leaves"
              className={`flex items-center space-x-2 p-2 hover:bg-gray-700 rounded ${isActive('/leaves')}`}
            >
              <FaUserCheck className="text-xl" />
              <span>Leave Approval</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
