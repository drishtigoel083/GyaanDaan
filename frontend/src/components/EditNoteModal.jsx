import React, { useState } from "react";
import { X, Save } from "lucide-react";
import axios from "../utils/axiosInstance";

const EditNoteModal = ({ note, onClose, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    title: note.title || "",
    description: note.description || "",
    subject: note.subject || "",
    semester: note.semester || "",
    branch: note.branch || "",
    college: note.college || note.university || "",
    tags: Array.isArray(note.tags) ? note.tags.join(", ") : note.tags || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await axios.put(`/notes/${note._id}`, formData);
      onSaveSuccess(res.data.note);
      onClose();
    } catch (err) {
      console.error("Update note error:", err);
      setError(err.response?.data?.message || "Failed to update note");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="bg-white border-4 border-black w-full max-w-lg p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-6">
          <h2 className="text-2xl font-black uppercase">Edit Note Details</h2>
          <button
            onClick={onClose}
            className="p-1 border-2 border-black bg-[#FFB7D5] hover:bg-[#ff8fb8]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-[#FFB7D5] border-2 border-black font-bold text-sm uppercase mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          <div>
            <label className="block text-xs font-black uppercase mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border-3 border-black font-bold text-sm outline-none focus:bg-[#FFD363]"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border-3 border-black font-bold text-sm outline-none focus:bg-[#FFD363]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-3 border-black font-bold text-sm outline-none focus:bg-[#B2F39D]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase mb-1">Semester *</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-3 border-black font-bold text-sm outline-none focus:bg-[#B2F39D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Branch *</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-3 border-black font-bold text-sm outline-none focus:bg-[#8EC5FC]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase mb-1">College</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-3 py-2 border-3 border-black font-bold text-sm outline-none focus:bg-[#8EC5FC]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. DBMS, SQL, Normalization"
              className="w-full px-3 py-2 border-3 border-black font-bold text-sm outline-none focus:bg-[#FFD363]"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t-3 border-black">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 border-3 border-black font-black text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-[#B2F39D] border-3 border-black font-black text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
