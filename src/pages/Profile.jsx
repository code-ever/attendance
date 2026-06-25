import React from "react";
import {
  FaUserGraduate,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaSchool,
  FaEdit,
} from "react-icons/fa";

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="min-h-screen bg-slate-100 p-4">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-6 shadow-lg text-white">

        <div className="flex flex-col md:flex-row items-center gap-5">

          {/* AVATAR */}
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg">
            <FaUserGraduate className="text-5xl text-blue-700" />
          </div>

          {/* USER INFO */}
          <div>
            <h1 className="text-2xl font-bold">
              {user?.fullname || "Student Name"}
            </h1>

            <p className="text-blue-100">
              {user?.reg_number || "Registration Number"}
            </p>

            <span className="inline-block mt-2 bg-green-500 px-4 py-1 rounded-full text-sm">
              Active Student
            </span>
          </div>
        </div>
      </div>

      {/* PROFILE DETAILS */}
      <div className="bg-white rounded-3xl shadow-lg mt-6 p-6">

        <h2 className="text-xl font-bold text-blue-700 mb-6">
          Student Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {/* FULL NAME */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
            <FaUserGraduate className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <h3 className="font-semibold">
                {user?.fullname || "N/A"}
              </h3>
            </div>
          </div>

          {/* REG NUMBER */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
            <FaIdCard className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Registration Number</p>
              <h3 className="font-semibold">
                {user?.reg_number || "N/A"}
              </h3>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
            <FaPhone className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Phone Number</p>
              <h3 className="font-semibold">
                {user?.phone_number || "N/A"}
              </h3>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
            <FaEnvelope className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Email Address</p>
              <h3 className="font-semibold">
                {user?.email || "N/A"}
              </h3>
            </div>
          </div>

          {/* DEPARTMENT */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
            <FaSchool className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Department</p>
              <h3 className="font-semibold">
                {user?.department || "N/A"}
              </h3>
            </div>
          </div>

          {/* LEVEL */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
            <FaSchool className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Level</p>
              <h3 className="font-semibold">
                {user?.level || "N/A"}
              </h3>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="mt-8 flex justify-center md:justify-end">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
            <FaEdit />
            Edit Profile
          </button>
        </div>
      </div>

    </div>
  );
};

export default StudentProfile;