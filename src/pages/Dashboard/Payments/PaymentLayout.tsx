import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export default function PaymentLayout({ menu = true }: { menu: boolean }) {
  const location = useLocation();
  return (
    <div className="flex">
      <div
        className={
          "  transition-transform duration-200 fixed overflow-hidden   pt-10 " +
          (menu ? "translate-x-0 w-56" : " -translate-x-[100%] w-0 ")
        }
      >
        <div className=" flex flex-col space-y-1 min-h-screen shrink-0">
          <NavLink
            to="/payments/transaction"
            className={({ isActive }) => {
              const active = isActive || location.pathname === "/payments";
              return active
                ? "bg-[#6687FF33]   py-1.5 font-semibold rounded-lg text-[14px] text-left pl-10 text-[#1B163B]"
                : "py-1.5 font-semibold rounded-lg text-[14px] text-left pl-10 text-[#717171]";
            }}
          >
            Transaction
          </NavLink>
          <NavLink
            to="/payments/settlements"
            className={({ isActive }) =>
              isActive
                ? "bg-[#6687FF33]   py-1.5 font-semibold rounded-lg text-[14px] text-left pl-10 text-[#1B163B]"
                : "py-1.5 font-semibold rounded-lg text-[14px] text-left pl-10 text-[#717171]"
            }
          >
            Settlements
          </NavLink>
          <NavLink
            to="/payments/refunds"
            className={({ isActive }) =>
              isActive
                ? "bg-[#6687FF33]   py-1.5 font-semibold rounded-lg text-[14px] text-left pl-10 text-[#1B163B]"
                : "py-1.5 font-semibold rounded-lg text-[14px] text-left pl-10 text-[#717171]"
            }
          >
            Refund
          </NavLink>
        </div>
      </div>
      <div className={"tab-content w-full py-4 " + (menu ? " pl-64" : " pl-2")}>
        <Outlet />
      </div>
    </div>
  );
}
