import React, { useState, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";

const UserDropdown = () => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = useRef();
    const popoverDropdownRef = useRef();
    const popperInstance = useRef(null);

    // Toggle dropdown visibility
    const toggleDropdownPopover = () => {
        setDropdownPopoverShow((prev) => !prev);
    };

    // Close the dropdown
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    useEffect(() => {
        if (dropdownPopoverShow) {
            // Initialize Popper instance
            popperInstance.current = createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
                placement: "top-start",
            });
        }

        // Detect click outside dropdown to close it
        const handleClickOutside = (event) => {
            if (
                popoverDropdownRef.current &&
                !popoverDropdownRef.current.contains(event.target) &&
                btnDropdownRef.current &&
                !btnDropdownRef.current.contains(event.target)
            ) {
                closeDropdownPopover();
            }
        };

        // Add event listener for outside clicks
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener and Popper instance on component unmount or dropdown close
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (popperInstance.current) {
                popperInstance.current.destroy();
                popperInstance.current = null;
            }
        };
    }, [dropdownPopoverShow]);
  return (
    <>
      <span
          className="text-blueGray-500 block"
          ref={btnDropdownRef}
          onClick={(e) => {
              e.preventDefault();
              toggleDropdownPopover();
          }}
      >
        <div className="items-center flex">
          <span style={{cursor: 'pointer'}}
                className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src="/img/team-1-800x800.jpg"
            />
          </span>
        </div>
      </span>

    </>
  );
};

export default UserDropdown;
