import Note from '../models/Note.model.js';
import { nanoid } from 'nanoid';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

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

    // upload file to cloudinary
    if(file && file.path){
      try {
        const cloudinaryResponse = await uploadOnCloudinary(file.path);
        file.path = cloudinaryResponse.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "Failed to upload file to Cloudinary" });
      }
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

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

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
