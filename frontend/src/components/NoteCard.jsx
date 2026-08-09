import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Download, Heart, School, User } from "lucide-react";
import axios from "../utils/axiosInstance";

const NoteCard = ({ note, currentUserId, onBookmarkToggle, onEdit, onDelete, showActions = false }) => {
  const initialBookmarked = note.savedBy?.some(
    (userId) => (typeof userId === "string" ? userId : userId?._id || userId) === currentUserId
  );

  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(note.savedBy?.length || 0);
  const [downloadCount, setDownloadCount] = useState(note.downloads || 0);
  const [isSaving, setIsSaving] = useState(false);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save notes.");
      return;
    }

    try {
      setIsSaving(true);
      const res = await axios.post(`/notes/${note._id}/bookmark`);
      setIsBookmarked(res.data.isBookmarked);
      setBookmarkCount(res.data.savedCount);
      if (onBookmarkToggle) onBookmarkToggle(note._id, res.data.isBookmarked);
    } catch (err) {
      console.error("Bookmark error:", err);
      alert("Failed to update bookmark.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadClick = () => {
    axios.post(`/notes/${note._id}/download`)
      .then((res) => {
        if (res.data?.downloads !== undefined) {
          setDownloadCount(res.data.downloads);
        }
      })
      .catch((err) => console.error("Download tracking error:", err));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="bg-white border-3 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between font-mono relative overflow-hidden group">
      
      {/* Top Banner & Bookmark */}
      <div>
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 bg-[#FFD363] border border-black font-black text-[11px] uppercase">
              {note.subject || "Subject"}
            </span>
            <span className="px-2 py-0.5 bg-[#FFB7D5] border border-black font-black text-[11px] uppercase">
              Sem {note.semester || "1"}
            </span>
            <span className="px-2 py-0.5 bg-[#B2F39D] border border-black font-black text-[11px] uppercase">
              {note.branch || "CSE"}
            </span>
          </div>

          <button
            onClick={handleBookmark}
            disabled={isSaving}
            title={isBookmarked ? "Remove Bookmark" : "Save Note"}
            className={`p-1.5 border border-black transition-transform active:scale-90 ${
              isBookmarked
                ? "bg-[#FFB7D5] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white text-gray-400 hover:text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? "fill-black text-black" : ""}`} />
          </button>
        </div>

        {/* Title & Description */}
        <Link to={`/notes/${note.slug}`} className="block group-hover:text-blue-700 transition-colors">
          <h3 className="text-lg font-black uppercase tracking-tight line-clamp-2 leading-snug mb-2">
            {note.title}
          </h3>
        </Link>

        {note.description && (
          <p className="text-gray-700 text-xs font-bold line-clamp-2 mb-3 leading-relaxed">
            {note.description}
          </p>
        )}

        {/* Tags list */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] font-bold text-gray-800 bg-gray-100 border border-black px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* College / Uploader Info */}
        <div className="text-[11px] font-bold text-gray-600 space-y-1 mb-3 border-t border-gray-200 pt-2">
          {note.college && (
            <div className="flex items-center gap-1.5 truncate">
              <School className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{note.college}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{note.owner?.name || "Student"}</span>
            </div>
            <span className="text-[10px] text-gray-500">{formatDate(note.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Footer Stats & Actions */}
      <div className="border-t-2 border-black pt-3 mt-1">
        <div className="flex justify-between items-center mb-3 text-[11px] font-black">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gray-700" title="Views">
              <Eye className="w-3.5 h-3.5 text-black" /> {note.views || 0}
            </span>
            <span className="flex items-center gap-1 text-gray-700" title="Downloads">
              <Download className="w-3.5 h-3.5 text-black" /> {downloadCount}
            </span>
          </div>
          <span className="text-gray-500 font-bold text-[10px]">
            {bookmarkCount} {bookmarkCount === 1 ? "save" : "saves"}
          </span>
        </div>

        {/* Action Buttons */}
        {showActions ? (
          <div className="grid grid-cols-3 gap-2">
            <Link
              to={`/notes/${note.slug}`}
              className="text-center py-1.5 bg-white border border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
            >
              View
            </Link>
            <button
              onClick={() => onEdit && onEdit(note)}
              className="py-1.5 bg-[#FFD363] border border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffe082]"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(note._id)}
              className="py-1.5 bg-[#FFB7D5] border border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ff8fb8]"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/notes/${note.slug}`}
              className="text-center py-2 bg-white border border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" /> Details
            </Link>
            <a
              href={note.fileUrl}
              target="_blank"
              rel="noreferrer"
              download
              onClick={handleDownloadClick}
              className="py-2 bg-[#B2F39D] border border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#92e279] active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
