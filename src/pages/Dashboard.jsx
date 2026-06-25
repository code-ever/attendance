import React from "react";
import { FaQrcode, FaUser, FaCog, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const Dashboard = () => {
  // get user from localStorage
  const user = JSON.parse( localStorage.getItem( "user" ) ) || {};

  const quickActions = [
    { link: "/attendance", name: "Take Attendance", icon: <FaQrcode />, color: "text-blue-600" },
    { link: "/profile", name: "Profile", icon: <FaUser />, color: "text-green-600" },
    { link: "/", name: "Settings", icon: <FaCog />, color: "text-gray-600" },
    { link: "/", name: "Student News", icon: <FaCheckCircle />, color: "text-purple-600" },
    { link: "/", name: "School Calendar", icon: <FaCalendarAlt />, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">

      {/* MAIN STUDENT CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">

        <h2 className="text-2xl font-bold text-blue-700">
          Welcome 👋 {user?.name || "Student"}
        </h2>

        <p className="text-gray-500 mt-1">
          Student Dashboard Overview
        </p>

        <div className="mt-6 space-y-3">

          <div className="flex justify-between">
            <span className="text-gray-600">Full Name:</span>
            <span className="font-semibold">{user?.fullname || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Reg Number:</span>
            <span className="font-semibold">{user?.reg_number || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Number:</span>
            <span className="font-semibold">{user?.phone_number || "N/A"}</span>
          </div>

        </div>

        <div className="mt-6">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Active Student
          </span>
        </div>
      </div>

      {/* SECOND ROW - QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {quickActions.map( ( item, index ) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer"
          >
            <div className={`text-2xl ${item.color}`}>
              {item.icon}
            </div>
            <Link to={item.link}>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {item.name}
              </p>
            </Link>
          </div>
        ) )}

      </div>

    </div>
  );
};

export default Dashboard;