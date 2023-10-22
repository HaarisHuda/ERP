import React from 'react';
import StudentNavbar from './StudentNavbar';
import { Link } from 'react-router-dom';

const StudentDashboard = ({ user }) => {
  return (
    <div className="p-5 bg-slate-300">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-red-600">Student Dashboard</h1>
      </div>

      <table className="table">
        <tbody>
          <tr className="border-b-2 border-gray-500">
            <th className="px-2 py-2 border-r-2 font-semibold">Roll No.</th>
            <td className=" px-2">{user.name}</td>
          </tr>
          <tr className="border-b-2 border-gray-500">
            <th className="py-2 px-2 border-r-2 font-semibold">Your Email</th>
            <td className=" px-2">{user.email}</td>
          </tr>
        </tbody>
      </table>

      <div className="my-4">
        <h1 className=" font-semibold text-violet-600">
          To proceed further and fill the form, please share your details.
        </h1>
      </div>
      <Link to={'/student-details-form'}>
        <button className="border-2 p-1 border-indigo-700 font-mono shadow rounded my-2 text-lg">
          Click Here
        </button>
      </Link>

      {/* You can add more student details and components as needed */}
    </div>
  );
};

export default StudentDashboard;
