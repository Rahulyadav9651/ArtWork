import React, { useState } from 'react'
import setting from "../../assets/Setting.png"
import { Link, useNavigate } from 'react-router-dom'
import { deleteAccount } from '../../services/opertions/authAPI'

import {User,ArrowRight, ShieldCheck, BellRing, Images ,Trash2,AlertTriangle, X} from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'





const SettingsContent = () => {

 const [showDeleteModal, setShowDeleteModal] = useState(false);
const dispatch= useDispatch();
const navigate= useNavigate();
const { token } = useSelector((state) => state.auth)
const {artwork}= useSelector((state)=>state. art)
//console.log("re", artwork)


  return (
    <div className=' min-h-screen w-full  text-[#F4EAF7] '>
      
<div className="relative isolate flex h-36 w-full items-center justify-between overflow-hidden rounded-xl border border-[#51405F]/60 bg-gradient-to-r from-[#21182E] via-[#30203F] to-[#4B2B5B] px-6 sm:px-9">

  {/* Background image */}
  <img
    src={setting}
    alt="Artistic settings background"
    className="absolute right-0 top-0 -z-10 h-full w-[55%] object-cover object-right opacity-80"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#21182E] via-[#21182E]/90 to-transparent" />

  {/* Heading and description */}
  <div className="relative z-10 max-w-[600px]">
    <h1 className="font-serif text-4xl font-bold tracking-tight text-[#F4EAF7] sm:text-5xl">
      Settings
    </h1>

    <div className="mt-2 h-1 w-14 rounded-full bg-[#B66BE0]" />

    <p className="mt-3 text-sm text-[#C9B5D8] sm:text-base">
      Manage your creative space and account preferences.
    </p>
  </div>

</div>

<div className="mt-3 flex flex-col gap-2.5 md:flex-row">
  <div className="flex min-h-39 w-full gap-4 rounded-lg border border-[#51405F]/50 bg-gradient-to-br from-[#342840] to-[#261F33] pb-5 sm:gap-6 md:flex-1 transition duration-300 hover:-translate-y-1 hover:border-[#A76BC8]/70 hover:shadow-lg hover:shadow-purple-950/20">
    <div className="mt-5 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#49335D]">
      <User size={30} />
    </div>
    <div className="mt-5 flex min-w-0 flex-1 flex-col">
      <p className="text-lg font-medium sm:text-xl">Profile Settings</p>
      <p className="text-sm text-[#C9B5D8] sm:text-base">Update Your profile information,photo and bio.</p>

      <Link to='/profile/editProfile' className="mt-2.5 flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#C9B5D8] bg-[#49335D] sm:w-40">
        <p className="font-semibold">Edit profile</p>
        <ArrowRight />
      </Link>
    </div>
  </div>

  <div className="flex min-h-39 w-full gap-4 rounded-lg border border-[#51405F]/50 bg-gradient-to-br from-[#342840] to-[#261F33] pb-5 sm:gap-6 md:flex-1 transition duration-300 hover:-translate-y-1 hover:border-[#A76BC8]/70 hover:shadow-lg hover:shadow-purple-950/20">
    <div className="mt-5 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#49335D]">
      <ShieldCheck size={30} />
    </div>
    <div className="mt-5 flex min-w-0 flex-1 flex-col">
      <p className="text-lg font-medium sm:text-xl">Security</p>
      <p className="text-sm text-[#C9B5D8] sm:text-base">Manage Your password and account security.</p>

      <div className="mt-2.5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#C9B5D8] bg-[#49335D] sm:w-47">
        <p className="font-semibold">Change Password</p>
        <ArrowRight />
      </div>
    </div>
  </div>
</div>

<div className="mt-3 flex flex-col gap-2.5 md:flex-row">
  <div className="flex min-h-39 w-full gap-4 rounded-lg border border-[#51405F]/50 bg-gradient-to-br from-[#342840] to-[#261F33] pb-5 sm:gap-6 md:flex-1 transition duration-300 hover:-translate-y-1 hover:border-[#A76BC8]/70 hover:shadow-lg hover:shadow-purple-950/20">
    <div className="mt-5 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#49335D]">
      <BellRing size={30} />
    </div>
    <div className="mt-5 flex min-w-0 flex-1 flex-col">
      <p className="text-lg font-medium sm:text-xl">Notifications</p>
      <p className="text-sm text-[#C9B5D8] sm:text-base">choose what notifications you want to receive..</p>

      <div className="mt-3.5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#C9B5D8] bg-[#49335D] sm:w-49">
        <p className="font-semibold">Manage Notifications</p>
        <ArrowRight />
      </div>
    </div>
  </div>

  <div className="flex min-h-39 w-full gap-4 rounded-lg border border-[#51405F]/50 bg-gradient-to-br from-[#342840] to-[#261F33] pb-5 sm:gap-6 md:flex-1 transition duration-300 hover:-translate-y-1 hover:border-[#A76BC8]/70 hover:shadow-lg hover:shadow-purple-950/20">
    <div className="mt-5 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#49335D]">
      <Images size={30} />
    </div>
    <div className="mt-5 flex min-w-0 flex-1 flex-col gap-2">
  <p className="text-sm font-medium text-[#B8A9C6] sm:text-base">
    Total Uploaded Images
  </p>

  <div className="flex items-center gap-3">
    <span className="text-3xl font-bold tracking-tight text-[#F4EAF7] sm:text-4xl">
      {artwork?.length ?? 0}
    </span>

    <span className="rounded-full border border-[#B89ACB]/30 bg-[#493B59] px-3 py-1 text-xs font-medium text-[#D8C4E8]">
      Uploaded
    </span>
  </div>
</div>
  </div>
</div>

{/* Danger zone */}
      <div className="mt-2 flex flex-col justify-between gap-5 rounded-[20px] border border-[#78324E]/60 bg-gradient-to-r from-[#382333] to-[#291D2D] p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center gap-4">
          <AlertTriangle size={40} strokeWidth={1.7} className="shrink-0 text-[#F05C86]" />
          <div>
            <h2 className="text-lg font-bold text-[#F05C86] sm:text-xl">
              Danger Zone
            </h2>
            <p className="mt-1 text-sm text-[#C5AFC9]">
              Permanently delete your account and all your data.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#963052] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B53D62] cursor-pointer"
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>

 {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#75445F] bg-[#2B2033] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-[#F05C86]" size={27} />
                <h3 className="text-xl font-bold text-white">
                  Delete Account?
                </h3>
              </div>
              <button onClick={() => setShowDeleteModal(false)}>
                <X className="text-[#C7B2D2]" />
              </button>
            </div>

            <p className="text-sm leading-6 text-[#C7B2D2]">
              This action may permanently remove your profile, artwork, and
              account data. Are you sure you want to continue?
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-[#665272] px-5 py-2.5 text-sm text-[#E8DCEF] hover:bg-[#493650]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  //onDeleteAccount?.();
                    dispatch(deleteAccount(token,navigate))
                  // delete Function  
                }}
                className="rounded-xl bg-[#A52F53] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#C33D66]"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default SettingsContent
