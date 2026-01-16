import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, FileText, Globe, GraduationCap, BookOpen, Layers } from "lucide-react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formDataState, setFormDataState] = useState({
    title: "",
    course: "",
    subject: "",
    semester: "",
    university: "",
  });
  const [message, setMessage] = useState("");
  const [shareLink, setShareLink] = useState("");

  const handleChange = (e) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first.");

    setIsUploading(true);
    const formData = new FormData();
    Object.entries(formDataState).forEach(([key, val]) =>
      formData.append(key, val)
    );
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData);
      setMessage("Success! Your notes are now live.");
      setShareLink(response.data.shareLink);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-600 mb-1.5 ml-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-teal-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden"
      >
        <div className="bg-indigo-600 p-8 text-center text-white">
          <motion.div 
            initial={{ y: -20 }} 
            animate={{ y: 0 }}
            className="inline-block p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-md"
          >
            <Upload className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-extrabold tracking-tight">Upload Your Notes</h2>
          <p className="text-indigo-100 mt-2 font-medium">Contribute to the student community</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Title - Full Width */}
            <div className="md:col-span-2">
              <label className={labelClasses}>Document Title</label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  name="title"
                  placeholder="e.g. Quantum Mechanics Lecture 1"
                  onChange={handleChange}
                  required
                  className={`${inputClasses} pl-12`}
                />
              </div>
            </div>

            {/* Course & Subject */}
            <div>
              <label className={labelClasses}>Course</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input name="course" placeholder="B.Tech, MBA..." onChange={handleChange} className={`${inputClasses} pl-12`} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Subject</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input name="subject" placeholder="Physics, Law..." onChange={handleChange} className={`${inputClasses} pl-12`} />
              </div>
            </div>

            {/* Semester & University */}
            <div>
              <label className={labelClasses}>Semester</label>
              <div className="relative">
                <Layers className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input name="semester" placeholder="1st, 2nd..." onChange={handleChange} className={`${inputClasses} pl-12`} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>University</label>
              <div className="relative">
                <Globe className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input name="university" placeholder="Optional" onChange={handleChange} className={`${inputClasses} pl-12`} />
              </div>
            </div>

            {/* File Upload Custom Zone */}
            <div className="md:col-span-2">
              <label className={labelClasses}>Attachment</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-indigo-400 transition-colors group bg-gray-50/50">
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto group-hover:text-indigo-500 transition-colors" />
                  <p className="mt-2 text-sm text-gray-600">
                    {file ? <span className="text-indigo-600 font-semibold">{file.name}</span> : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={isUploading}
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
              isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
            }`}
          >
            {isUploading ? "Uploading..." : "Publish Notes"}
          </motion.button>
        </form>

        <AnimatePresence>
          {(message || shareLink) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-slate-50 border-t border-gray-100 p-8"
            >
              {message && (
                <div className="flex items-center gap-2 text-indigo-800 font-medium mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {message}
                </div>
              )}
              {shareLink && (
                <div className="p-4 bg-white border border-indigo-100 rounded-2xl shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shareable Link</p>
                  <div className="flex items-center justify-between gap-4">
                    <code className="text-indigo-600 break-all text-sm font-mono">{shareLink}</code>
                    <button 
                      onClick={() => navigator.clipboard.writeText(shareLink)}
                      className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UploadPage;