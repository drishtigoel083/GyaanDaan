import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { motion } from "framer-motion";
import { Download, Bookmark, User, School, Book, GraduationCap } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] font-mono">
        <div className="text-4xl font-black uppercase animate-bounce">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD] font-mono">
        <div className="border-4 border-black p-10 bg-[#FFB7D5] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-2xl font-black uppercase">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex justify-center items-center px-4 py-16 font-mono relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 2px, transparent 0)", backgroundSize: "40px 40px" }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-3xl bg-white border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden"
      >
        {/* Header Ribbon */}
        <div className="bg-[#B2F39D] border-b-4 border-black p-8">
           <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tighter">
            {note.title}
          </h1>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-[#FFD363] border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Book className="w-6 h-6 mb-2" />
              <p className="font-black text-xs uppercase opacity-50">Course</p>
              <p className="font-black text-sm uppercase">{note.course}</p>
            </div>
            <div className="bg-[#FFB7D5] border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <GraduationCap className="w-6 h-6 mb-2" />
              <p className="font-black text-xs uppercase opacity-50">Semester</p>
              <p className="font-black text-sm uppercase">{note.semester}</p>
            </div>
            <div className="bg-[#8EC5FC] border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <School className="w-6 h-6 mb-2" />
              <p className="font-black text-xs uppercase opacity-50">Subject</p>
              <p className="font-black text-sm uppercase">{note.subject}</p>
            </div>
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <User className="w-6 h-6 mb-2" />
              <p className="font-black text-xs uppercase opacity-50">Author</p>
              <p className="font-black text-sm uppercase">{note.owner?.name || "Student"}</p>
            </div>
          </div>

          <div className="p-8 border-4 border-black bg-gray-50 italic font-bold text-xl mb-10 relative">
            <div className="absolute -top-4 -left-4 bg-black text-white px-3 py-1 font-black uppercase text-xs">Note Details</div>
            {note.university && (
              <p className="mb-2 uppercase tracking-widest text-sm opacity-60 flex items-center gap-2">
                <School className="w-4 h-4" /> {note.university}
              </p>
            )}
            <p>Ready to study? Grab the file below and start acing your exams.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href={note.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-5 bg-[#FFD363] border-4 border-black font-black text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all flex items-center justify-center gap-4"
            >
              <Download strokeWidth={3} /> Download
            </a>

            <button
              className="flex-1 py-5 bg-white border-4 border-black font-black text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all flex items-center justify-center gap-4"
              onClick={() => alert("Save feature coming soon!")}
            >
              <Bookmark strokeWidth={3} /> Save
            </button>
          </div>
        </div>

        <div className="bg-black text-white p-4 text-center font-black uppercase text-xs tracking-[0.3em]">
          Powered by GyaanDaan — Knowledge is power
        </div>
      </motion.div>
    </div>
  );
};

export default NotesPreview;
