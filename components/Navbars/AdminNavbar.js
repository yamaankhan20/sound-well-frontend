import React from "react";
import LogoutButton from "../logoutbutton";


export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <span
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </span>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <LogoutButton />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
