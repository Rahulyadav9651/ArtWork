import {
  ArrowLeft,
  ImageUp,
  Palette,
  Tag,
  Plus,
  X,
  Upload,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addArtDetails } from "../../services/opertions/ArtWork";
import { useDispatch, useSelector } from "react-redux";


const CATEGORIES = ["Sticker", "Illustrations", "Canvas Paintings", "Sketches"];
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const UploadArt = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    category: "",
  });
  const { title, description, tags, category } = formData;
const {token}= useSelector((state)=>state.auth)
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Free the preview URL when it changes or the page closes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Input handler (title, description, category)
  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add tag
  const addTag = () => {
    const newTag = tagInput.trim().replace(/^#/, "");
    if (!newTag) return;

    if (tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) {
      toast.error("Tag already exists.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));
    setTagInput("");
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Image selection
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit artwork
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an artwork image.");
      return;
    }

    if (!title.trim() || !description.trim() || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", title.trim());
    data.append("description", description.trim());
    data.append("category", category);
    data.append("tags", JSON.stringify(tags));
    data.append("image", image);

    try {
      setLoading(true);

      // Connect your upload API here, for example:
       await dispatch(addArtDetails(data, token));

navigate('/')
      //console.log("ARTWORK FORM DATA:", [...data.entries()]);

     // toast.success("Artwork details are ready to upload!");
    } catch (error) {
      console.error("UPLOAD ARTWORK ERROR:", error);
      toast.error("Could not upload artwork.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1B2B] p-4 text-[#F6F1FA] md:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex cursor-pointer items-center gap-2 text-sm text-[#B9B3D1] transition hover:text-[#FFD9C2]"
        >
          <ArrowLeft size={18} />
          Back to My Artwork
        </button>

        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-[#FFB38A]">
            Artify Creative Studio
          </p>

          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Upload Your Artwork
          </h1>

          <p className="mt-2 text-sm text-[#B9B3D1]">
            Bring your creativity to life and share it with the Artify
            community.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={submitHandler}
          className="space-y-6 rounded-2xl border border-[#4B4770] bg-[#2C2940] p-6 shadow-2xl md:p-8"
        >
          {/* Image upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative flex min-h-[220px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#6C67A3] bg-[#23213A] p-5 text-center transition hover:border-[#FFB38A]"
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Artwork preview"
                    className="h-[260px] w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 rounded-full bg-[#23213A] p-2 text-[#FF829F] hover:bg-[#63283E]"
                  >
                    <X size={19} />
                  </button>
                </>
              ) : (
                <>
                  <ImageUp size={40} className="text-[#FFD9C2]" />
                  <p className="mt-3 text-xl">Upload your masterpiece</p>
                  <p className="mt-1 text-xs text-[#958FB4]">
                    JPG, PNG or WEBP, up to 5MB
                  </p>
                </>
              )}
            </div>

            {image && (
              <p className="mt-3 truncate text-xs text-[#FFC9A8]">
                Selected: {image.name}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm text-[#FFD9C2]"
            >
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              maxLength={50}
              placeholder="Enter title"
              value={title}
              onChange={formChangeHandler}
              className="w-full rounded-xl border border-[#4B4770] bg-[#23213A] px-4 py-3 text-sm text-[#F6F1FA] outline-none transition placeholder:text-[#807AA0] focus:border-[#FFB38A]"
            />
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex justify-between">
              <label
                htmlFor="description"
                className="text-sm text-[#FFD9C2]"
              >
                Description *
              </label>
              <span className="text-xs text-[#958FB4]">
                {description.length}/1000
              </span>
            </div>

            <textarea
              id="description"
              name="description"
              value={description}
              onChange={formChangeHandler}
              placeholder="Describe your creative process, inspiration and story..."
              maxLength={1000}
              rows={5}
              className="w-full resize-none rounded-xl border border-[#4B4770] bg-[#23213A] px-4 py-3 text-sm text-[#F6F1FA] outline-none transition placeholder:text-[#807AA0] focus:border-[#FFB38A]"
            />
          </div>

          {/* Category */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Palette size={17} className="text-[#FFB38A]" />
              <label htmlFor="category" className="text-sm text-[#FFD9C2]">
                Artwork Category *
              </label>
            </div>

            <select
              id="category"
              name="category"
              value={category}
              onChange={formChangeHandler}
              className="w-full rounded-xl border border-[#4B4770] bg-[#23213A] px-4 py-3 text-sm text-[#F6F1FA] outline-none focus:border-[#FFB38A]"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Tag size={17} className="text-[#FFB38A]" />
              <label htmlFor="tags" className="text-sm text-[#FFD9C2]">
                Artwork Tags
              </label>
            </div>

            <div className="flex gap-2">
              <input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add a tag..."
                className="min-w-0 flex-1 rounded-xl border border-[#4B4770] bg-[#23213A] px-4 py-3 text-sm text-[#F6F1FA] outline-none placeholder:text-[#807AA0] focus:border-[#FFB38A]"
              />

              <button
                type="button"
                onClick={addTag}
                className="rounded-xl bg-[#3E3A63] px-4 text-[#FFD9C2] transition hover:bg-[#524D85]"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-2 rounded-lg border border-[#8C86C9] bg-[#3E3A63] px-3 py-1.5 text-xs text-[#E9E5FA]"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-[#FF829F] hover:text-white"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-[#4B4770] px-6 py-3 text-sm text-[#C6C0DD] transition hover:bg-[#2C2940]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#FFB38A] px-7 py-3 font-semibold text-[#23213A] transition hover:bg-[#FFD9C2] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={18} />
              {loading ? "Uploading..." : "Publish Artwork"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadArt;