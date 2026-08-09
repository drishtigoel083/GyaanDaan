import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  Download,
  Heart,
  User,
  School,
  Book,
  Eye,
  Share2,
  Calendar,
  Layers,
  Tag,
  ArrowLeft,
  FileText,
  ExternalLink,
  Maximize2
} from "lucide-react";

const NotesPreview = () => {
  const { slug } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [viewTab, setViewTab] = useState("embedded"); // "embedded" | "direct"
  const fetchedRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/users/me/stats")
        .then((res) => setCurrentUserId(res.data.user._id))
        .catch(() => setCurrentUserId(null));
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchNote = async () => {
      try {
        const res = await axios.get(`/notes/${slug}`);
        const fetchedNote = res.data.note;
        setNote(fetchedNote);
        setDownloadCount(fetchedNote.downloads || 0);

        if (currentUserId && fetchedNote.savedBy) {
          const isSaved = fetchedNote.savedBy.some(
            (u) => (typeof u === "string" ? u : u._id) === currentUserId
          );
          setIsBookmarked(isSaved);
        }
      } catch (err) {
        console.error(err);
        setError("Note not found or link expired.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [slug, currentUserId]);

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save notes.");
      return;
    }

    try {
      const res = await axios.post(`/notes/${note._id}/bookmark`);
      setIsBookmarked(res.data.isBookmarked);
      setNote((prev) => ({
        ...prev,
        savedBy: res.data.isBookmarked
          ? [...(prev.savedBy || []), currentUserId]
          : (prev.savedBy || []).filter((u) => (typeof u === "string" ? u : u._id) !== currentUserId),
      }));
    } catch (err) {
      console.error("Bookmark error:", err);
      alert("Failed to save note.");
    }
  };

  // Fire download tracking asynchronously in background without blocking link navigation
  const handleDownloadClick = () => {
    if (!note) return;
    axios.post(`/notes/${note._id}/download`)
      .then((res) => {
        if (res.data?.downloads !== undefined) {
          setDownloadCount(res.data.downloads);
        }
      })
      .catch((err) => console.error("Track download error:", err));
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert("Unique link copied to clipboard!");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-mono flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl font-black uppercase p-6 border-3 border-black bg-[#FFD363] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Loading Note Details...
          </div>
        </div>
      </div>
    );

  if (error || !note)
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-mono flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="border-3 border-black p-8 bg-[#FFB7D5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md text-center">
            <h2 className="text-2xl font-black uppercase mb-2">Oops!</h2>
            <p className="text-sm font-bold uppercase mb-4">{error || "Note not found."}</p>
            <Link
              to="/explore"
              className="inline-block px-4 py-2 bg-white border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
            >
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );

  // Encode file URL for embedded Google Docs Viewer fallback
  const encodedFileUrl = encodeURIComponent(note.fileUrl);
  const googleDocsViewerUrl = `https://docs.google.com/gview?url=${encodedFileUrl}&embedded=true`;

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-mono flex flex-col">
      <Navbar />

      <div className="flex-1 py-8 px-4 md:px-8 max-w-5xl mx-auto w-full">
        
        {/* Back Link */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 font-black uppercase text-xs mb-4 px-3 py-1.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white border-3 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden mb-8"
        >
          {/* Header Ribbon */}
          <div className="bg-[#B2F39D] border-b-3 border-black p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className="px-2.5 py-0.5 bg-[#FFD363] border border-black font-black text-[11px] uppercase">
                  {note.subject}
                </span>
                <span className="px-2.5 py-0.5 bg-[#FFB7D5] border border-black font-black text-[11px] uppercase">
                  Sem {note.semester}
                </span>
                <span className="px-2.5 py-0.5 bg-white border border-black font-black text-[11px] uppercase">
                  {note.branch}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black uppercase leading-tight tracking-tight">
                {note.title}
              </h1>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleBookmark}
                className={`p-2.5 border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-1.5 ${
                  isBookmarked ? "bg-[#FFB7D5]" : "bg-white hover:bg-gray-100"
                }`}
              >
                <Heart className={`w-4 h-4 ${isBookmarked ? "fill-black" : ""}`} />
                <span>{isBookmarked ? "Saved" : "Save"}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 bg-[#FFD363] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-1.5"
                title="Share Unique Link"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Metadata Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-[#FFD363] border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Book className="w-4 h-4 mb-1 text-black" />
                <p className="font-black text-[10px] uppercase opacity-60">Subject</p>
                <p className="font-black text-xs uppercase truncate">{note.subject}</p>
              </div>

              <div className="bg-[#FFB7D5] border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Layers className="w-4 h-4 mb-1 text-black" />
                <p className="font-black text-[10px] uppercase opacity-60">Semester & Branch</p>
                <p className="font-black text-xs uppercase truncate">{note.semester} / {note.branch}</p>
              </div>

              <div className="bg-[#8EC5FC] border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <School className="w-4 h-4 mb-1 text-black" />
                <p className="font-black text-[10px] uppercase opacity-60">College</p>
                <p className="font-black text-xs uppercase truncate">{note.college || note.university || "N/A"}</p>
              </div>

              <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <User className="w-4 h-4 mb-1 text-black" />
                <p className="font-black text-[10px] uppercase opacity-60">Uploaded By</p>
                <p className="font-black text-xs uppercase truncate">{note.owner?.name || "Student"}</p>
              </div>
            </div>

            {/* Description Box */}
            {note.description && (
              <div className="p-4 border-3 border-black bg-gray-50 font-bold text-sm mb-6 relative">
                <div className="absolute -top-3 left-3 bg-black text-white px-2 py-0.5 font-black uppercase text-[10px]">
                  Description
                </div>
                <p className="mt-1 text-gray-800 leading-relaxed">{note.description}</p>
              </div>
            )}

            {/* Tags section */}
            {note.tags && note.tags.length > 0 && (
              <div className="mb-6">
                <p className="font-black text-[11px] uppercase text-gray-500 mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Tags
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 border border-black font-black text-[11px] uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* View / Download Counter Banner */}
            <div className="flex flex-wrap items-center justify-between p-3.5 bg-gray-100 border-2 border-black mb-6 font-black text-xs uppercase gap-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-black" /> {note.views || 0} Total Views
                </span>
                <span className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-black" /> {downloadCount} Downloads
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                <Calendar className="w-3.5 h-3.5" /> Uploaded on {formatDate(note.createdAt)}
              </div>
            </div>

            {/* Primary Action Buttons (Direct native download & open links) */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noreferrer"
                download
                onClick={handleDownloadClick}
                className="flex-1 py-3.5 bg-[#FFD363] border-3 border-black font-black text-base uppercase shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" strokeWidth={2.5} /> Download PDF File
              </a>

              <a
                href={note.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-3.5 bg-white border-3 border-black font-black text-base uppercase shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" strokeWidth={2.5} /> Open File in New Tab
              </a>
            </div>

            {/* Embedded Document Viewer Section */}
            <div className="border-3 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="bg-black text-white p-3 flex justify-between items-center font-black uppercase text-xs">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FFD363]" /> Document Reader Preview
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewTab(viewTab === "embedded" ? "direct" : "embedded")}
                    className="px-2 py-0.5 bg-[#FFD363] text-black text-[10px] border border-white font-black"
                  >
                    Switch Mode ({viewTab === "embedded" ? "Google Viewer" : "Direct Stream"})
                  </button>
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-white hover:text-[#FFD363]"
                    title="Fullscreen preview"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Iframe Viewer */}
              <div className="w-full h-[550px] bg-gray-100 relative">
                {viewTab === "embedded" ? (
                  <iframe
                    src={googleDocsViewerUrl}
                    title={note.title}
                    className="w-full h-full border-none"
                    loading="lazy"
                  />
                ) : (
                  <iframe
                    src={note.fileUrl}
                    title={note.title}
                    className="w-full h-full border-none"
                  />
                )}
              </div>
            </div>

          </div>

          <div className="bg-black text-white p-3 text-center font-black uppercase text-[10px] tracking-[0.2em]">
            Powered by GyaanDaan — Knowledge Shared is Knowledge Doubled
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotesPreview;
