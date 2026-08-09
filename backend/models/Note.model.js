import mongoose from "mongoose";
import { nanoid } from "nanoid";

const noteSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    course: {
      type: String,
      default: "",
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: String,
      default: "",
      trim: true,
    },
    university: {
      type: String,
      default: "",
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: { 
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    downloads: {
      type: Number,
      default: 0,
      min: 0,
    },
    savedBy: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      }
    ],
    slug: { 
      type: String, 
      unique: true, 
      default: () => nanoid(8) 
    },
},
{
   timestamps: true,
});

// Indexes for fast searching and filtering
noteSchema.index({ title: "text", description: "text", subject: "text", tags: "text" });
noteSchema.index({ subject: 1, semester: 1, branch: 1, college: 1 });
noteSchema.index({ createdAt: -1 });
noteSchema.index({ views: -1 });
noteSchema.index({ downloads: -1 });

const Note = mongoose.model("Note", noteSchema);
export default Note;