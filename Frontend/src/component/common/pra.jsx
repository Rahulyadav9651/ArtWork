import React, { useEffect, useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { updateProfile } from "../../services/opertions/profileAPI";

const PersonalDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    about: "",
  });

  // Populate form with existing user details
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        gender: user.additionalDetails?.gender || "",
        dateOfBirth: user.additionalDetails?.dateOfBirth || "",
        contactNumber: user.additionalDetails?.contactNumber || "",
        about: user.additionalDetails?.about || "",
      });
    }
  }, [user]);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("First name and last name are required");
      return;
    }

    setLoading(true);

    try {
      await dispatch(updateProfile(formData));
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      gender: user?.additionalDetails?.gender || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      about: user?.additionalDetails?.about || "",
    });

    setIsEditing(false);
  };

  const fields = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Email Address", name: "email", disabled: true },
    { label: "Phone Number", name: "contactNumber" },
    { label: "Date of Birth", name: "dateOfBirth", type: "date" },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other", "Prefer not to say"],
    },
  ];

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#51445F] bg-[#211C2D] px-4 py-3 text-sm text-[#F4EAF7] outline-none focus:border-[#B89ACB]";

  return (
    <div className="mt-6 rounded-2xl border border-[#51445F] bg-[#30283E] p-5 sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-[#F4EAF7]">
          Personal Details
        </h2>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-[#B89ACB] transition hover:bg-white/10"
          >
            <Pencil size={15} />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#D9A3B4] hover:bg-white/10"
            >
              <X size={15} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-[#B89ACB] px-4 py-2 text-sm font-semibold text-[#211C2D] hover:bg-[#CDB4DD] disabled:opacity-50"
            >
              <Save size={15} />
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="text-sm text-[#B8A9C6]">
              {field.label}
            </label>

            {isEditing && !field.disabled ? (
              field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={changeHandler}
                  className={inputClass}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={changeHandler}
                  className={inputClass}
                />
              )
            ) : (
              <p className="mt-2 text-sm font-medium text-[#F4EAF7]">
                {formData[field.name] || "Not provided"}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* About */}
      <div className="mt-5">
        <label className="text-sm text-[#B8A9C6]">About</label>

        {isEditing ? (
          <textarea
            name="about"
            value={formData.about}
            onChange={changeHandler}
            rows={3}
            placeholder="Tell us something about yourself..."
            className={inputClass}
          />
        ) : (
          <p className="mt-2 text-sm text-[#F4EAF7]">
            {formData.about || "No information added yet."}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalDetails;