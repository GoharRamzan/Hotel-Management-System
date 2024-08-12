// src/components/Sidebar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { Bars3Icon, XMarkIcon, HomeIcon, BuildingOfficeIcon, UsersIcon, DocumentIcon, CurrencyDollarIcon, ChartBarIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import logo from '../assets/monel logo.png';

const Sidebar = ({ userRole }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout Error', error);
      });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const renderNavLinks = () => {
    switch (userRole) {
      case 'admin':
        return (
          <>
            <NavItem to="/dashboard" icon={<HomeIcon className="w-5 h-5 inline mr-2" />} label="Dashboard" />
            <NavItem to="/rooms" icon={<BuildingOfficeIcon className="w-5 h-5 inline mr-2" />} label="Rooms" />
            <NavItem to="/bookings" icon={<DocumentIcon className="w-5 h-5 inline mr-2" />} label="Bookings" />
            <NavItem to="/customers" icon={<UsersIcon className="w-5 h-5 inline mr-2" />} label="Customers" />
            <NavItem to="/staff" icon={<UsersIcon className="w-5 h-5 inline mr-2" />} label="Staff" />
            <NavItem to="/payments" icon={<CurrencyDollarIcon className="w-5 h-5 inline mr-2" />} label="Payments" />
            <NavItem to="/reports" icon={<ChartBarIcon className="w-5 h-5 inline mr-2" />} label="Reports" />
          </>
        );
      case 'staff':
        return (
          <>
            <NavItem to="/dashboard" icon={<HomeIcon className="w-5 h-5 inline mr-2" />} label="Dashboard" />
            <NavItem to="/bookings" icon={<DocumentIcon className="w-5 h-5 inline mr-2" />} label="Bookings" />
            <NavItem to="/customers" icon={<UsersIcon className="w-5 h-5 inline mr-2" />} label="Customers" />
          </>
        );
      case 'user':
        return (
          <>
            <NavItem to="/bookings" icon={<DocumentIcon className="w-5 h-5 inline mr-2" />} label="Bookings" />
            <NavItem to="/payments" icon={<CurrencyDollarIcon className="w-5 h-5 inline mr-2" />} label="Payments" />
          </>
        );
      default:
        return null;
    }
  };

  const NavItem = ({ to, icon, label }) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'block py-2 px-4 rounded bg-black text-yellow-300'
            : 'block py-2 px-4 rounded hover:bg-black transition-colors duration-200'
        }
        onClick={closeSidebar}
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );

  return (
    <>
      {/* Sidebar toggle button for small screens */}
      <div className="md:hidden fixed top-0 left-0 p-4 z-50 bg-blue-900 text-white">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 w-2/3 md:w-64 bg-stone-700 text-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:flex flex-col h-full z-40`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="text-lg font-bold ">Sidebar</h2>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md focus:outline-none"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Logo at the top */}
        <div className="flex items-center justify-center h-32">
          <img src={logo} alt="Logo" className="h-40 w-auto" />
        </div>

        <nav className="flex flex-col h-full">
          <ul className="flex-1 p-4 space-y-2">
            {renderNavLinks()}
          </ul>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 flex justify-center items-center hover:bg-red-700 text-white rounded-b focus:outline-none transition-colors duration-200"
          >
            <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-white" />
            <span className="ml-2">Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile screens */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
