import Note from "../models/Note.model.js";
import { nanoid } from "nanoid";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const toSafeString = (val, defaultVal = "") => {
  if (val === undefined || val === null) return defaultVal;
  if (typeof val === "string") return val.trim();
  return String(val).trim();
};

export const uploadNote = async (req, res) => {
  try {
    const { title, description, course, subject, semester, branch, college, university, tags } = req.body || {};
    const file = req.file;

    const titleStr = toSafeString(title);
    const descriptionStr = toSafeString(description);
    const subjectStr = toSafeString(subject);
    const semesterStr = toSafeString(semester);
    const branchStr = toSafeString(branch);
    const courseStr = toSafeString(course);
    const collegeStr = toSafeString(college);
    const universityStr = toSafeString(university);

    const courseValue = courseStr || branchStr || "General";
    const branchValue = branchStr || courseStr || "General";
    const collegeValue = collegeStr || universityStr || "";

    if (!titleStr || !subjectStr || !semesterStr || !file) {
      return res.status(400).json({ message: "Title, Subject, Semester, and File are required." });
    }

    // Process tags: array or string
    let parsedTags = [];
    if (Array.isArray(tags)) {
      parsedTags = tags.map(t => toSafeString(t).toLowerCase()).filter(Boolean);
    } else if (tags) {
      const tagsStr = toSafeString(tags);
      if (tagsStr) {
        parsedTags = tagsStr.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
      }
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(file.buffer);

    const slug = nanoid(8);

    const newNote = await Note.create({
      title: titleStr,
      description: descriptionStr,
      course: courseValue,
      subject: subjectStr,
      semester: semesterStr,
      branch: branchValue,
      college: collegeValue,
      university: universityStr || collegeValue,
      tags: parsedTags,
      owner: req.user._id,
      fileUrl: cloudinaryResponse.secure_url,
      cloudinaryPublicId: cloudinaryResponse.public_id || "",
      slug,
      views: 0,
      downloads: 0,
    });

    const frontendBase = process.env.FRONTEND_URL_DEV || process.env.FRONTEND_URL_PROD || "http://localhost:5173";
    const shareLink = `${frontendBase}/notes/${newNote.slug}`;

    res.status(201).json({
      message: "Note uploaded successfully",
      note: newNote,
      shareLink,
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message || "Upload failed" });
  }
};
