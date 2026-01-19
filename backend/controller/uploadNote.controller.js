import Note from "../models/Note.model.js";
import { nanoid } from "nanoid";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const uploadNote = async (req, res) => {
  try {
    const { title, course, subject, semester, university } = req.body;
    const file = req.file;

    if (!title || !course || !subject || !semester || !file) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(file.buffer);

    const newNote = await Note.create({
      title,
      course,
      subject,
      semester,
      university,
      owner: req.user._id,
      fileUrl: cloudinaryResponse.secure_url,
      slug: nanoid(8),
    });

    res.status(201).json({
      message: "Note uploaded successfully",
      note: newNote,
      shareLink: `${process.env.FRONTEND_URL_PROD}/notes/${newNote.slug}`,
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};
