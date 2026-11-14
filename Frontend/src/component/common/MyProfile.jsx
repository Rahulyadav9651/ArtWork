import {
  UserRound,
  Palette,
  Heart,
  Settings,
  LogOut,
} from 'lucide-react'
import sidebar from "../../assets/sidebar.png"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/opertions/authAPI'

import ProfileContent from '../Profile/ProfileContent'
import ArtworkContent from '../Profile/ArtworkContent'
import SavedContent from '../Profile/SavedContent'
import SettingsContent from '../Profile/SettingsContent'

const menuItems = [
  { name: "My Profile", icon: UserRound },
  { name: "My Artwork", icon: Palette },
  { name: "Saved Artwork", icon: Heart },
  { name: "Settings", icon: Settings },
]

const MyProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("My Profile")

  const tabComponents = {
    "My Profile": <ProfileContent />,
    "My Artwork": <ArtworkContent />,
    "Saved Artwork": <SavedContent />,
    "Settings": <SettingsContent />,
  }

  return (
    <div className="flex h-[calc(100dvh-4rem)] w-full flex-col overflow-hidden bg-[#292334] md:flex-row">

      {/* Sidebar (top tab bar on mobile, vertical sidebar on md+) */}
      <aside className="flex shrink-0 flex-col bg-[#211C2D] text-[#F4EAF7] md:h-full md:w-[230px] md:overflow-y-auto md:p-6 lg:w-[260px]">

        {/* Brand (desktop only) */}
        <div className="hidden md:block">
          <h1 className="mb-2 font-serif text-3xl font-bold">
            Artify<span className="text-[#B89ACB]">.</span>
          </h1>
          <p className="mb-8 text-xs tracking-widest text-[#94869F]">
            CREATIVE SPACE
          </p>
        </div>

        <nav className="flex items-center gap-2 overflow-x-auto p-3 md:flex-col md:items-stretch md:overflow-visible md:p-0">
          {menuItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveTab(item.name)}
              className={`flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm transition md:w-full md:gap-3 md:px-4 md:py-3 md:text-base ${
                activeTab === item.name
                  ? "bg-[#493B59] text-[#F4EAF7]"
                  : "text-[#B8A9C6] hover:bg-[#30283E] hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}

          {/* Logout */}
          <div className="ml-1 shrink-0 border-l border-[#51445F] pl-2 md:ml-0 md:mt-2 md:border-l-0 md:border-t md:pl-0 md:pt-4">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm text-[#D9A3B4] transition hover:bg-[#493B59] hover:text-white md:gap-3 md:px-4 md:py-3 md:text-base"
              onClick={() => dispatch(logout(navigate))}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Sidebar image (desktop only) */}
        <div className="group relative mt-6 hidden overflow-hidden rounded-2xl border border-[#51445F] md:block">
          <img
            src={sidebar}
            alt="Sidebar"
            className="h-[200px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#211C2D]/70 via-transparent to-transparent" />
        </div>
      </aside>

      {/* Main content (scrolls independently) */}
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[#292334] p-3 sm:p-5 lg:p-8">
        {tabComponents[activeTab]}
      </main>
    </div>
  )
}

export default MyProfile