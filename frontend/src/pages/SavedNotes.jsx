import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { Bookmark, Compass } from "lucide-react";

const SavedNotesPage = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const [statsRes, bookmarksRes] = await Promise.all([
          axios.get("/users/me/stats"),
          axios.get("/users/me/bookmarks"),
        ]);
        setCurrentUserId(statsRes.data.user._id);
        setBookmarks(bookmarksRes.data.bookmarks || []);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-mono flex flex-col">
      <Navbar />

      <div className="flex-1 py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Banner */}
        <div className="bg-[#FFB7D5] border-3 border-black p-6 md:p-8 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-1">
            <Bookmark className="w-6 h-6" />
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
              Saved Notes
            </h1>
          </div>
          <p className="font-bold text-sm md:text-base text-black/80">
            Access all your saved study materials, exam references, and bookmarked notes.
          </p>
        </div>

        {/* Notes Grid */}
        {loading ? (
          <SkeletonLoader count={6} />
        ) : bookmarks.length === 0 ? (
          <div className="bg-white border-3 border-black p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black uppercase mb-2">No Saved Notes Yet</h2>
            <p className="font-bold text-xs text-gray-600 mb-4">
              When you find useful notes while exploring, click the heart icon to save them here!
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B2F39D] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#92e279]"
            >
              <Compass className="w-4 h-4" /> Explore Notes Library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                currentUserId={currentUserId}
                onBookmarkToggle={(id, isSaved) => {
                  if (!isSaved) {
                    setBookmarks((prev) => prev.filter((b) => b._id !== id));
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedNotesPage;
