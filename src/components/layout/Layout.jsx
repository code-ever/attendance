import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 md:ml-64">

        <Header setOpen={setOpen} />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;