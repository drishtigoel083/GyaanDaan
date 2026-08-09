import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Upload as UploadIcon, CheckCircle, FileText, School, BookOpen, Layers, Tag, Info } from "lucide-react";
import Navbar from "../components/Navbar";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formDataState, setFormDataState] = useState({
    title: "",
    description: "",
    course: "",
    subject: "",
    semester: "",
    branch: "",
    college: "",
    tags: "",
  });
  const [message, setMessage] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be under 10MB.");
        setFile(null);
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file to upload.");

    setIsUploading(true);
    setError("");
    setMessage("");
    setShareLink("");

    const formData = new FormData();
    Object.entries(formDataState).forEach(([key, val]) =>
      formData.append(key, val)
    );
    if (!formDataState.course) {
      formData.append("course", formDataState.branch || "General");
    }
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData);
      setMessage("Success! Your note has been published.");
      setShareLink(response.data.shareLink);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed. Please check fields and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-mono relative overflow-hidden flex flex-col">
      <Navbar />

      <div className="py-8 px-4 flex-1">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #000 2px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-2xl mx-auto bg-white border-3 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative z-10 my-4"
        >
          {/* Header */}
          <div className="bg-[#FFB7D5] border-b-3 border-black p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <UploadIcon className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">
                  Upload Note
                </h2>
                <p className="font-bold text-black/70 mt-1 uppercase text-xs md:text-sm">
                  Share knowledge with students across colleges.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-[#FFB7D5] border-b-3 border-black p-3 font-black uppercase text-xs flex items-center gap-2">
              <Info className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase mb-1.5">
                  Document Title *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-black" />
                  <input
                    name="title"
                    value={formDataState.title}
                    placeholder="E.G. DBMS COMPLETE NOTES"
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-black font-bold outline-none focus:bg-[#B2F39D] transition-colors text-xs md:text-sm uppercase"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formDataState.description}
                  placeholder="Provide a brief summary of what this note covers..."
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-3 bg-white border-2 border-black font-bold outline-none focus:bg-[#FFD363] transition-colors text-xs md:text-sm"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-black uppercase mb-1.5">
                  Subject *
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 w-4 h-4 text-black" />
                  <input
                    name="subject"
                    value={formDataState.subject}
                    placeholder="E.G. DBMS"
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-black font-bold outline-none focus:bg-[#FFD363] transition-colors text-xs md:text-sm uppercase"
                  />
                </div>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-xs font-black uppercase mb-1.5">
                  Semester *
                </label>
                <div className="relative">
                  <Layers className="absolute left-3 top-3 w-4 h-4 text-black" />
                  <input
                    name="semester"
                    value={formDataState.semester}
                    placeholder="E.G. 5TH"
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-black font-bold outline-none focus:bg-[#8EC5FC] transition-colors text-xs md:text-sm uppercase"
                  />
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-xs font-black uppercase mb-1.5">
                  Branch *
                </label>
                <input
                  name="branch"
                  value={formDataState.branch}
                  placeholder="E.G. CSE, ECE..."
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-white border-2 border-black font-bold outline-none focus:bg-[#8EC5FC] transition-colors text-xs md:text-sm uppercase"
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-xs font-black uppercase mb-1.5">
                  College / University
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-3 w-4 h-4 text-black" />
                  <input
                    name="college"
                    value={formDataState.college}
                    placeholder="E.G. BPIT"
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-black font-bold outline-none focus:bg-[#B2F39D] transition-colors text-xs md:text-sm uppercase"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase mb-1.5">
                  Tags (Comma-separated)
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-3 w-4 h-4 text-black" />
                  <input
                    name="tags"
                    value={formDataState.tags}
                    placeholder="E.G. DBMS, SQL, NORMALIZATION"
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-black font-bold outline-none focus:bg-[#FFB7D5] transition-colors text-xs md:text-sm uppercase"
                  />
                </div>
              </div>

              {/* File Attachment */}
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase mb-1.5">
                  File Attachment (PDF, DOCX, Images) *
                </label>
                <div className="relative border-2 border-dashed border-black p-6 hover:bg-gray-50 transition-colors cursor-pointer text-center bg-gray-50/50">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadIcon className="w-8 h-8 text-black mx-auto mb-2" strokeWidth={2.5} />
                  <p className="font-black text-sm uppercase italic">
                    {file ? (
                      <span className="bg-[#B2F39D] px-2 py-0.5 border border-black">
                        {file.name}
                      </span>
                    ) : (
                      "Click or drop PDF / file here"
                    )}
                  </p>
                  <p className="font-bold text-black/60 mt-1 uppercase text-[10px]">
                    MAXIMUM FILE SIZE: 10MB
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled={isUploading}
              type="submit"
              className={`w-full py-3.5 border-3 border-black font-black text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 ${
                isUploading
                  ? "bg-gray-200 cursor-not-allowed shadow-none translate-x-[2px] translate-y-[2px]"
                  : "bg-[#FFD363]"
              }`}
            >
              {isUploading ? "UPLOADING TO CLOUDINARY..." : "PUBLISH NOTE"}
            </button>
          </form>

          {/* Success Message & Shareable Link */}
          <AnimatePresence>
            {(message || shareLink) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#B2F39D] border-t-3 border-black p-6"
              >
                {message && (
                  <div className="flex items-center gap-3 text-black font-black text-lg uppercase mb-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" strokeWidth={2.5} />
                    {message}
                  </div>
                )}
                {shareLink && (
                  <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-black text-[10px] uppercase tracking-widest text-black/60 mb-2">
                      Unique Share Link
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <code className="text-black break-all text-xs font-black uppercase bg-gray-100 p-2 border border-black w-full sm:w-auto flex-1">
                        {shareLink}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareLink);
                          alert("Share link copied to clipboard!");
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-[#FFB7D5] border-2 border-black font-black text-sm uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;