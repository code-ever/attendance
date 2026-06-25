import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaUserGraduate,
  FaPhone,
  FaIdCard,
  FaSearch,
  FaEdit,
} from "react-icons/fa";

const ShowStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");

        if (response.data.success) {
          setStudents(response.data.students);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-6 shadow-lg text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <FaUserGraduate className="text-4xl text-blue-700" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Students List
            </h1>

            <p className="text-blue-100">
              Manage and view all registered students
            </p>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-blue-700">
            All Students
          </h2>

          <div className="relative">
            <FaSearch className="absolute left-3 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Student..."
              className="pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">
                  Full Name
                </th>
                <th className="p-4 text-left">
                  Registration Number
                </th>
                <th className="p-4 text-left">
                  Parent Phone
                </th>
                <th className="p-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-8 text-gray-500"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FaUserGraduate className="text-blue-600" />
                        {student.fullname}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FaIdCard className="text-blue-600" />
                        {student.reg_number}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-blue-600" />
                        {student.parent_phone}
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto">
                        <FaEdit />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-8 text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        {!loading && students.length > 0 && (
          <div className="mt-4 text-right text-sm text-gray-600">
            Total Students:{" "}
            <span className="font-semibold text-blue-700">
              {students.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowStudents;