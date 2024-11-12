import React, { useState, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";

const NotificationDropdown = () => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = useRef(null);
    const popoverDropdownRef = useRef(null);
    const popperInstance = useRef(null);

    const toggleDropdownPopover = () => {
        setDropdownPopoverShow((prev) => !prev);
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
        if (
            popoverDropdownRef.current &&
            !popoverDropdownRef.current.contains(event.target) &&
            btnDropdownRef.current &&
            !btnDropdownRef.current.contains(event.target)
        ) {
            setDropdownPopoverShow(false);
        }
    };

    useEffect(() => {
        // Initialize Popper when dropdown is opened
        if (dropdownPopoverShow) {
            popperInstance.current = createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
                placement: "left-start",
            });
        }

        // Add event listener for clicks outside
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Cleanup: remove event listener and Popper instance
            document.removeEventListener("mousedown", handleClickOutside);
            if (popperInstance.current) {
                popperInstance.current.destroy();
                popperInstance.current = null;
            }
        };
    }, [dropdownPopoverShow]);
  return (
    <>
        <a
            className="text-blueGray-500 py-1 px-3"
            href="#pablo"
            ref={btnDropdownRef}
            onClick={(e) => {
                e.preventDefault();
                toggleDropdownPopover();
            }}
        >
            <i className="fas fa-ellipsis-v"></i>
        </a>
        <div
            ref={popoverDropdownRef}
            className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
