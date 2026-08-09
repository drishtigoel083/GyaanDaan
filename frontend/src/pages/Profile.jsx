import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import EditNoteModal from "../components/EditNoteModal";
import SkeletonLoader from "../components/SkeletonLoader";
import { Mail, Plus } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState(null);
  const [myNotes, setMyNotes] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("myNotes"); // "myNotes" | "savedNotes"
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfileData();
  }, [navigate]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const [statsRes, notesRes, savedRes] = await Promise.all([
        axios.get("/users/me/stats"),
        axios.get("/users/me/notes"),
        axios.get("/users/me/bookmarks"),
      ]);

      setUserStats(statsRes.data);
      setMyNotes(notesRes.data.notes || []);
      setSavedNotes(savedRes.data.bookmarks || []);
    } catch (err) {
      console.error("Profile load error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note? This action will remove the document and its file permanently.")) {
      return;
    }

    try {
      await axios.delete(`/notes/${noteId}`);
      setMyNotes((prev) => prev.filter((n) => n._id !== noteId));
      setSavedNotes((prev) => prev.filter((n) => n._id !== noteId));
      alert("Note deleted successfully.");
    } catch (err) {
      console.error("Delete note error:", err);
      alert(err.response?.data?.message || "Failed to delete note.");
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleSaveSuccess = (updatedNote) => {
    setMyNotes((prev) =>
      prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-mono flex flex-col">
      <Navbar />

      <div className="flex-1 py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* User Info Header Box */}
        <div className="bg-white border-3 border-black p-6 md:p-8 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#FFD363] border-3 border-black rounded-full flex items-center justify-center text-xl font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                {userStats?.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                  {userStats?.user?.name || "User Profile"}
                </h1>
                <p className="font-bold text-xs text-gray-600 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" /> {userStats?.user?.email}
                </p>
              </div>
            </div>

            <Link
              to="/upload"
              className="px-4 py-2 bg-[#B2F39D] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Upload Note
            </Link>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t-3 border-black">
            <div className="bg-[#FFD363] border-2 border-black p-2.5 text-center">
              <p className="font-black text-[10px] uppercase opacity-70">Uploaded</p>
              <p className="text-xl font-black">{myNotes.length}</p>
            </div>
            <div className="bg-[#FFB7D5] border-2 border-black p-2.5 text-center">
              <p className="font-black text-[10px] uppercase opacity-70">Total Views</p>
              <p className="text-xl font-black">{userStats?.stats?.totalViews || 0}</p>
            </div>
            <div className="bg-[#8EC5FC] border-2 border-black p-2.5 text-center">
              <p className="font-black text-[10px] uppercase opacity-70">Downloads</p>
              <p className="text-xl font-black">{userStats?.stats?.totalDownloads || 0}</p>
            </div>
            <div className="bg-gray-100 border-2 border-black p-2.5 text-center">
              <p className="font-black text-[10px] uppercase opacity-70">Saved Notes</p>
              <p className="text-xl font-black">{savedNotes.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b-3 border-black mb-6 gap-3">
          <button
            onClick={() => setActiveTab("myNotes")}
            className={`px-5 py-3 font-black text-sm md:text-base uppercase border-t-3 border-x-3 border-black transition-all ${
              activeTab === "myNotes"
                ? "bg-[#FFD363] translate-y-[3px]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            My Notes ({myNotes.length})
          </button>
          <button
            onClick={() => setActiveTab("savedNotes")}
            className={`px-5 py-3 font-black text-sm md:text-base uppercase border-t-3 border-x-3 border-black transition-all ${
              activeTab === "savedNotes"
                ? "bg-[#FFB7D5] translate-y-[3px]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Saved Bookmarks ({savedNotes.length})
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <SkeletonLoader count={6} />
        ) : activeTab === "myNotes" ? (
          myNotes.length === 0 ? (
            <div className="bg-white border-3 border-black p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black uppercase mb-1">No Uploaded Notes Yet</h3>
              <p className="font-bold text-xs text-gray-600 mb-4">
                Share your lecture notes, assignments, or semester guides with fellow students.
              </p>
              <Link
                to="/upload"
                className="px-4 py-2 bg-[#FFD363] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                Upload First Note
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  currentUserId={userStats?.user?._id}
                  showActions={true}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )
        ) : savedNotes.length === 0 ? (
          <div className="bg-white border-3 border-black p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black uppercase mb-1">No Saved Bookmarks</h3>
            <p className="font-bold text-xs text-gray-600 mb-4">
              Bookmark notes while browsing the Explore library for quick access later.
            </p>
            <Link
              to="/explore"
              className="px-4 py-2 bg-[#B2F39D] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Browse Notes Library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                currentUserId={userStats?.user?._id}
                onBookmarkToggle={(id, isSaved) => {
                  if (!isSaved) {
                    setSavedNotes((prev) => prev.filter((n) => n._id !== id));
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Note Modal */}
      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
};

export default ProfilePage;
