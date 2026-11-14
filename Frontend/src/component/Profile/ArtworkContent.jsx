import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { myArt,DeleteMyArt } from '../../services/opertions/ArtWork'
import { useDispatch, useSelector } from 'react-redux'
import baground from "../../assets/bag.png"
import { Upload, Palette, ChevronLeft, ChevronRight, Search, Trash2, Pencil } from "lucide-react"
import DeleteModel from '../common/DeleteModel'
import { setArtwork } from '../../Slices/slice/arworkSlice'
import { Link } from 'react-router-dom'
const categories = ["All Artwork", "Sticker", "Illustrations", "Canvas Paintings", "Sketches"]
const itemsPerPage = 3

const ArtworkContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const [myArtData, setMyartData] = useState([])
  const [activeCategory, setActiveCategory] = useState("All Artwork")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Fetch artwork
  useEffect(() => {
    const fetchArt = async () => {
      if (!user?._id) return
      try {
        const data = await dispatch(myArt(user._id, token))
        setMyartData(data || [])
        setArtwork(data|| [])
      } catch (error) {
        console.error("Error fetching artwork:", error)
      }
    }
    fetchArt()
  }, [user?._id, token, dispatch])

  // Go back to page 1 whenever the filter or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search, activeCategory])

  // Filter + paginate
  const filteredArtwork = myArtData.filter((art) => {
    const matchesSearch = (art.title || "")
      .toLowerCase()
      .includes(search.trim().toLowerCase())

    const matchesCategory =
      activeCategory === "All Artwork" ||
      art.category?.toLowerCase() === activeCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredArtwork.length / itemsPerPage)

  const displayedArtwork = filteredArtwork.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // If the last item on a page is deleted, move back a page
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1))
    }
  }, [totalPages, currentPage])

  // Open the modal for one artwork
  const handleDeleteClick = (art) => {
    setSelectedArtwork(art)
    setDeleteModal(true)
  }

  // Close the modal (blocked while a delete is running)
  const closeDeleteModal = () => {
    if (deleting) return
    setDeleteModal(false)
    setSelectedArtwork(null)
  }

  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (!selectedArtwork?._id) return

    setDeleting(true)
    try {
      await dispatch(DeleteMyArt(selectedArtwork._id, token))

      setMyartData((prev) =>
        prev.filter((art) => art._id !== selectedArtwork._id)
      )
      setDeleteModal(false)
      setSelectedArtwork(null)
    } catch (error) {
      console.error("Delete artwork failed:", error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1B1525] text-[#F4EAF7]">
      {/* Header banner */}
      <div className="relative isolate mx-auto flex h-[190px] w-full max-w-7xl items-center overflow-hidden rounded-2xl border border-[#51405F]/60 bg-[#21182D] px-6 py-8 md:px-10">
        <img
          src={baground}
          alt="Artistic paint palette"
          className="absolute right-0 top-0 -z-20 h-full w-full object-cover object-right opacity-90 md:w-[58%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#21182D] via-[#21182D]/95 via-45% to-transparent" />

        <div className="relative z-10 w-full max-w-[570px]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[#D9B3ED] md:text-sm">
            Your Creative Collection
          </p>
          <h1 className="font-serif text-2xl font-bold leading-tight text-[#F4EAF7] md:text-3xl lg:text-4xl">
            My Artwork
          </h1>
          <p className="mt-3 max-w-[430px] text-sm leading-6 text-[#CDB6D9] md:text-base">
            Manage, edit and showcase your artistic creations.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/upload-artwork")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C17AE0] px-5 py-3 font-semibold text-[#21182D] shadow-lg shadow-purple-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#D9B3ED] hover:shadow-purple-500/20"
          >
            <Upload size={19} />
            Upload Artwork
          </button>
        </div>
      </div>

      {/* Search + category filters */}
      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-[#C17AE0] text-[#21182D]"
                  : "bg-[#30243B] text-[#F4EAF7] hover:bg-[#3b2d49]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8A9C6]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search artwork..."
            className="w-full rounded-xl border border-[#51405F] bg-[#30243B] py-2.5 pl-9 pr-3 text-sm text-[#F4EAF7] placeholder:text-[#B8A9C6] outline-none focus:border-[#B77BD3]"
          />
        </div>
      </div>

      {/* Artwork grid */}
      {displayedArtwork.length > 0 ? (
        <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {displayedArtwork.map((art) => (
            <div
              key={art._id}
              className="group relative overflow-hidden rounded-2xl border border-[#51405F] bg-[#30243B] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#B77BD3]"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="h-[300px] w-full cursor-pointer object-cover transition duration-300 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#75458E]/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {art.category || "Artwork"}
              </span>

              <div className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-2 bg-gradient-to-t from-[#21182D] via-[#21182D]/90 to-transparent px-3 pb-3 pt-8">
                {/* Artwork title */}
                <p className="min-w-0 truncate text-sm font-semibold text-[#F4EAF7]">
                  {art.title}
                </p>

                {/* Action buttons */}
                <div className="flex shrink-0 items-center gap-2">
                  <Link
  to={`/dashboard/edit/${art._id}`}
  className="flex items-center gap-1.5 rounded-lg border border-[#B77BD3] px-2.5 py-1.5 text-xs text-[#D9B3ED] transition hover:bg-[#59376B] cursor-pointer"
>
  <Pencil size={14} />
  Edit
</Link>

                  <button
                    type="button"
                    onClick={() => handleDeleteClick(art)}
                    className="flex items-center gap-1.5 rounded-lg border border-[#FF5C83] px-2.5 py-1.5 text-xs text-[#FF829F] transition hover:bg-[#63283E] cursor-pointer"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-7xl rounded-2xl border border-dashed border-[#51405F] bg-[#30243B]/50 py-20 text-center">
          <Palette size={45} className="mx-auto mb-4 text-[#B77BD3]" />
          <h3 className="text-xl font-semibold">No artwork found</h3>
          <p className="mt-2 text-sm text-[#B8A9C6]">
            {myArtData.length === 0
              ? "Upload your first artwork to get started."
              : "Try a different category or search term."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="rounded-lg bg-[#30243B] p-3 text-[#D9B3ED] disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              type="button"
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-4 py-2 ${
                currentPage === page
                  ? "bg-[#C17AE0] text-[#21182D]"
                  : "bg-[#30243B] text-[#F4EAF7]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="rounded-lg bg-[#30243B] p-3 text-[#D9B3ED] disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Delete confirmation modal */}
      <DeleteModel
        isOpen={deleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        artworkTitle={selectedArtwork?.title}
        loading={deleting}
      />
    </div>
  )
}

export default ArtworkContent