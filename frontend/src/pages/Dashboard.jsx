import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { Upload, Compass, Eye, Download, Bookmark, BookOpen, Plus } from "lucide-react";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [statsRes, notesRes, bookmarksRes] = await Promise.all([
          axios.get("/users/me/stats"),
          axios.get("/users/me/notes"),
          axios.get("/users/me/bookmarks"),
        ]);

        setStatsData(statsRes.data);
        setUserNotes(notesRes.data.notes || []);
        setUserBookmarks(bookmarksRes.data.bookmarks || []);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-mono flex flex-col">
      <Navbar />

      <div className="flex-1 py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Welcome Header */}
        <div className="bg-[#B2F39D] border-3 border-black p-6 md:p-8 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-1">
              Welcome back, {statsData?.user?.name || "Student"} 👋
            </h1>
            <p className="font-bold text-sm md:text-base text-black/80">
              Here is your notes publishing and repository summary.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/upload"
              className="px-4 py-2 bg-[#FFD363] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Upload Note
            </Link>
            <Link
              to="/explore"
              className="px-4 py-2 bg-white border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" /> Explore
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse h-24"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#FFD363] border-3 border-black p-4 md:p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-[11px] uppercase opacity-70">Uploaded Notes</span>
                <BookOpen className="w-5 h-5 text-black" />
              </div>
              <p className="text-2xl md:text-3xl font-black">{statsData?.stats?.totalNotesUploaded || 0}</p>
            </div>

            <div className="bg-[#FFB7D5] border-3 border-black p-4 md:p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-[11px] uppercase opacity-70">Total Views</span>
                <Eye className="w-5 h-5 text-black" />
              </div>
              <p className="text-2xl md:text-3xl font-black">{statsData?.stats?.totalViews || 0}</p>
            </div>

            <div className="bg-[#8EC5FC] border-3 border-black p-4 md:p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-[11px] uppercase opacity-70">Total Downloads</span>
                <Download className="w-5 h-5 text-black" />
              </div>
              <p className="text-2xl md:text-3xl font-black">{statsData?.stats?.totalDownloads || 0}</p>
            </div>

            <div className="bg-white border-3 border-black p-4 md:p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-[11px] uppercase opacity-70">Saved Bookmarks</span>
                <Bookmark className="w-5 h-5 text-black" />
              </div>
              <p className="text-2xl md:text-3xl font-black">{statsData?.stats?.totalSavedNotes || 0}</p>
            </div>
          </div>
        )}

        {/* Section 1: Recent Uploads */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-black uppercase flex items-center gap-2">
              <Upload className="w-5 h-5" /> Recent Uploads
            </h2>
            <Link
              to="/profile"
              className="font-black text-xs uppercase underline decoration-2 underline-offset-4 hover:bg-[#FFD363] px-2 py-1"
            >
              Manage My Notes ({userNotes.length}) →
            </Link>
          </div>

          {loading ? (
            <SkeletonLoader count={3} />
          ) : userNotes.length === 0 ? (
            <div className="bg-white border-3 border-black p-6 text-center shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-sm uppercase mb-3">You haven't uploaded any notes yet.</p>
              <Link
                to="/upload"
                className="inline-block px-4 py-2 bg-[#FFD363] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                Upload First Note
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userNotes.slice(0, 3).map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  currentUserId={statsData?.user?._id}
                />
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Recent Saved Notes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-black uppercase flex items-center gap-2">
              <Bookmark className="w-5 h-5" /> Saved Notes
            </h2>
            <Link
              to="/saved-notes"
              className="font-black text-xs uppercase underline decoration-2 underline-offset-4 hover:bg-[#FFB7D5] px-2 py-1"
            >
              View All Saved ({userBookmarks.length}) →
            </Link>
          </div>

          {loading ? (
            <SkeletonLoader count={3} />
          ) : userBookmarks.length === 0 ? (
            <div className="bg-white border-3 border-black p-6 text-center shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-bold text-sm uppercase mb-3">No saved notes in your bookmarks.</p>
              <Link
                to="/explore"
                className="inline-block px-4 py-2 bg-[#B2F39D] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                Browse & Save Notes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userBookmarks.slice(0, 3).map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  currentUserId={statsData?.user?._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
