import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";

const NotesPreview = () => {
  const { slug } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/notes/${slug}`);
        setNote(res.data.note);
      } catch (err) {
        setError("Note not found or link expired.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">
          {note.title}
        </h1>

        <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-3">
          <span>📘 {note.course}</span>
          <span>📚 {note.subject}</span>
          <span>🎓 Semester {note.semester}</span>
          {note.university && <span>🏫 {note.university}</span>}
        </div>

        <div className="mt-6 p-5 border rounded-xl bg-gray-50">
          <p className="text-gray-700 font-medium">
            Uploaded by: {note.owner?.name || "Teacher"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Access this note anytime using this link.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href={note.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Download Notes
          </a>

          <button
            className="flex-1 py-3 border rounded-xl font-semibold hover:bg-gray-100 transition"
            onClick={() => alert("Save feature coming next")}
          >
            Save to My Notes
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Powered by GyaanDaan — Never lose notes again.
        </p>
      </motion.div>
    </div>
  );
};

export default NotesPreview;
