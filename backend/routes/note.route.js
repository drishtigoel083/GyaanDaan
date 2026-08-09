import express from "express";
import {
  getAllNotes,
  getNoteBySlug,
  getNoteById,
  trackDownload,
  toggleBookmarkNote,
  updateNote,
  deleteNote
} from "../controller/note.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Explore / Search / Filter / Sort
router.get("/", getAllNotes);

// Single note details
router.get("/slug/:slug", getNoteBySlug);
router.get("/id/:id", getNoteById);

// Download tracking
router.post("/:id/download", trackDownload);

// Bookmarking (Auth required)
router.post("/:id/bookmark", auth, toggleBookmarkNote);

// Edit & Delete note (Auth required, Owner verified in controller)
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

// Legacy slug fallback route
router.get("/:slug", getNoteBySlug);

export default router;
