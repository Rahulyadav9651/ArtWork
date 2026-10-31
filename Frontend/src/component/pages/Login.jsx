
import React, { useState } from "react";
import LoIcon from "../../assets/login.png";
import {
  Palette,
  UsersRound,
  Star,
  Mail,
  LockKeyhole,
  ArrowRight,
  Eye,EyeClosed
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/opertions/authAPI";
import { useDispatch } from "react-redux";
const Login = () => {
const dispatch= useDispatch();
const navigate= useNavigate();

const [formData, setFormData]= useState({
    email:"",
    password:"",
})

const [showPassword, setShowPassword]= useState(false);

const {email, password}= formData

const changeHandler=(e)=>{
    setFormData((prev)=>(
        {
            ...prev,
            [e.target.name]: e.target.value
        }
    ))

}

const handlerOnsubmit=(e)=>{
    e.preventDefault();
    dispatch(login(email, password, navigate))
}


  return (
    <div className="min-h-screen w-full bg-[#f7f2e9] text-[#202629] flex flex-col lg:flex-row items-center justify-center gap-6 p-4 sm:p-6 lg:p-8">

      {/* Left Section */}
      <div className="w-full lg:w-[45%] min-h-full border border-[#d65f27]/20 rounded-2xl flex flex-col justify-between px-5 sm:px-8 py-6 bg-[#f7f2e9]">

        <div className="flex items-center gap-2.5 mb-6">
          <Palette size={35} className="text-[#d65f27]" />
          <h1 className="text-3xl font-bold">Artify</h1>
        </div>

        <p className="text-[#d65f27] mb-3 font-bold tracking-widest text-sm">
          YOUR CREATIVE SPACE
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Welcome Back to
        </h1>

        <h1 className="text-4xl text-[#d65f27] font-medium italic">
          Artify.
        </h1>

        <p className="py-3 text-sm sm:text-base font-medium leading-7 text-stone-600">
          Your creativity has a home. Discover inspiring artwork, connect
          with talented artists, and continue sharing your imagination
          with the world.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">

          <div className="flex flex-col min-h-24 border border-[#d65f27]/20 rounded-lg justify-center items-center bg-white p-3 text-center">
            <Palette size={25} className="text-[#d65f27] mb-2" />
            <p className="font-semibold text-sm">Showcase Your Art</p>
          </div>

          <div className="flex flex-col min-h-24 border border-[#d65f27]/20 rounded-lg justify-center items-center bg-white p-3 text-center">
            <UsersRound size={25} className="text-[#d65f27] mb-2" />
            <p className="font-semibold text-sm">Connect with Artists</p>
          </div>

          <div className="flex flex-col min-h-24 border border-[#d65f27]/20 rounded-lg justify-center items-center bg-white p-3 text-center">
            <Star size={25} className="text-[#d65f27] mb-2" />
            <p className="font-semibold text-sm">Get Inspired Every Day</p>
          </div>

        </div>

        <img
          src={LoIcon}
          alt="Artify creative illustration"
          className="mx-auto max-h-[350px] sm:max-h-[390px] w-full rounded-3xl object-contain my-3"
        />

        <div className="flex items-center justify-center gap-2.5 mt-4">
          <Star size={20} className="text-[#d65f27] shrink-0" />
          <p className="text-sm sm:text-base leading-7 text-stone-600 font-semibold">
            Every artist has a story. Continue yours.
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[50%] border border-[#d65f27]/10 rounded-2xl bg-white p-6 sm:p-10 flex flex-col justify-center shadow-lg">

        <div className="flex flex-col items-center justify-center mb-8">
          <Palette size={40} className="text-[#d65f27]" />

          <h1 className="font-bold text-3xl sm:text-4xl pt-3 text-center">
            Welcome Back!
          </h1>

          <p className="font-medium p-1 text-stone-500 text-center">
            Sign in to continue your creative journey.
          </p>
        </div>

        <form onSubmit={handlerOnsubmit} className="w-full ">

          {/* Email */}
          <label className="block mb-5">
            <p className="px-1 mb-2 font-semibold">Email Address</p>

            <div className="flex gap-3 border border-black/20 rounded-lg w-full items-center px-4 py-3 focus-within:border-[#d65f27] transition">
              <Mail size={20} className="text-stone-500 shrink-0" />

              <input
                type="email"
                name="email"
                value={email}
                onChange={changeHandler}
                
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-sm"
              />
            </div>
          </label>

          {/* Password */}
          <label className="block mb-4">
            <p className="px-1 mb-2 font-semibold">Password</p>

            <div className="flex gap-3 border border-black/20 rounded-lg w-full items-center px-4 py-3 focus-within:border-[#d65f27] transition">
              <LockKeyhole size={20} className="text-stone-500 shrink-0" />

              <input
                type={showPassword ? "text":"password"}
                name="password"
                value={password}
                onChange={changeHandler}
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent text-sm"
            
              />
              <span onClick={()=>setShowPassword((prev)=>!prev)} >{showPassword? (<Eye/>):(<EyeClosed/>)}</span>
            </div>
          </label>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-[#d65f27] transition hover:text-[#a94318]"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-3 text-white w-full bg-[#d65f27] hover:bg-[#bd4e1e] transition rounded-lg font-bold py-3.5"
          >
            Login to Account
            <ArrowRight size={20} />
          </button>

        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#eee6dd]" />
          <span className="text-xs text-stone-400 whitespace-nowrap">
            NEW TO ARTIFY?
          </span>
          <div className="h-px flex-1 bg-[#eee6dd]" />
        </div>

        <p className="text-center text-sm text-stone-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-[#d65f27] transition hover:text-[#a94318]"
          >
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;
