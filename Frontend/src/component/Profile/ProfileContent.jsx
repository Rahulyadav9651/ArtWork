import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, X, Save } from "lucide-react";
import toast from "react-hot-toast";
//import { updateProfile } from "../../services/opertions/profileAPI";

const inputClass =
  "mt-1 w-full rounded-lg border border-[#51445F] bg-[#211C2D] px-3 py-2 text-sm text-[#F4EAF7] outline-none transition focus:border-[#B89ACB] focus:ring-2 focus:ring-[#B89ACB]/20";

const fields = [
  { label: "First Name", name: "firstName" },
  { label: "Email", name: "email", disabled: true },
  { label: "Last Name", name: "lastName" },
  { label: "Profession", name: "profession", disabled: true, fixedValue: "Artist" },
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

  // Keep the form in sync when the user in redux changes (e.g. after saving)
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Early return comes AFTER all hooks
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

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("First name and last name are required");
      return;
    }

    setLoading(true);
    // const success = await dispatch(
    //   updateProfile(
    //     user._id,
    //     {
    //       firstName: formData.firstName.trim(),
    //       lastName: formData.lastName.trim(),
    //     },
    //     token
    //   )
    // );
    setLoading(false);

    if (success) setIsEditing(false);
  };

  return (
    <div className="w-full text-[#F4EAF7]">
      {/* Page heading */}
      <p className="text-sm font-medium uppercase tracking-widest">
        Your Creative Space
      </p>
      <div className="mt-1.5 rounded-xl bg-[#292334] p-4">
        <h1 className="text-3xl font-bold sm:text-4xl">My Profile</h1>
        <p className="mt-1 text-[#F4EAF7]/80">Manage your artist identity.</p>
      </div>

      {/* Profile summary */}
      <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#211C2D] p-4 sm:gap-5 sm:p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B89ACB] text-xl font-semibold uppercase sm:h-14 sm:w-14 sm:text-2xl">
          {user.firstName?.[0]}
          {user.lastName?.[0]}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-2xl font-medium sm:text-3xl">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-xs font-medium">Artist &amp; Creator</p>
          <p className="mt-1 text-base sm:text-lg">
            Creating art, sharing inspiration.
          </p>
        </div>
      </div>

      {/* Personal details */}
      <div className="mt-6 rounded-2xl border border-[#51445F] bg-[#30283E] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold">Personal Details</h2>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-base transition hover:bg-white/10"
            >
              <Pencil size={15} /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#D9A3B4] transition hover:bg-white/10 disabled:opacity-50"
              >
                <X size={15} />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#B89ACB] px-4 py-2 text-sm font-semibold text-[#211C2D] transition hover:bg-[#CDB4DD] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={15} />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          {fields.map((field) => {
            const value = field.fixedValue ?? formData[field.name];

            return (
              <div key={field.name} className="min-w-0">
                <label
                  htmlFor={field.name}
                  className="text-sm text-[#F4EAF7]/60"
                >
                  {field.label}
                </label>

                {isEditing && !field.disabled ? (
                  <input
                    id={field.name}
                    type="text"
                    name={field.name}
                    value={value}
                    onChange={changeHandler}
                    className={inputClass}
                  />
                ) : (
                  <p className="mt-2 break-words text-sm font-medium">
                    {value || "Not provided"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;