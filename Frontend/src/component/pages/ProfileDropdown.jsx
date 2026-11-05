
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "../../services/opertions/authAPI";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={ref} >
      {/* Profile Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-x-2 rounded-full bg-[#30283E] p-1.5 hover:bg-[#493B59] transition"
      >
        {user.image ? (
          <img
            src={user.image}
            alt="profile"
            className="h-[32px] w-[32px] rounded-full object-cover"
          />
        ) : (
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#B89ACB] text-xs font-semibold text-[#211C2D]">
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </div>
        )}

        <ChevronDown
          size={16}
          className={`text-[#D3BDE0] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Profile Dropdown */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[118%] z-[1000] w-48 overflow-hidden rounded-xl border border-[#51445F] bg-[#211C2D] shadow-xl shadow-black/30"
        >
          {/* Dashboard */}
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-x-3 px-4 py-3 text-sm text-[#F4EAF7] hover:bg-[#30283E] transition"
          >
            <LayoutDashboard size={17} className="text-[#B89ACB]" />
            Dashboard
          </Link>

         
          {/* Logout - Just below Settings */}
          <div className="border-t border-[#51445F]">
            <button
              type="button"
              onClick={() => {
                dispatch(logout(navigate));
                setOpen(false);
              }}
              className="flex w-full cursor-pointer items-center gap-x-3 px-4 py-3 text-left text-sm text-[#D9A3B4] hover:bg-[#493B59] transition"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
