import React, { useState, useEffect, useCallback } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { Search, Filter, SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const ExplorePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);

  // Dynamic filter options from DB
  const [filterOptions, setFilterOptions] = useState({
    subjects: [],
    semesters: [],
    branches: [],
    colleges: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/users/me/stats")
        .then((res) => setCurrentUserId(res.data.user._id))
        .catch(() => setCurrentUserId(null));
    }
  }, []);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      if (subjectFilter) params.append("subject", subjectFilter);
      if (semesterFilter) params.append("semester", semesterFilter);
      if (branchFilter) params.append("branch", branchFilter);
      if (collegeFilter) params.append("college", collegeFilter);
      if (tagFilter) params.append("tag", tagFilter);
      if (sortBy) params.append("sortBy", sortBy);
      params.append("page", page);
      params.append("limit", 9);

      const res = await axios.get(`/notes?${params.toString()}`);
      setNotes(res.data.notes || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setTotalNotes(res.data.pagination?.totalNotes || 0);

      if (res.data.filterOptions) {
        setFilterOptions(res.data.filterOptions);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, subjectFilter, semesterFilter, branchFilter, collegeFilter, tagFilter, sortBy, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotes();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchNotes]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSubjectFilter("");
    setSemesterFilter("");
    setBranchFilter("");
    setCollegeFilter("");
    setTagFilter("");
    setSortBy("newest");
    setPage(1);
  };

  const hasActiveFilters =
    searchTerm || subjectFilter || semesterFilter || branchFilter || collegeFilter || tagFilter || sortBy !== "newest";

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-mono flex flex-col">
      <Navbar />

      <div className="flex-1 py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Banner */}
        <div className="bg-[#FFD363] border-3 border-black p-6 md:p-8 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-1">
            Explore Notes Library
          </h1>
          <p className="font-bold text-sm md:text-base text-black/80 max-w-2xl">
            Browse, search, and filter verified notes uploaded by engineering and university students.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white border-3 border-black p-5 mb-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-black" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Search notes by Title, Subject, Topic, or #Tag..."
                className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-black font-bold outline-none focus:bg-[#B2F39D] transition-colors text-xs md:text-sm"
              />
            </div>

            {/* Sorting Selection */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 flex-shrink-0" />
              <span className="font-black text-xs uppercase whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="w-full md:w-auto px-3 py-2 bg-[#FFB7D5] border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="most_viewed">Most Viewed</option>
                <option value="most_downloaded">Most Downloaded</option>
              </select>
            </div>
          </div>

          {/* Filters Grid */}
          <div className="border-t-2 border-black pt-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1.5 font-black text-xs uppercase">
                <Filter className="w-3.5 h-3.5" /> Filter Options
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 px-2.5 py-1 bg-[#FFB7D5] border border-black font-black text-[11px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ff8fb8]"
                >
                  <RotateCcw className="w-3 h-3" /> Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Subject Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase mb-1">Subject</label>
                <select
                  value={subjectFilter}
                  onChange={(e) => {
                    setSubjectFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full p-2 bg-gray-50 border border-black font-bold text-xs outline-none focus:bg-[#FFD363]"
                >
                  <option value="">All Subjects</option>
                  {filterOptions.subjects.map((sub, i) => (
                    <option key={i} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Semester Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase mb-1">Semester</label>
                <select
                  value={semesterFilter}
                  onChange={(e) => {
                    setSemesterFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full p-2 bg-gray-50 border border-black font-bold text-xs outline-none focus:bg-[#FFD363]"
                >
                  <option value="">All Semesters</option>
                  {filterOptions.semesters.map((sem, i) => (
                    <option key={i} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              {/* Branch Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase mb-1">Branch</label>
                <select
                  value={branchFilter}
                  onChange={(e) => {
                    setBranchFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full p-2 bg-gray-50 border border-black font-bold text-xs outline-none focus:bg-[#FFD363]"
                >
                  <option value="">All Branches</option>
                  {filterOptions.branches.map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* College Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase mb-1">College</label>
                <select
                  value={collegeFilter}
                  onChange={(e) => {
                    setCollegeFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full p-2 bg-gray-50 border border-black font-bold text-xs outline-none focus:bg-[#FFD363]"
                >
                  <option value="">All Colleges</option>
                  {filterOptions.colleges.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black uppercase flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Available Notes ({totalNotes})
          </h2>
          <span className="text-xs font-bold text-gray-500">
            Page {page} of {totalPages}
          </span>
        </div>

        {/* Grid Content */}
        {loading ? (
          <SkeletonLoader count={6} />
        ) : notes.length === 0 ? (
          <div className="bg-white border-3 border-black p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] my-8">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-2xl font-black uppercase mb-1">No Notes Found</h3>
            <p className="font-bold text-xs text-gray-600 mb-4">
              No study materials match your search parameters. Try resetting your filters!
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#B2F39D] border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#92e279]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 py-6 border-t-3 border-black mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`flex items-center gap-1 px-4 py-2 border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                page === 1
                  ? "bg-gray-200 opacity-50 cursor-not-allowed shadow-none"
                  : "bg-[#FFD363] hover:bg-[#ffe082]"
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <span className="font-black text-sm px-3 py-1.5 bg-white border-2 border-black">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`flex items-center gap-1 px-4 py-2 border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                page === totalPages
                  ? "bg-gray-200 opacity-50 cursor-not-allowed shadow-none"
                  : "bg-[#FFD363] hover:bg-[#ffe082]"
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
