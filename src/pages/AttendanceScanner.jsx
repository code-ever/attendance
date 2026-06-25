import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";

const AttendanceScanner = () => {
const [loading, setLoading] = useState(false);
const [student, setStudent] = useState(null);
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");

const qrRef = useRef(null);
const scannedRef = useRef(false);

useEffect(() => {
qrRef.current = new Html5Qrcode("reader");


let scannerStarted = false;

const startScanner = async () => {
  try {
    await qrRef.current.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
      },
      async (decodedText) => {
        if (scannedRef.current) return;

        scannedRef.current = true;

        try {
          setLoading(true);
          setMessage("");

          console.log("QR DATA:", decodedText);

          const studentData = JSON.parse(decodedText);

          const formattedStudent = {
            ...studentData,
            user_id:
              studentData.user_id ||
              studentData.student_id,
          };

          setStudent(formattedStudent);

          // Optional attendance session
          const session =
            JSON.parse(
              localStorage.getItem(
                "attendanceSession"
              )
            ) || {};

          const payload = {
            qr_data: decodedText,
            subject:
              session.subject || "General Class",
            lecturer_name:
              session.lecturer_name ||
              "Lecturer",
            level:
              session.level ||
              studentData.level ||
              "N/A",
            department:
              session.department ||
              studentData.department ||
              "N/A",
          };

          console.log(
            "Sending Payload:",
            payload
          );

          const response = await axios.post(
            "http://localhost:5001/api/attendance/scan",
            payload
          );

          if (response.data.success) {
            setMessage(
              response.data.message ||
                "Attendance Marked Successfully"
            );

            setMessageType("success");

            setStudent({
              ...formattedStudent,
              status: "present",
            });
          } else {
            setMessage(
              response.data.message ||
                "Attendance Failed"
            );

            setMessageType("error");
          }
        } catch (err) {
          console.error("SCAN ERROR:", err);

          setMessage(
            err?.response?.data?.message ||
              err?.message ||
              "Invalid QR Code"
          );

          setMessageType("error");
        } finally {
          setLoading(false);

          setTimeout(() => {
            scannedRef.current = false;
          }, 3000);
        }
      }
    );

    scannerStarted = true;
  } catch (err) {
    console.error("Camera Error:", err);

    setMessage(
      "Unable to access camera"
    );

    setMessageType("error");
  }
};

startScanner();

return () => {
  if (scannerStarted && qrRef.current) {
    qrRef.current
      .stop()
      .then(() => qrRef.current.clear())
      .catch(() => {});
  }
};


}, []);

return ( <div className="min-h-screen bg-gray-100 p-4"> <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow"> <h2 className="text-2xl font-bold text-center mb-4">
Attendance Scanner </h2>

    <div
      id="reader"
      className="border rounded-lg overflow-hidden"
    />

    {loading && (
      <p className="text-center mt-4 text-blue-600">
        Saving Attendance...
      </p>
    )}

    {message && (
      <div
        className={`mt-4 p-3 rounded text-center font-semibold ${
          messageType === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {message}
      </div>
    )}

    {student && (
      <div className="mt-4 border p-4 rounded-lg bg-gray-50">
        <h3 className="font-bold mb-3">
          Student Information
        </h3>

        <p>
          <strong>Name:</strong>{" "}
          {student.fullname || "N/A"}
        </p>

        <p>
          <strong>Reg Number:</strong>{" "}
          {student.reg_number || "N/A"}
        </p>

        <p>
          <strong>Parent Phone:</strong>{" "}
          {student.parent_phone || "N/A"}
        </p>

        <p>
          <strong>User ID:</strong>{" "}
          {student.user_id || "N/A"}
        </p>

        {student.status === "present" && (
          <div className="mt-4 bg-green-100 text-green-700 p-3 rounded text-center font-bold text-lg">
            ✅ PRESENT
          </div>
        )}
      </div>
    )}
  </div>
</div>


);
};

export default AttendanceScanner;
