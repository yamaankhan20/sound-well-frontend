import React from "react";
import Link from "next/link";

export default function Navbar() {
  // const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
      <>
        <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-center">
            <div className="w-full relative flex justify-center lg:w-auto lg:static lg:block lg:justify-start">
              <Link href="/admin/dashboard" legacyBehavior>
              <span style={{ cursor: 'pointer' }} className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
                <img
                    src="/img/soundIcon.jpeg"
                    className="h-13 w-70 border rounded"
                    alt="..."
                ></img>{" "}
              </span>
              </Link>
              {/*<button*/}
              {/*    className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"*/}
              {/*    type="button"*/}
              {/*    onClick={() => setNavbarOpen(!navbarOpen)}*/}
              {/*>*/}
              {/*  <i className="text-white fas fa-bars"></i>*/}
              {/*</button>*/}
            </div>
            {/*<div className={`lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none ${navbarOpen ? "block rounded shadow-lg" : "hidden"}`}*/}
            {/*    id="example-navbar-warning">*/}
            {/*  <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">*/}
            {/*    <li className="flex items-center">*/}
            {/*      <PagesDropdown />*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</div>*/}
          </div>
        </nav>
      </>
  );
}
