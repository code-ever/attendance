import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

const AttendanceHistory = () => {
  const navigate = useNavigate();

  const user = JSON.parse( localStorage.getItem( "user" ) ) || {};

  // QR DATA MUST MATCH BACKEND
  const qrData = JSON.stringify( {
    user_id: user?.id,
    fullname: user?.fullname,
    reg_number: user?.reg_number,
    parent_phone: user?.parent_phone,
  } );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate( "/dashboard" )}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft />
          Back
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-gray-700">
          Take Attendance
        </h1>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Student Attendance QR
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Scan this QR code to mark your attendance
        </p>

        {/* QR CODE */}
        <div className="flex justify-center mt-6">
          <div className="p-4 bg-white border rounded-xl shadow-sm">
            <QRCodeCanvas
              value={qrData}
              size={220}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        {/* STUDENT INFO */}
        {/* <div className="mt-5 space-y-2 text-left bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span>{" "}
            {user?.fullname || user?.name || "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Reg Number:</span>{" "}
            {user?.reg_number || "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Parent Phone:</span>{" "}
            {user?.parent_phone || "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Student ID:</span>{" "}
            {user?.id || "N/A"}
          </p>
        </div> */}

        {/* DEBUG QR CONTENT */}
        {/* <div className="mt-4 p-3 bg-blue-50 rounded text-left text-xs break-all">
          <strong>QR Content:</strong>
          <br />
          {qrData}
        </div> */}

        {/* WARNING */}
        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
          ⚠️ Warning: Any attempt to manipulate or misuse attendance
          scanning system will lead to disciplinary action from the
          school authority.
        </div>

        {/* FOOT NOTE */}
        <p className="text-xs text-gray-400 mt-4">
          Ensure you are physically present before scanning.
          Attendance is monitored in real-time.
        </p>
      </div>
    </div>
  );
};

export default AttendanceHistory;