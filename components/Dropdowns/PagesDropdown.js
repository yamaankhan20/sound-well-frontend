import React from "react";
import Link from "next/link";
import { createPopper } from "@popperjs/core";

const PagesDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
      <>
      <span
          className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          ref={btnDropdownRef}
          onClick={(e) => {
            e.preventDefault();
            dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
          }}
      >
        pages
      </span>
        <div
            ref={popoverDropdownRef}
            className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
            }
        >
        <span className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400">
          Admin Layout
        </span>
          <Link href="/admin/dashboard" legacyBehavior>
            <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
              Dashboard
            </span>
          </Link>
          <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
          <span className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400">
          Auth Layout
        </span>
          <Link href="/auth/login" legacyBehavior>
            <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
              Login
            </span>
          </Link>
          <Link href="/auth/register" legacyBehavior>
            <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
              Register
            </span>
          </Link>
        </div>
      </>
  );
};

export default PagesDropdown;
