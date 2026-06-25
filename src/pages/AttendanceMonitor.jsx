import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const AttendanceMonitor = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    socket.on("attendance_marked", (student) => {
      setAttendance((prev) => [student, ...prev]);
    });

    return () => {
      socket.off("attendance_marked");
    };
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Live Attendance
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Parent No</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((item, index) => (
            <tr key={index}>
              <td>{item.fullname}</td>
              <td>{item.reg_number}</td>
              <td>{item.parent_number}</td>
              <td>
                {new Date(item.time).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceMonitor;