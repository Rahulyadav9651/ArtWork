// import React, { useState } from 'react'
// import paint from "../../assets/painting.png"
// import { Link, useNavigate } from 'react-router-dom';
// import {Palette,UsersRound, Star,UserRound, Mail,LockKeyhole,ArrowRight,Eye,EyeClosed} from "lucide-react";
// import {toast} from "react-hot-toast";
//  import {useDispatch} from "react-redux"
// import { setSignupDate } from '../../Slices/slice/Auth';
// import { sendOtp } from '../../services/opertions/authAPI';

// const Signup = () => {
// const dispatch= useDispatch();
// const navigate= useNavigate();
// const [showPassword, setShowPassword]= useState(false);
// const [showconfirmPassword, setshowConfirmPassword]= useState(false);

// const [formData, setFormData]= useState({
//   firstName:"",
//   lastName:"",
//   email:"",
//   password:"",
//   confirmPassword:""
// })
// const {firstName, lastName, email,password, confirmPassword}= formData

// console.log("last is", lastName);
// const changeHandler =(e)=>{
//   setFormData((prevData)=>(
//     {
//     ...prevData,
//     [e.target.name]:e.target.value
//   }
//   ))
// }


// const handleOnSubmit =(e)=>{
// e.preventDefault()

// if(password!==confirmPassword){
//   toast.error("Passwoed Does not match")
// }
// const signupdata= {...formData}

// // Setting signup data to state
//     // To be used after otp verification
//     dispatch(setSignupDate(signupdata));
//     dispatch(sendOtp(email,navigate));


// }
    
//   return (
//     <div className='flex  w-full flex-col gap-6 bg-[#faf8f4] p-4 text-stone-900 lg:flex-row lg:p-6'>
      
// {/* Left panel: visible on all screens */}
// <div className='flex w-full  items-center rounded-lg border border-stone-300 bg-white/60 lg:w-1/2'>

// <div className='w-full p-5 sm:p-8 xl:p-10'>

// <h1 className='text-2xl font-bold sm:text-3xl xl:text-4xl'>Join Community of Creative Minds</h1>

// <div className='mt-3 text-sm text-stone-600 sm:text-base'> Share Your art discover artist, and be part of a global creative community.</div>

// <div className='mt-6 grid grid-cols-3 gap-2 sm:gap-3'>

// <div className='flex flex-col items-center justify-start rounded-md border border-stone-300 bg-white/70 p-2 sm:p-3'>
// <Palette  size={22} className='mb-2'/> 
// <p className='text-center text-xs font-medium sm:text-sm'>Showcase <br/> Your Art</p>

// </div>

// <div className='flex flex-col items-center justify-start rounded-md border border-stone-300 bg-white/70 p-2 sm:p-3'>
// <UsersRound  size={22} className='mb-2'/>
// <p className='text-center text-xs font-medium sm:text-sm'>Connect with Artist</p>

// </div>

// <div className='flex flex-col items-center justify-start rounded-md border border-stone-300 bg-white/70 p-2 sm:p-3'>
//     <Star size={22} className='mb-2'/>
//     <p className='text-center text-xs font-medium sm:text-sm'>Get Inspired Every Day</p>
// </div>

// </div>

// {/* Artistic illustration */}
// <div className='mt-6 overflow-hidden rounded-lg sm:mt-8'>
// <img src={paint} alt='Colorful art supplies and creative artwork' className='h-48 w-full object-cover sm:h-64 lg:h-full'/>

// </div>



// </div>


// </div>

// {/* Login Form */}
// <div className='flex w-full flex-col justify-center rounded-lg border border-stone-200/80 bg-[#f5eee5] p-5 shadow-[0_15px_60px_rgba(40,30,20,0.06)] sm:p-8 lg:w-1/2'>

// <div className='flex items-center justify-center gap-2.5'>
//   <Palette  size={32}/>
//   <p className='text-center text-2xl font-bold sm:text-3xl'>Create Your Account </p>
// </div>

// {/* Login Form */}

// <form onSubmit={handleOnSubmit} className='mx-auto w-full max-w-lg'>

// <div className='mt-6 flex flex-col gap-4'>

// <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
// <label className='block'>
// <p className='mb-1.5 text-sm font-medium'>First Name</p>
// <div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
// <UserRound size={20} className='shrink-0'/>
//   <input
//   type="text"
//   name="firstName"
//   value={firstName}
//   onChange={changeHandler}
//   placeholder="First name"
//   className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none"
// />
// </div>

// </label>

// <label className='block'>
// <p className='mb-1.5 text-sm font-medium'>Last Name</p>
// <div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
// <UserRound size={20} className='shrink-0'/>
//   <input
//   type="text"
//   name="lastName"
//   value={lastName}
//   onChange={changeHandler}
//   placeholder="Enter last name"
//   required
// />
// </div>

// </label>

// </div>

// <div>
// <label className='block'>
// <p className='mb-1.5 text-sm font-medium'>Email Address</p>
// <div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
// <Mail size={18} className='shrink-0'/>
// <input  type='email'  onChange={changeHandler} name='email' placeholder='Email Address' value={email} className='w-full min-w-0 bg-transparent py-2.5 text-sm outline-none'/>

// </div>
// </label>

// </div>

// <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
// <label className='block'>
//   <p className='mb-1.5 text-sm font-medium'>Password</p>
// <div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
// <LockKeyhole size={18} className='shrink-0'/>
// <input type={showPassword ? "text":"password"} onChange={changeHandler} value={password} name='password' placeholder='Password' className='w-full min-w-0 bg-transparent py-2.5 text-sm outline-none'/>
// <span onClick={()=>setShowPassword((prev)=>!prev)} className='shrink-0 cursor-pointer'>{showPassword ? (<Eye />):(<EyeClosed />)}</span>
// </div>

// </label>

// <label className='block'>
//   <p className='mb-1.5 text-sm font-medium'>Confirm Password</p>
// <div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
// <LockKeyhole size={18} className='shrink-0'/>
// <input
//   type={showconfirmPassword ? "text" : "password"}
//   name="confirmPassword"
//   value={confirmPassword}
//   onChange={changeHandler}
//   placeholder="Confirm Password"
//   className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none"
// />
// <span onClick={()=>setshowConfirmPassword((prev)=>!prev)} className='shrink-0 cursor-pointer'>{showconfirmPassword ? (<Eye/>):(<EyeClosed/>)}</span>
// </div>

// </label>



// </div>


// <button type='submit' className='mt-2 w-full cursor-pointer rounded-md bg-black px-4 py-3 font-medium text-white'>Create Account  
//   </button>

//   </div>

// <Link to='/login'>
// <p className='mt-4 text-center text-sm text-stone-600'>Already have an account? Login</p>
// </Link>


// </form>


// </div>


//     </div>
//   )
// }

// export default Signup





import React, { useState } from 'react'
import paint from "../../assets/painting.png"
import { Link, useNavigate } from 'react-router-dom';
import {Palette,UsersRound, Star,UserRound, Mail,LockKeyhole,ArrowRight,Eye,EyeClosed} from "lucide-react";
import {toast} from "react-hot-toast";
 import {useDispatch} from "react-redux"
import { setSignupDate } from '../../Slices/slice/Auth';
import { sendOtp } from '../../services/opertions/authAPI';

const Signup = () => {
const dispatch= useDispatch();
const navigate= useNavigate();
const [showPassword, setShowPassword]= useState(false);
const [showconfirmPassword, setshowConfirmPassword]= useState(false);

const [formData, setFormData]= useState({
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  confirmPassword:""
})
const {firstName, lastName, email,password, confirmPassword}= formData

console.log("last is", lastName);
const changeHandler =(e)=>{
  setFormData((prevData)=>(
    {
    ...prevData,
    [e.target.name]:e.target.value
  }
  ))
}


const handleOnSubmit =(e)=>{
e.preventDefault()

if(password!==confirmPassword){
  toast.error("Passwoed Does not match")
}
const signupdata= {...formData}

// Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupDate(signupdata));
    dispatch(sendOtp(email,navigate));


}
    
  return (
    <div className='flex min-h-screen w-full max-w-full flex-col gap-6 overflow-x-hidden bg-[#faf8f4] p-4 text-stone-900 lg:flex-row lg:p-6'>
      
{/* Left panel: visible on all screens */}
<div className='flex w-full min-w-0 items-center rounded-lg border border-stone-300 bg-white/60 lg:w-1/2'>

<div className='w-full min-w-0 p-5 sm:p-8 xl:p-10'>

<h1 className='text-2xl font-bold sm:text-3xl xl:text-4xl'>Join Community of Creative Minds</h1>

<div className='mt-3 text-sm text-stone-600 sm:text-base'> Share Your art discover artist, and be part of a global creative community.</div>

<div className='mt-6 grid grid-cols-3 gap-2 sm:gap-3'>

<div className='flex min-w-0 flex-col items-center justify-start rounded-md border border-stone-300 bg-white/70 p-2 sm:p-3'>
<Palette  size={22} className='mb-2'/> 
<p className='text-center text-xs font-medium sm:text-sm'>Showcase <br/> Your Art</p>

</div>

<div className='flex min-w-0 flex-col items-center justify-start rounded-md border border-stone-300 bg-white/70 p-2 sm:p-3'>
<UsersRound  size={22} className='mb-2'/>
<p className='text-center text-xs font-medium sm:text-sm'>Connect with Artist</p>

</div>

<div className='flex min-w-0 flex-col items-center justify-start rounded-md border border-stone-300 bg-white/70 p-2 sm:p-3'>
    <Star size={22} className='mb-2'/>
    <p className='text-center text-xs font-medium sm:text-sm'>Get Inspired Every Day</p>
</div>

</div>

{/* Artistic illustration */}
<div className='mt-6 overflow-hidden rounded-lg sm:mt-8'>
<img src={paint} alt='Colorful art supplies and creative artwork' className='h-48 w-full max-w-full object-cover sm:h-64 lg:h-full'/>

</div>



</div>


</div>

{/* Login Form */}
<div className='flex w-full min-w-0 flex-col justify-center rounded-lg border border-stone-200/80 bg-[#f5eee5] p-5 shadow-[0_15px_60px_rgba(40,30,20,0.06)] sm:p-8 lg:w-1/2'>

<div className='flex flex-wrap items-center justify-center gap-2.5'>
  <Palette  size={32}/>
  <p className='text-center text-2xl font-bold sm:text-3xl'>Create Your Account </p>
</div>

{/* Login Form */}

<form onSubmit={handleOnSubmit} className='mx-auto w-full min-w-0 max-w-lg'>

<div className='mt-6 flex flex-col gap-4'>

<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
<label className='block min-w-0'>
<p className='mb-1.5 text-sm font-medium'>First Name</p>
<div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
<UserRound size={20} className='shrink-0'/>
  <input
  type="text"
  name="firstName"
  value={firstName}
  onChange={changeHandler}
  placeholder="First name"
  className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none"
/>
</div>

</label>

<label className='block min-w-0'>
<p className='mb-1.5 text-sm font-medium'>Last Name</p>
<div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
<UserRound size={20} className='shrink-0'/>
  <input
  type="text"
  name="lastName"
  value={lastName}
  onChange={changeHandler}
  placeholder="Enter last name"
  required
  className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none"
/>
</div>

</label>

</div>

<div>
<label className='block min-w-0'>
<p className='mb-1.5 text-sm font-medium'>Email Address</p>
<div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
<Mail size={18} className='shrink-0'/>
<input  type='email'  onChange={changeHandler} name='email' placeholder='Email Address' value={email} className='w-full min-w-0 bg-transparent py-2.5 text-sm outline-none'/>

</div>
</label>

</div>

<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
<label className='block min-w-0'>
  <p className='mb-1.5 text-sm font-medium'>Password</p>
<div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
<LockKeyhole size={18} className='shrink-0'/>
<input type={showPassword ? "text":"password"} onChange={changeHandler} value={password} name='password' placeholder='Password' className='w-full min-w-0 bg-transparent py-2.5 text-sm outline-none'/>
<span onClick={()=>setShowPassword((prev)=>!prev)} className='shrink-0 cursor-pointer'>{showPassword ? (<Eye />):(<EyeClosed />)}</span>
</div>

</label>

<label className='block min-w-0'>
  <p className='mb-1.5 text-sm font-medium'>Confirm Password</p>
<div className='flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10'>
<LockKeyhole size={18} className='shrink-0'/>
<input
  type={showconfirmPassword ? "text" : "password"}
  name="confirmPassword"
  value={confirmPassword}
  onChange={changeHandler}
  placeholder="Confirm Password"
  className="w-full min-w-0 bg-transparent py-2.5 text-sm outline-none"
/>
<span onClick={()=>setshowConfirmPassword((prev)=>!prev)} className='shrink-0 cursor-pointer'>{showconfirmPassword ? (<Eye/>):(<EyeClosed/>)}</span>
</div>

</label>



</div>


<button type='submit' className='mt-2 w-full cursor-pointer rounded-md bg-black px-4 py-3 font-medium text-white'>Create Account  
  </button>

  </div>

<Link to='/login'>
<p className='mt-4 text-center text-sm text-stone-600'>Already have an account? Login</p>
</Link>


</form>


</div>


    </div>
  )
}

export default Signup