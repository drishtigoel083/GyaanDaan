import express from "express";
import { getUserStats, getUserNotes, getUserBookmarks } from "../controller/user.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/me/stats", auth, getUserStats);
router.get("/me/notes", auth, getUserNotes);
router.get("/me/bookmarks", auth, getUserBookmarks);

export default router;
