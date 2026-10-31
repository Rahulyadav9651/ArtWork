import logo from "../../assets/logo.png"
import { Link, NavLink } from "react-router-dom";
import {useSelector} from "react-redux"


import React from 'react'
import {Heart,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  Palette,} from "lucide-react";
const navlink=[
        {
            name:"Home",
            path:'/'

        },
        {
            name:"Explore", path:'/explore'
        },
        {name:"Artist",path:"/artist"},
        {name:"Collection", path:"/collection"},

    ]



const Navbar = () => {
const {token}= useSelector((state)=>state.auth)
const {user}= useSelector((user)=>user.auth)


  return (
    <div className="sticky top-0  border-b flex ">
      <nav className="flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
<Link to='/'>
<span className="text-3xl font-bold italic items-center justify-between gap-5 px-5 font-serif">
Artify
</span>


</Link>

<div className="items-center gap-7">
    {
     navlink.map((link)=>(
           <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                `border-b-2 pb-1 text-sm font-medium transition ${
                  isActive
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-600 hover:text-stone-950"
                }`
              }>
{link.name}

           </NavLink>
        ))
    }
</div>
 {/* Action Icons */}
 <div className=" flex items-center hide gap-5 ">
<Link to='/favorite' className="text-stone-700 transition hover:text-rose-700">
<Heart size={21}/>
</Link>

<Link to='/notification' className="text-stone-700 transition hover: text-stone-950">

<Bell size={21}/>
</Link>


 </div>

   {/* Profile Dropdown */}



{
  token==null ? (
<div className="flex gap-3 "> 
  <Link to='/login'>
  <button className="border black px-2 py-2 bg-gray-400 rounded-lg cursor-pointer">Login</button>
  
  </Link>
  <Link to='/signup'>
  <button className="border black px-2 py-2 rounded-md bg-gray-400 ">Signup</button>
  </Link>
  
   </div>


  ): (<div className="relative">
    
    <button onClick={()=>setProfileOpen(!profileOpne)}
  
  className="flex items-center gap-2 text-stone-700"
  >
<span className="flex h-9 w-9 items-center justify-between rounded-full">
  <User size={19}/>
</span>
<ChevronDown size={16}/>

</button>





    
    
    
    
     </div>)
}








   

      </nav>
    </div>
  )
}

export default Navbar
