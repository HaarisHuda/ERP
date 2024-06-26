import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import AuthContext from '../../context/auth/authContext';
import maitlogomain from '../../assets/maitlogomain.png'
import axios from 'axios';
const StudentNavbar = () => {
  const context = useContext(AuthContext);
  const { logoutUser } = context;
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const host = process.env.REACT_APP_BACKEND_URL;
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    // Fetch the user details from your API
    axios.get(`${host}/user-details/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', 
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [accessToken]);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 p-2 shadow-md px-10  ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to={'/'}><img src={maitlogomain} alt="" className='w-20 ' /></Link>
          {user && (
            <p className="text-white text-base">Welcome, {user.name}</p>
          )}
        </div>

        <div className="mt-4 sm:mt-0">
          {/* Hamburger menu icon */}
          {menuOpen ? (
            <button onClick={toggleMenu} className="text-white">
              <FaTimes />
            </button>
          ) : (
            <button onClick={toggleMenu} className="text-white ">
              <FaBars />
            </button>
          )}
          {/* Dropdown menu */}
          {menuOpen && (
            <div className="relative ">

              <div className="bg-gray-900 text-white absolute  top-0 right-0 w-48 rounded-md shadow-lg">
                <ul className="p-4 space-y-2">
                  <li>
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/timetable" className="hover:underline">Timetable</Link>
                  </li>
                  <li>
                    <Link to="/schedule" className="hover:underline">Schedule</Link>
                  </li>
                  <li>
                    <Link to="/results" className="hover:underline">Results</Link>
                  </li>
                  <li>
                    <Link to="/cms" className="hover:underline">CMS/LMS</Link>
                  </li>
                  <li>
                    <Link to="/help" className="hover:underline">Help/Support</Link>
                  </li>
                  <li>
                    <Link to="/attendance" className="hover:underline">Attendance</Link>
                  </li>
                  <li className="mb-2">
                    <Link to='/fee-comp' className="hover:underline">Fees</Link>
                  </li>
                  <li className="mb-2">
                    <Link to='/placement-student' className="hover:underline">Placement</Link>
                  </li>
                </ul>
                <button
                  onClick={logoutUser}
                  className="bg-red-500 text-white w-full py-2 px-4 rounded-b-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
