import {
    UserRound,
    Palette,
    Heart,
    Settings,
    LogOut
} from 'lucide-react';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/opertions/authAPI';

import ProfileContent from '../Profile/ProfileContent';
import ArtworkContent from '../Profile/ArtworkContent';
import SavedContent from '../Profile/SavedContent';
import SettingsContent from '../Profile/SettingsContent';

const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuItems = [
        { name: "My Profile", icon: UserRound },
        { name: "My Artwork", icon: Palette },
        { name: "Saved Artwork", icon: Heart },
        { name: "Settings", icon: Settings },
    ];

    const [activeTab, setActiveTab] = useState("My Profile");

    const tabComponents = {
        "My Profile": <ProfileContent />,
        "My Artwork": <ArtworkContent />,
        "Saved Artwork": <SavedContent />,
        "Settings": <SettingsContent />,
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full bg-[#292334]">

            {/* Sidebar */}
            <div className="bg-[#211C2D] text-[#F4EAF7] flex flex-col min-w-[230px] h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-6">

                <h1 className="text-3xl font-bold font-serif mb-2">
                    Artify<span className="text-[#B89ACB]">.</span>
                </h1>

                <p className="text-xs tracking-widest mb-8 text-[#94869F]">
                    CREATIVE SPACE
                </p>

                <nav className="space-y-2">

                    {/* Navigation Items */}
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-3 cursor-pointer px-4 py-3 transition rounded-xl ${
                                activeTab === item.name
                                    ? "bg-[#493B59] text-[#F4EAF7]"
                                    : "text-[#B8A9C6] hover:bg-[#30283E] hover:text-white"
                            }`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </button>
                    ))}

                    {/* Logout directly below Settings */}
                    <div className="border-t border-[#51445F] mt-4 pt-4">
                        <button
                            className="w-full flex items-center gap-3 text-[#D9A3B4] hover:bg-[#493B59] hover:text-white cursor-pointer px-4 py-3 rounded-xl transition"
                            onClick={() => dispatch(logout(navigate))}
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>

                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 p-8 bg-[#292334]">
                {tabComponents[activeTab]}
            </div>

        </div>
    );
};

export default MyProfile;