import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, FileText, Globe, GraduationCap, BookOpen, Layers, X } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-20 px-4 font-mono relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 2px, transparent 0)", backgroundSize: "40px 40px" }}></div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl mx-auto bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative z-10"
      >
        {/* Header */}
        <div className="bg-[#FFB7D5] border-b-4 border-black p-10">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Upload className="w-10 h-10 text-black" strokeWidth={3} />
            </div>
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Upload Notes</h2>
              <p className="font-bold text-black/70 mt-2 uppercase tracking-widest">Share knowledge, gain karma.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <div className="md:col-span-2">
              <label className="block text-xl font-black uppercase mb-3">Document Title</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-6 h-6 text-black" />
                <input
                  name="title"
                  placeholder="E.G. QUANTUM MECHANICS L1"
                  onChange={handleChange}
                  required
                  className="w-full pl-14 pr-4 py-4 bg-white border-4 border-black font-bold outline-none focus:bg-[#B2F39D] transition-colors uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xl font-black uppercase mb-3 text-sm">Course</label>
              <input name="course" placeholder="B.TECH, MBA..." onChange={handleChange} className="w-full px-4 py-4 bg-white border-4 border-black font-bold outline-none focus:bg-[#FFD363] transition-colors uppercase" />
            </div>

            <div>
              <label className="block text-xl font-black uppercase mb-3 text-sm">Subject</label>
              <input name="subject" placeholder="PHYSICS, LAW..." onChange={handleChange} className="w-full px-4 py-4 bg-white border-4 border-black font-bold outline-none focus:bg-[#FFD363] transition-colors uppercase" />
            </div>

            <div>
              <label className="block text-xl font-black uppercase mb-3 text-sm">Semester</label>
              <input name="semester" placeholder="1ST, 2ND..." onChange={handleChange} className="w-full px-4 py-4 bg-white border-4 border-black font-bold outline-none focus:bg-[#8EC5FC] transition-colors uppercase" />
            </div>

            <div>
              <label className="block text-xl font-black uppercase mb-3 text-sm">University</label>
              <input name="university" placeholder="OPTIONAL" onChange={handleChange} className="w-full px-4 py-4 bg-white border-4 border-black font-bold outline-none focus:bg-[#8EC5FC] transition-colors uppercase" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xl font-black uppercase mb-3">Attachment</label>
              <div className="relative border-4 border-dashed border-black p-10 hover:bg-gray-50 transition-colors group cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <Upload className="w-12 h-12 text-black mx-auto mb-4" strokeWidth={3} />
                  <p className="font-black text-xl uppercase italic">
                    {file ? <span className="bg-[#B2F39D] px-2">{file.name}</span> : "Drop files or click here"}
                  </p>
                  <p className="font-bold text-black/50 mt-2 uppercase text-xs">PDF, DOCX UP TO 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={isUploading}
            type="submit"
            className={`w-full py-6 border-4 border-black font-black text-3xl uppercase shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all active:scale-95 ${
              isUploading ? "bg-gray-200 cursor-not-allowed shadow-none translate-x-[4px] translate-y-[4px]" : "bg-[#FFD363]"
            }`}
          >
            {isUploading ? "UPLOADING..." : "PUBLISH NOTES"}
          </button>
        </form>



        <AnimatePresence>
          {(message || shareLink) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#B2F39D] border-t-4 border-black p-10"
            >
              {message && (
                <div className="flex items-center gap-4 text-black font-black text-2xl uppercase mb-6">
                  <CheckCircle className="w-8 h-8" strokeWidth={3} />
                  {message}
                </div>
              )}
              {shareLink && (
                <div className="p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-3">Shareable Link</p>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <code className="text-black break-all text-lg font-black uppercase bg-gray-100 px-3 py-1">{shareLink}</code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(shareLink);
                        alert("Copied!");
                      }}
                      className="whitespace-now6-px-8 py-3 bg-[#FFB7D5] border-4 border-black font-black text-xl uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
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