/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import logo from "../../assets/ic_round-dashboard.svg";
import { useLocation, useNavigate } from "react-router-dom";

import { FaAngleUp } from "react-icons/fa6";

export function NestedSidebarItem({
  icon,
  name,
  onTap,
  className,
  children,
  path,
  set_path,
}: any) {
  const [open, set_open] = useState(false);
  return (
    <div className={className + " nested-sidebar-item "}>
      <div
        className={
          "sidebar-item items-center gap-6 p-3 my-3 rounded-lg cursor-pointer hover:bg-[#6F6AF8]/10 text-[#2B3674] font text-sm flex w-100 "
        }
        onClick={() => {
          set_open(!open);
          // onTap();
        }}
      >
        {icon && (
          <div className="icon">
            <img className="w-3 h-3" src={icon} alt="" />{" "}
          </div>
        )}
        <div className="name">{name}</div>
        <FaAngleUp className={open ? "" : "rotate-180"} />
      </div>

      <div className="pl-10">
        {open
          ? children.map((c: any, i: any) => {
              return React.cloneElement(c, { key: i, path, set_path });
            })
          : null}
      </div>
    </div>
  );
}

export function SidebarItem({
  icon,
  name,
  onTap,
  className,
  to,
  path,
  set_path,
  Link,
  menu,
}: any) {
  return (
    <Link to={to} className={className}>
      <div
        className={
          "flex-col  sidebar-item  overflow-hidden flex text-center items-center p-2 my-1  cursor-pointer  font-bold text-[9px] " +
          (path === to
            ? " rounded-l-lg ml-2 bg-[#EDF1F4]  text-[#505E8E]"
            : "text-[#A3AED0] hover:bg-gray-400/20 rounded-l-lg ml-2  ")
        }
        onClick={() => {
          set_path(to);
          if (onTap) onTap();
        }}
      >
        {icon && (
          <div
            className={
              " " +
              (path === to ||
              (path === "/institute/vendor" && to === "/institute")
                ? "shrink-0 text-[#593DF7BF]/75"
                : "text-[#A3AED0]")
            }
          >
            {icon}
          </div>
        )}

        {name}
      </div>
    </Link>
  );
}
export const Sidebar = ({
  children,
  schoolName,
  Link,
  menu,
  setMenu,
  setDevMenu,
}: any) => {
  const [path, set_path] = useState(window.location.pathname);
  //const { setPassword, setConfirmPassword } = useContext(dashboardContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("path") === "/change-password" &&
      localStorage.getItem("passwordChange") === "true"
    ) {
      localStorage.removeItem("passwordChange");
      const val = confirm("Changes will not be saved");

      if (!val) {
        navigate("/change-password");
      } else {
        //setPassword("");
        //setConfirmPassword("");
      }
    }
    localStorage.setItem("path", location.pathname);
    set_path(window.location.pathname);
  }, [window.location.pathname, location?.pathname]);

  useEffect(() => {
    if (path === "/payments" || path === "/dev") {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, [path]);

  return (
    <div
      className={
        "sidebar-container transition-all duration-150 z-50  flex fixed  w-[64px]"
        // (menu ? "md:w-72 w-64" : " w-[7rem]")
      }
      onMouseEnter={() => {
        if (path === "/payments" || path === "/dev") {
          setMenu(true);
        }
      }}
    >
      {/* {menu ? (
        <div
          onClick={() => setMenu(false)}
          className={
            "bg-black md:hidden  fixed top-0 left-0 bg-opacity-50 z-30 h-full cursor-pointer w-full block"
          }
        ></div>
      ) : null} */}
      {/* <div
        onClick={() => setMenu(!menu)}
        className="h-8 w-8 cursor-pointer z-50 flex justify-center items-center text-white rounded-full bg-[#4318FF] absolute -right-4 top-4"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          className="font-bold text-lg"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path>
        </svg>
      </div> */}
      <div className={`bg-[#1B163B]  z-40 flex flex-col w-full min-h-screen`}>
        <div
          className={
            "flex justify-center mx-auto mt-2   h-[60px] w-[60px] items-center p-4 mb-[50px] " +
            ((path === "/payments/transaction" || "/payments/settlements") &&
            menu === true
              ? "bg-gray-400/40 rounded-full"
              : "")
          }
        >
          <button
            disabled={path !== "/payments" && path !== "/dev"}
            onClick={() => {
              if (path === "/payments" || path === "/dev") {
                setMenu(!menu);
              }
            }}
          >
            <img className="h-full w-full object-cover" src={logo} alt="" />
          </button>
        </div>
        <div className="sidebar-items flex flex-col h-full">
          {children?.map((c: any, i: any) => {
            return React.cloneElement(c, {
              key: i,
              path,
              set_path,
              Link,
              menu,
            });
          })}
        </div>
      </div>
    </div>
  );
};
