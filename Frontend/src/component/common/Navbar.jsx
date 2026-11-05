// import logo from "../../assets/logo.png"
// import { Link, NavLink } from "react-router-dom";
// import {useSelector} from "react-redux"
// import ProfileDropdown from "../pages/ProfileDropdown";

// import React from 'react'
// import {Heart,
//   Bell,
//   ChevronDown,
//   Menu,
//   X,
//   User,
//   LogOut,
//   Palette,} from "lucide-react";
// const navlink=[
//         {
//             name:"Home",
//             path:'/'

//         },
//         {
//             name:"Explore", path:'/explore'
//         },
//         {name:"Artist",path:"/artist"},
//         {name:"Collection", path:"/collection"},

//     ]



// const Navbar = () => {
// const {token}= useSelector((state)=>state.auth)
// const {user}= useSelector((user)=>user.auth)


//   return (
//     <div className="sticky top-0  border-b flex ">
//       <nav className="flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
// <Link to='/'>
// <span className="text-3xl font-bold italic items-center justify-between gap-5 px-5 font-serif">
// Artify
// </span>


// </Link>

// <div className="items-center gap-7">
//     {
//      navlink.map((link)=>(
//            <NavLink key={link.name} to={link.path} className={({ isActive }) =>
//                 `border-b-2 pb-1 text-sm font-medium transition ${
//                   isActive
//                     ? "border-stone-900 text-stone-900"
//                     : "border-transparent text-stone-600 hover:text-stone-950"
//                 }`
//               }>
// {link.name}

//            </NavLink>
//         ))
//     }
// </div>
//  {/* Action Icons */}
//  <div className=" flex items-center hide gap-5 ">
// <Link to='/favorite' className="text-stone-700 transition hover:text-rose-700">
// <Heart size={21}/>
// </Link>

// <Link to='/notification' className="text-stone-700 transition hover: text-stone-950">

// <Bell size={21}/>
// </Link>


//  </div>

//    {/* Profile Dropdown */}



// {
//   token==null ? (
// <div className="flex gap-3 "> 
//   <Link to='/login'>
//   <button className="border black px-2 py-2 bg-gray-400 rounded-lg cursor-pointer">Login</button>
  
//   </Link>
//   <Link to='/signup'>
//   <button className="border black px-2 py-2 rounded-md bg-gray-400 ">Signup</button>
//   </Link>
  
//    </div>


//   ): (
// <div >
//  <ProfileDropdown />
//   </div>

//      )
// }








   

//       </nav>
//     </div>
//   )
// }

// export default Navbar




import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "../pages/ProfileDropdown";
import {
  Heart,
  Bell,
  Menu,
  X,
  Palette,
} from "lucide-react";

const navlink = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Artist", path: "/artist" },
  { name: "Collection", path: "/collection" },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0  w-full border-b border-stone-200 bg-[#faf8f4]/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <div className="rounded-lg bg-[#d65f27] p-2 text-white">
            <Palette size={23} />
          </div>

          <span className="font-serif text-2xl font-bold italic text-stone-900 sm:text-3xl">
            Artify<span className="text-[#d65f27]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navlink.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `border-b-2 pb-1 text-sm font-medium transition ${
                  isActive
                    ? "border-[#d65f27] text-[#d65f27]"
                    : "border-transparent text-stone-600 hover:border-[#d65f27] hover:text-[#d65f27]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-5 md:flex">

          {token && (
            <>
              <Link
                to="/favorite"
                className="text-stone-700 transition hover:text-[#d65f27]"
                aria-label="Favorites"
              >
                <Heart size={21} />
              </Link>

              <Link
                to="/notification"
                className="text-stone-700 transition hover:text-[#d65f27]"
                aria-label="Notifications"
              >
                <Bell size={21} />
              </Link>
            </>
          )}

          {/* Authentication */}
          {token == null ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-[#d65f27] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b94e20]"
              >
                Signup
              </Link>
            </div>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-stone-800 transition hover:bg-stone-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-stone-200 bg-[#faf8f4] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">

            {navlink.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-[#d65f27]"
                      : "text-stone-700 hover:text-[#d65f27]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {token && (
              <div className="flex items-center gap-5 border-t border-stone-200 pt-4">
                <Link
                  to="/favorite"
                  onClick={() => setIsOpen(false)}
                  className="text-stone-700 hover:text-[#d65f27]"
                >
                  <Heart size={21} />
                </Link>

                <Link
                  to="/notification"
                  onClick={() => setIsOpen(false)}
                  className="text-stone-700 hover:text-[#d65f27]"
                >
                  <Bell size={21} />
                </Link>
              </div>
            )}

            {token == null ? (
              <div className="flex flex-col gap-3 border-t border-stone-200 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-stone-300 py-2.5 text-center text-sm font-semibold text-stone-700"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-[#d65f27] py-2.5 text-center text-sm font-semibold text-white"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="border-t border-stone-200 pt-4">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;