
// import React, { useState } from "react";
// import {
//   Search,
//   Upload,
//   Heart,
//   Pencil,
//   Trash2,
//   CalendarDays,
//   Image,
//   Palette,
//   MoreVertical,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const MyArtwork = ({ myArtData = [], onEdit, onDelete, onUpload }) => {
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All Artwork");
//   const [menuOpen, setMenuOpen] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const categories = [
//     "All Artwork",
//     "Digital",
//     "Traditional",
//     "Sketches",
//   ];

//   const filteredArtwork = myArtData.filter((art) => {
//     const matchesSearch = art.title
//       ?.toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesCategory =
//       activeCategory === "All Artwork" ||
//       art.category?.toLowerCase() === activeCategory.toLowerCase();

//     return matchesSearch && matchesCategory;
//   });

//   const itemsPerPage = 6;
//   const totalPages = Math.ceil(filteredArtwork.length / itemsPerPage);

//   const displayedArtwork = filteredArtwork.slice(
//     (
//       currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="min-h-screen bg-[#1B1525] text-[#F4EAF7] p-5 md:p-8">

//       {/* Top Search */}
//       <div className="flex items-center justify-between gap-4 mb-10">
//         <div className="relative w-full max-w-[500px]">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C99BE0]"
//             size={21}
//           />
//           <input
//             type="text"
//             placeholder="Search your artwork..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="w-full rounded-full border border-[#51405F] bg-[#30243B] py-3 pl-12 pr-5 text-sm outline-none placeholder:text-[#B8A9C6] focus:border-[#C17AE0]"
//           />
//         </div>

//         <button className="rounded-full p-2 hover:bg-[#30243B]">
//           <span className="text-xl">🔔</span>
//         </button>
//       </div>

//       {/* Heading */}
//       <div className="flex flex-wrap items-center justify-between gap-5 mb-7">
//         <div>
//           <p className="text-xs tracking-[3px] text-[#C99BE0] uppercase mb-2">
//             Your creative collection
//           </p>

//           <h1 className="font-serif text-4xl md:text-5xl font-bold">
//             My Artwork
//           </h1>

//           <p className="mt-3 text-sm text-[#B8A9C6]">
//             Manage, edit and showcase your artistic creations.
//           </p>
//         </div>

//         <button
//           onClick={onUpload}
//           className="flex items-center gap-2 rounded-xl bg-[#C17AE0] px-5 py-3 font-semibold text-[#21182D] transition hover:bg-[#D9B3ED] hover:scale-105"
//         >
//           <Upload size={19} />
//           Upload Artwork
//         </button>
//       </div>

//       {/* Categories */}
//       <div className="flex flex-wrap gap-2 mb-7">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => {
//               setActiveCategory(category);
//               setCurrentPage(1);
//             }}
//             className={`rounded-xl px-5 py-3 text-sm transition ${
//               activeCategory === category
//                 ? "bg-[#A968C6] text-white shadow-lg shadow-purple-900/30"
//                 : "bg-[#30243B] text-[#CDB6D9] hover:bg-[#493453]"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Artwork Count */}
//       <div className="mb-5 flex items-center justify-between">
//         <p className="text-sm text-[#B8A9C6]">
//           Showing <span className="text-white">{filteredArtwork.length}</span> artworks
//         </p>
//       </div>

//       {/* Artwork Grid */}
//       {displayedArtwork.length > 0 ? (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
//           {displayedArtwork.map((art) => (
//             <div
//               key={art._id}
//               className="group overflow-hidden rounded-2xl border border-[#51405F] bg-[#30243B] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#B77BD3]"
//             >
//               {/* Image */}
//               <div className="relative h-[220px] overflow-hidden">
//                 <img
//                   src={art.image}
//                   alt={art.title}
//                   className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
//                 />

//                 <span className="absolute left-3 top-3 rounded-full bg-[#75458E]/90 px-3 py-1 text-xs font-medium text-white">
//                   {art.category || "Artwork"}
//                 </span>

//                 <button
//                   className="absolute right-3 top-3 rounded-full bg-[#21182D]/70 p-2 text-white hover:text-pink-400"
//                   aria-label="Favorite artwork"
//                 >
//                   <Heart size={19} />
//                 </button>
//               </div>

//               {/* Details */}
//               <div className="p-4">
//                 <div className="flex items-center justify-between gap-2">
//                   <h3 className="truncate font-semibold text-[#F4EAF7]">
//                     {art.title}
//                   </h3>

//                   <button
//                     onClick={() =>
//                       setMenuOpen(menuOpen === art._id ? null : art._id)
//                     }
//                     className="rounded-lg p-1 text-[#CDB6D9] hover:bg-[#493453]"
//                   >
//                     <MoreVertical size={20} />
//                   </button>
//                 </div>

//                 <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
//                   <p className="flex items-center gap-2 text-xs text-[#B8A9C6]">
//                     <CalendarDays size={15} />
//                     {art.createdAt
//                       ? new Date(art.createdAt).toLocaleDateString()
//                       : "Recently uploaded"}
//                   </p>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => onEdit?.(art)}
//                       className="flex items-center gap-1.5 rounded-lg border border-[#B77BD3] px-3 py-1.5 text-xs text-[#D9B3ED] transition hover:bg-[#59376B]"
//                     >
//                       <Pencil size={14} />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => onDelete?.(art)}
//                       className="flex items-center gap-1.5 rounded-lg border border-[#FF5C83] px-3 py-1.5 text-xs text-[#FF829F] transition hover:bg-[#63283E]"
//                     >
//                       <Trash2 size={14} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 {/* More menu */}
//                 {menuOpen === art._id && (
//                   <div className="mt-3 flex flex-col rounded-xl border border-[#51405F] bg-[#21182D] p-2">
//                     <button
//                       onClick={() => {
//                         setMenuOpen(null);
//                         onEdit?.(art);
//                       }}
//                       className="flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-[#493453]"
//                     >
//                       <Eye size={16} /> View / Edit Details
//                     </button>

//                     <button
//                       onClick={() => {
//                         setMenuOpen(null);
//                         onDelete?.(art);
//                       }}
//                       className="flex items-center gap-2 rounded-lg p-2 text-sm text-[#FF829F] hover:bg-[#493453]"
//                     >
//                       <Trash2 size={16} /> Delete Artwork
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-2xl border border-dashed border-[#51405F] bg-[#30243B]/50 py-20 text-center">
//           <Palette size={45} className="mx-auto mb-4 text-[#B77BD3]" />
//           <h3 className="text-xl font-semibold">No artwork found</h3>
//           <p className="mt-2 text-sm text-[#B8A9C6]">
//             Upload your first artwork or try another search.
//           </p>
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-10 flex justify-center gap-3">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//             className="rounded-lg bg-[#30243B] p-3 text-[#D9B3ED] disabled:opacity-40"
//           >
//             <ChevronLeft size={18} />
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`rounded-lg px-4 py-2 ${
//                 currentPage === page
//                   ? "bg-[#C17AE0] text-[#21182D]"
//                   : "bg-[#30243B] text-[#F4EAF7]"
//               }`}
//             >
//               {page}
//             </button>
//           ))}

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//             className="rounded-lg bg-[#30243B] p-3 text-[#D9B3ED] disabled:opacity-40"
//           >
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyArtwork;







import React, { useState } from "react";
import {
  UserRound,
  ShieldCheck,
  Bell,
  Palette,
  Sun,
  Moon,
  ArrowRight,
  AlertTriangle,
  Trash2,
  X,
  Lock,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";

const SettingsContent = ({ onNavigate, onDeleteAccount }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    followers: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingsCards = [
    {
      title: "Profile Settings",
      description: "Update your profile information, photo and bio.",
      button: "Edit Profile",
      icon: UserRound,
      action: () => onNavigate?.("My Profile"),
      decoration: (
        <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-[#3D2B50]">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-[#B98BDB] bg-gradient-to-br from-[#A66BD0] to-[#332344]">
            <UserRound size={42} className="text-[#F2DDFB]" />
          </div>
          <div className="absolute bottom-0 right-0 rounded-full bg-[#C99AE8] p-2 text-[#25182F]">
            <UserRound size={15} />
          </div>
        </div>
      ),
    },
    {
      title: "Security",
      description: "Manage your password and account security.",
      button: "Change Password",
      icon: ShieldCheck,
      action: () => onNavigate?.("Security"),
      decoration: (
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute h-20 w-20 rounded-full border border-[#9A66BD]/30" />
          <Lock size={65} strokeWidth={1.3} className="text-[#B987E2] drop-shadow-[0_0_12px_#9B59C5]" />
        </div>
      ),
    },
    {
      title: "Notifications",
      description: "Choose what notifications you want to receive.",
      button: "Manage Notifications",
      icon: Bell,
      action: () => onNavigate?.("Notifications"),
      decoration: (
        <div className="relative flex h-28 w-28 items-center justify-center">
          <Bell size={66} strokeWidth={1.4} className="text-[#C58CEB] drop-shadow-[0_0_15px_#A855F7]" />
          <span className="absolute right-1 top-2 text-2xl text-[#D8A4F3]">✦</span>
        </div>
      ),
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of Artify.",
      button: "Choose Theme",
      icon: Palette,
      action: () => setDarkMode((prev) => !prev),
      decoration: (
        <div className="flex items-center gap-3 rounded-2xl border border-[#514066] bg-[#211A30] p-3">
          <Sun size={24} className={!darkMode ? "text-[#E6B7FF]" : "text-[#81718E]"} />
          <Moon size={24} className={darkMode ? "text-[#D2A1F2]" : "text-[#81718E]"} />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#211C2D] px-4 py-5 text-[#F4EAF7] sm:px-6 lg:px-8">

      {/* Hero banner */}
      <div className="relative isolate mb-6 flex min-h-[175px] items-center overflow-hidden rounded-[22px] border border-[#51405F]/60 bg-gradient-to-r from-[#21182E] via-[#30203F] to-[#4B2B5B] px-6 py-7 sm:px-9">
        <div className="absolute -right-10 -top-20 -z-10 h-64 w-64 rounded-full bg-[#A65BD1]/20 blur-3xl" />
        <div className="absolute right-[25%] top-8 -z-10 h-36 w-36 rounded-full border border-[#C18AE5]/20" />
        <div className="absolute right-[15%] top-8 -z-10 text-5xl text-[#B77ADD]/30">✦</div>

        <div className="relative z-10 max-w-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-[#C89BE5]">
            Creative space
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Settings
          </h1>
          <div className="mt-2 h-1 w-14 rounded-full bg-[#B66BE0]" />
          <p className="mt-3 text-sm text-[#C9B5D8] sm:text-base">
            Manage your creative space and account preferences.
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-8 hidden h-full items-end md:flex">
          <div className="mb-7 mr-8 rotate-[-10deg] font-serif text-3xl italic text-[#D0A0EC]/80">
            Create<br />More...
          </div>
          <Palette size={115} strokeWidth={0.7} className="mb-[-12px] text-[#C18AE5]/30" />
        </div>
      </div>

      {/* Settings cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {settingsCards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group flex min-h-[170px] items-center justify-between gap-3 overflow-hidden rounded-[20px] border border-[#51405F]/50 bg-gradient-to-br from-[#342840] to-[#261F33] p-5 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-[#A76BC8]/60 hover:shadow-purple-950/30 sm:p-6"
            >
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#49335D] text-[#D4A4F0]">
                  <Icon size={34} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 pt-1">
                  <h2 className="text-lg font-semibold text-[#F5EDF9] sm:text-xl">
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-[230px] text-sm leading-5 text-[#B7A7C7]">
                    {item.description}
                  </p>

                  <button
                    onClick={item.action}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#A77BC3] px-4 py-2 text-xs font-medium text-[#E5C8F7] transition hover:bg-[#754A91] hover:text-white"
                  >
                    {item.button}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="hidden shrink-0 items-center justify-center sm:flex">
                {item.decoration}
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification preferences */}
      <div className="mt-5 rounded-[20px] border border-[#51405F]/50 bg-[#30263B] p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-[#F5EDF9]">
          Quick Notification Preferences
        </h2>
        <p className="mb-5 mt-1 text-sm text-[#B7A7C7]">
          Choose which activity updates you'd like to receive.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { key: "likes", label: "Artwork Likes", Icon: Heart },
            { key: "comments", label: "Comments", Icon: MessageCircle },
            { key: "followers", label: "New Followers", Icon: Users },
          ].map(({ key, label, Icon }) => (
            <div key={key} className="flex items-center justify-between gap-3 rounded-xl bg-[#251E30] p-4">
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-[#C18AE5]" />
                <span className="text-sm text-[#E8DCEF]">{label}</span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={notifications[key]}
                onClick={() => toggleNotification(key)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  notifications[key] ? "bg-[#A968D1]" : "bg-[#55475F]"
                }`}
              >
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                  notifications[key] ? "left-6" : "left-1"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="mt-5 flex flex-col justify-between gap-5 rounded-[20px] border border-[#78324E]/60 bg-gradient-to-r from-[#382333] to-[#291D2D] p-5 sm:flex-row sm:items-center sm:p-6">
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
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#963052] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B53D62]"
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>

      {/* Delete confirmation modal */}
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
  );
};

export default SettingsContent;



