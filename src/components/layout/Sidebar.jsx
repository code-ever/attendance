import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ( { open, setOpen } ) => {
  const user = JSON.parse( localStorage.getItem( "user" ) ) || {};

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen( false )}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0
          h-screen w-64
          bg-blue-900 text-white
          z-50
          transform transition-transform duration-300 ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-blue-800">
          <h1 className="font-bold text-xl">
            Attendance System
          </h1>
        </div>

        <nav className="p-4 flex flex-col gap-2">

          <NavLink
            to="/dashboard"
            className="p-3 rounded hover:bg-blue-700"
            onClick={() => setOpen( false )}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/profile"
            className="p-3 rounded hover:bg-blue-700"
            onClick={() => setOpen( false )}
          >
            Profile
          </NavLink>

          <NavLink
            to="/attendance"
            className="p-3 rounded hover:bg-blue-700"
            onClick={() => setOpen( false )}
          >
            Take Attendance
          </NavLink>

          {/* admin */}
          {/* admin */}
          {user.access_level !== "student" && (
            <>
              <NavLink
                to="/register"
                className="p-3 rounded hover:bg-blue-700"
                onClick={() => setOpen( false )}
              >
                Add Student
              </NavLink>

              {/* <NavLink
                to="/allstd"
                className="p-3 rounded hover:bg-blue-700"
                onClick={() => setOpen( false )}
              >
                All Student
              </NavLink> */}

              {/* <NavLink
                to="/showatt"
                className="p-3 rounded hover:bg-blue-700"
                onClick={() => setOpen( false )}
              >
                Show Attendance
              </NavLink> */}
            </>
          )}
          {/* <NavLink
            to="/records"
            className="p-3 rounded hover:bg-blue-700"
            onClick={() => setOpen(false)}
          >
            Records
          </NavLink> */}

          <button
            className="mt-auto p-3 rounded bg-red-600 hover:bg-red-700 text-left"
          >
            Logout
          </button>

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;