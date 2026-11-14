
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, X, Save, UserRound, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
// import { updateProfile } from "../../services/opertions/profileAPI";
import { updateProfile } from "../../services/opertions/authAPI";

const inputClass =
  "mt-2 w-full rounded-xl border border-[#704052]/60 bg-[#2D1925] px-4 py-3 text-sm text-[#F0DCC2] outline-none transition-all placeholder:text-[#BFA7A7]/60 focus:border-[#C49A79] focus:ring-2 focus:ring-[#C49A79]/20 disabled:cursor-not-allowed disabled:opacity-60";

const fields = [
  { label: "First Name", name: "firstName" },
  { label: "Email Address", name: "email", disabled: true },
  { label: "Last Name", name: "lastName" },
  {
    label: "Profession",
    name: "profession",
    disabled: true,
    fixedValue: "Artist",
  },
];

const ProfileContent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!user) return null;

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
    });

    setIsEditing(false);
  };

//   const handleSave = async () => {
//     if (!formData.firstName.trim() || !formData.lastName.trim()) {
//       toast.error("First name and last name are required");
//       return;
//     }

//     // Connect your updateProfile Redux action here.
    
//     setLoading(true);
//     try {
//       const success = await dispatch(
//         updateProfile(
//           user._id,
//           {
//             firstName: formData.firstName.trim(),
//             lastName: formData.lastName.trim(),
//           },
//           token
//         )
//       );
    
//       if (success) {
//         setIsEditing(false);
//       }
//     } catch (error) {
//       toast.error("Could not update profile");
//     } finally {
//       setLoading(false);
//     }

//    // toast.error("Connect your profile update API to save changes.");
//   };

const handleSave = async () => {
  if (!formData.firstName.trim() || !formData.lastName.trim()) {
    toast.error("First name and last name are required");
    return;
  }

  setLoading(true);

  try {
    const success = await dispatch(
      updateProfile(
        {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
        },
        token
      )
    );

    if (success) {
      setIsEditing(false);
    }
  } finally {
    setLoading(false);
  }
};


  const initials = `${user.firstName?.[0] || ""}${
    user.lastName?.[0] || ""
  }`;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 text-[#F0DCC2] bg-[#24131D] ">

      {/* Creative Space Heading */}
      <div className="relative overflow-hidden rounded-2xl border border-[#704052]/50 bg-gradient-to-r from-[#492432] via-[#583044] to-[#704052] p-6 sm:p-8">

        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[25px] border-[#C49A79]/10" />

        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2 text-[#E5C3A6]">
            <Sparkles size={17} />
            <p className="text-xs font-semibold uppercase tracking-[3px]">
              Your Creative Space
            </p>
          </div>

          <h1 className="font-serif text-3xl font-bold sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#F0DCC2]/75 sm:text-base">
            Manage your artist identity and showcase your creative journey.
          </p>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="flex flex-col gap-5 rounded-2xl border border-[#704052]/50 bg-[#30202A] p-5 shadow-xl shadow-black/10 sm:flex-row sm:items-center sm:p-7">

        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-[#704052] bg-gradient-to-br from-[#C49A79] to-[#704052] text-2xl font-bold uppercase text-[#24131D] shadow-lg">
          {initials || <UserRound size={30} />}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-2xl font-bold text-[#F0DCC2] sm:text-3xl">
            {user.firstName} {user.lastName}
          </h2>

          <p className="mt-1 text-sm font-semibold text-[#C49A79]">
            Artist &amp; Creator
          </p>

          <p className="mt-2 text-sm text-[#D8C4C2] sm:text-base">
            Creating art, sharing inspiration.
          </p>
        </div>

        <div className="hidden rounded-full border border-[#C49A79]/30 bg-[#492432]/60 px-4 py-2 text-xs font-medium text-[#E5C3A6] sm:block">
          Artify Creator
        </div>
      </div>

      {/* Personal Details */}
      <div className="rounded-2xl border border-[#704052]/50 bg-[#30202A] p-5 shadow-xl shadow-black/10 sm:p-7">

        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#704052]/40 pb-5">

          <div>
            <h2 className="font-serif text-xl font-bold sm:text-2xl">
              Personal Details
            </h2>
            <p className="mt-1 text-xs text-[#BFA7A7] sm:text-sm">
              Your personal information and account details
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#C49A79]/40 bg-[#492432] px-4 py-2.5 text-sm font-semibold text-[#E5C3A6] transition hover:border-[#C49A79] hover:bg-[#704052]"
            >
              <Pencil size={15} />
              Edit Profile
            </button>
          ) : (
            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl border border-[#704052] px-4 py-2.5 text-sm font-semibold text-[#D8C4C2] transition hover:bg-[#492432] disabled:opacity-50"
              >
                <X size={15} />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C49A79] px-4 py-2.5 text-sm font-bold text-[#24131D] transition hover:bg-[#F0DCC2] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={15} />
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>
          )}
        </div>

        {/* Profile Fields */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-8">

          {fields.map((field) => {
            const value = field.fixedValue ?? formData[field.name];

            return (
              <div key={field.name} className="min-w-0">

                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-[#BFA7A7]"
                >
                  {field.label}
                  {!field.disabled && (
                    <span className="ml-1 text-[#C49A79]">*</span>
                  )}
                </label>

                {isEditing && !field.disabled ? (
                  <input
                    id={field.name}
                    type="text"
                    name={field.name}
                    value={value}
                    onChange={changeHandler}
                    className={inputClass}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <div className="mt-2 min-h-11 break-words rounded-xl border border-[#704052]/30 bg-[#2D1925]/70 px-4 py-3 text-sm font-medium text-[#F0DCC2]">
                    {value || "Not provided"}
                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* Footer */}
        <div className="mt-7 flex items-center gap-2 border-t border-[#704052]/40 pt-5 text-xs text-[#BFA7A7]">
          <Sparkles size={14} className="text-[#C49A79]" />
          Keep your artist identity updated on Artify.
        </div>

      </div>
    </div>
  );
};

export default ProfileContent;
