import { useEffect, useRef, useState } from "react";
import logo from "../../assets/edvironLogo.svg";

import { GoEye } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [userMenu, setUserMenu] = useState(false);
  const { user, logout } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex left-0 pl-20 fixed w-full z-40 bg-[#EDF1F4] justify-between items-center px-8 py-4 pb-2">
      <img src={logo} className="h-8" alt="logo" />
      <div className="flex items-center gap-x-2 relative">
        <div className="flex h-8 w-8 justify-center shrink-0 items-center bg-[#7E6AF633]  rounded-full">
          {user?.name?.slice(0, 1)}
        </div>
        <div
          className="flex items-center cursor-pointer gap-x-1"
          onClick={() => {
            setUserMenu(!userMenu);
          }}
        >
          <p className="max-w-[100px] text-xs  text-[#1B163B] font-normal truncate">
            {user?.name}
          </p>
          <svg
            onClick={() => {
              setUserMenu(!userMenu);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="text-[#717171] w-4 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        {userMenu && (
          <div
            ref={menuRef}
            className="z-50 text-xs absolute top-8 right-0 bg-[#F6F8FA] py-4 w-[9rem]  flex flex-col justify-center gap-y-4 shadow-lg rounded-md mt-2"
          >
            <div className="w-full flex flex-col px-6">
              <div className="flex font-normal border-b-2 border-gray-200 pb-3 items-center gap-x-4 cursor-pointer">
                <GoEye />
                <Link to="/profile">View Profile</Link>
              </div>
              <div
                onClick={() => {
                  logout();
                }}
                className="flex cursor-pointer text-[#1B163B] font-normal pt-3 items-center gap-x-3"
              >
                <PiSignOutBold />
                <p>Sign out</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
