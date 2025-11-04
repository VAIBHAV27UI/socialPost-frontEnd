import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-screen w-full md:grid md:grid-cols-5 max-sm:flex max-sm:flex-wrap">
        <div className="md:col-span-1">
          <Navbar open={open} setOpen={setOpen} />
        </div>
        <div className="md:col-span-4 max-sm:flex-1 overflow-y-auto">
          <Outlet />
        </div>

        <div
          className={`md:hidden cursor-pointer font-bold max-sm:fixed top-5 right-5 z-10 text-2xl ${open ? "text-white" : "text-black"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <IoMdClose /> : <CiMenuFries /> }
        </div>
      </div>
    </>
  );
};

export default Sidebar;
