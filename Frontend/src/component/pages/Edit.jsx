import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"; // or "react-toastify", whichever you use
import { ArrowLeft, ImageUp, Palette, Tag, Plus, X, Save } from "lucide-react";
import { fetchArtById, updateArt } from "../../services/opertions/ArtWork";

const CATEGORIES = ["Sticker", "Illustrations", "Canvas Paintings", "Sketches"];
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { token } = useSelector((state) => state.auth); // adjust to your store

  const [myData, setMyData] = useState(null); // original artwork from the API
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    category: "",
  });
  const { title, description, tags, category } = formData;

  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null); // new file (only if the user picks one)
  const [preview, setPreview] = useState(null); // preview of the new file
  const [loading, setLoading] = useState(false);

  // 1) Fetch the existing artwork
  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageLoading(true);
        const res = await dispatch(fetchArtById(id));
        const art = res?.data ?? res; // handles { data: {...} } or {...}
        setMyData(art);
      } catch (error) {
        console.error("FETCH ARTWORK ERROR:", error);
        toast.error("Could not load artwork.");
      } finally {
        setPageLoading(false);
      }
    };
    fetchData();
  }, [id, dispatch]);

  // 2) Fill the form once the data arrives
  useEffect(() => {
    if (!myData) return;

    let parsedTags = myData.tags ?? [];
    if (typeof parsedTags === "string") {
      try {
        parsedTags = JSON.parse(parsedTags);
      } catch {
        parsedTags = parsedTags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    setFormData({
      title: myData.title ?? "",
      description: myData.description ?? "",
      category: myData.category ?? "",
      tags: Array.isArray(parsedTags) ? parsedTags : [],
    });
  }, [myData]);

  // Free the preview URL when it changes or the page closes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Existing image URL from your API (change the field name if needed)
  const existingImage = myData?.image || myData?.imageUrl || myData?.thumbnail;
  const shownImage = preview || existingImage;

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    const newTag = tagInput.trim().replace(/^#/, "");
    if (!newTag) return;

    if (tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) {
      toast.error("Tag already exists.");
      return;
    }

    setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

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

  // Undo a newly picked image and fall back to the existing one
  const removeNewImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", title.trim());
    data.append("description", description.trim());
    data.append("category", category);
    data.append("tags", JSON.stringify(tags));
    if (image) data.append("image", image); // only send if changed

    try {
      setLoading(true);
      await dispatch(updateArt(id, data ,token)); // create this in your service
      toast.success("Artwork updated!");
      navigate('/');
    } catch (error) {
      console.error("UPDATE ARTWORK ERROR:", error);
      toast.error("Could not update artwork.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1D1B2B] text-[#B9B3D1]">
        Loading artwork...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1D1B2B] p-4 text-[#F6F1FA] md:p-8">
      <div className="mx-auto max-w-3xl">
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
            Edit Your Artwork
          </h1>
          <p className="mt-2 text-sm text-[#B9B3D1]">
            Update the details below. Your changes appear on your gallery as
            soon as you save.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="space-y-6 rounded-2xl border border-[#4B4770] bg-[#2C2940] p-6 shadow-2xl md:p-8"
        >
          {/* Image */}
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
              {shownImage ? (
                <>
                  <img
                    src={shownImage}
                    alt={title || "Artwork preview"}
                    className="h-[260px] w-full object-contain"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-[#23213A]/90 px-3 py-1 text-xs text-[#FFD9C2]">
                    Click to replace image
                  </span>
                  {preview && (
                    <button
                      type="button"
                      onClick={removeNewImage}
                      title="Undo new image"
                      className="absolute right-3 top-3 rounded-full bg-[#23213A] p-2 text-[#FF829F] hover:bg-[#63283E]"
                    >
                      <X size={19} />
                    </button>
                  )}
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
                New image: {image.name}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="mb-2 block text-sm text-[#FFD9C2]">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              maxLength={50}
              placeholder="Give your artwork a title"
              value={title}
              onChange={formChangeHandler}
              className="w-full rounded-xl border border-[#4B4770] bg-[#23213A] px-4 py-3 text-sm text-[#F6F1FA] outline-none transition placeholder:text-[#807AA0] focus:border-[#FFB38A]"
            />
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="description" className="text-sm text-[#FFD9C2]">
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
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;