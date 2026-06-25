import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    reg_number: "",
    phone_number: "",
    parent_phone: "",
    student_email: "",
    password: "",
  });

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "https://attendanceapi-production-8964.up.railway.app/api/auth/students"
      );

      setStudents(res.data.students);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerStudent = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5001/api/auth/register",
        formData
      );

      fetchStudents();

      setOpen(false);

      setFormData({
        fullname: "",
        reg_number: "",
        phone_number: "",
        parent_phone: "",
        student_email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Student Management
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">
                Registration No
              </th>
              <th className="p-3 text-left">
                Phone Number
              </th>
              <th className="p-3 text-left">
                Parent Phone
              </th>
              <th className="p-3 text-left">
                Email
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-t"
              >
                <td className="p-3">
                  {student.fullname}
                </td>

                <td className="p-3">
                  {student.reg_number}
                </td>

                <td className="p-3">
                  {student.phone_number}
                </td>

                <td className="p-3">
                  {student.parent_phone}
                </td>

                <td className="p-3">
                  {student.student_email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">
                Register Student
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={registerStudent}
              className="grid grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="border p-3 rounded"
              />

              <input
                type="text"
                name="reg_number"
                value={formData.reg_number}
                onChange={handleChange}
                placeholder="Reg Number"
                className="border p-3 rounded"
              />

              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border p-3 rounded"
              />

              <input
                type="text"
                name="parent_phone"
                value={formData.parent_phone}
                onChange={handleChange}
                placeholder="Parent Phone"
                className="border p-3 rounded"
              />

              <input
                type="email"
                name="student_email"
                value={formData.student_email}
                onChange={handleChange}
                placeholder="Student Email"
                className="border p-3 rounded col-span-2"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border p-3 rounded col-span-2"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded col-span-2"
              >
                Register Student
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}