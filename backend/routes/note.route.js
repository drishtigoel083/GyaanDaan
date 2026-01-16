import express from "express";
import { getNoteBySlug } from "../controller/note.controller.js";

const router = express.Router();

router.get("/:slug", getNoteBySlug);

export default router;
