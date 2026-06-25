import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    loginId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser(form);

      console.log("Login Response:", response);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700"></div>

      {/* Overlay Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b')",
        }}
      />

      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md px-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              SA
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-white">
            Welcome Back
          </h2>

          <p className="text-center text-white/70 mt-2 mb-8">
            Student Attendance & Academic Portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Login ID */}
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Email / Registration Number
              </label>

              <input
                type="text"
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
                placeholder="Enter email or registration number"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-white/60">
            © {new Date().getFullYear()} Student Attendance System
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;