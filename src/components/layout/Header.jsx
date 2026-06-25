import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

const Header = ({ setOpen }) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow h-16 px-4 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <h2 className="font-semibold text-xl">
          Dashboard
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <span className="hidden md:block text-sm text-gray-600">
          {new Date().toLocaleString()}
        </span>

        {/* USER MENU */}
        <div className="relative" ref={menuRef}>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="focus:outline-none"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/40"}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition"
            />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border overflow-hidden">

              <div className="px-4 py-3 border-b">
                <p className="font-semibold text-gray-800">
                  {user?.name || "Student"}
                </p>

                <p className="text-sm text-gray-500">
                  {user?.email || "No Email"}
                </p>
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                👤 Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default Header;