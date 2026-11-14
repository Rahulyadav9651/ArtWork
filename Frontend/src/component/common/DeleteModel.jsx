
import { Trash2, X, AlertTriangle, Loader2 } from "lucide-react";

import React from 'react'

const DeleteModel = ({
  isOpen,
  onClose,
  onConfirm,
  artworkTitle,
  loading = false,}) => {
    
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#51405F] bg-[#30243B] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#51405F] px-6 py-4">
          <h2 className="text-lg font-semibold text-[#F4EAF7]">
            Delete Artwork
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-[#B8A9C6] transition hover:bg-[#493B59] hover:text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle size={32} className="text-red-400" />
          </div>

          <h3 className="text-xl font-semibold text-[#F4EAF7]">
            Are you sure?
          </h3>

          <p className="mt-3 text-sm leading-6 text-[#B8A9C6]">
            You are about to delete{" "}
            <span className="font-semibold text-[#F4EAF7]">
              "{artworkTitle}"
            </span>
            . This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-[#51405F] px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-[#655471] px-4 py-3 text-sm font-semibold text-[#F4EAF7] transition hover:bg-[#493B59] disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={17} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

    
  
}

export default DeleteModel
