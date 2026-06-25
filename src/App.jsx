import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Layout from "./components/layout/Layout";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import AttendanceHistory from "./pages/AttendanceHistory";
import StudentProfile from "./pages/Profile";
import AttendanceScanner from "./pages/AttendanceScanner";
import RegisterStudent from "./pages/Register";
import Students from "./pages/Register";
import ShowStudents from "./pages/ShowStudents";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/allstd" element={<ShowStudents/>} />
          <Route path="/register" element={<Students/>} />
          <Route path="/scan" element={<AttendanceScanner/>} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/attendance" element={<AttendanceHistory />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;