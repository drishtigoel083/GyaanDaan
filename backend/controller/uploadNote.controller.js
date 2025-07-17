import Note from '../models/Note.model.js';
import { nanoid } from 'nanoid';

// POST /api/notes/upload
export const uploadNote = async (req, res) => {
  try {
    const { title, course, subject, semester, university } = req.body;
    const file = req.file;

    console.log("Uploaded file:", file);

    // Validate
    if (!title || !course || !subject || !semester || !file) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Create new note document
    const newNote = await Note.create({
      title,
      course,
      subject,
      semester,
      university,
      owner: req.user._id,
      fileUrl: file.path, // Cloudinary URL
      slug: nanoid(8),
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5000';

    res.status(201).json({
      message: "Note uploaded successfully",
      note: newNote,
      shareLink: `${frontendUrl}/notes/${newNote.slug}`
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Something went wrong while uploading the note." });
  }
};
