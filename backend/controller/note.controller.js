import Note from "../models/Note.model.js";

export const getNoteBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Find note by slug
    const note = await Note.findOne({ slug })
      .populate("owner", "name email");

    // 2. If not found
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // 3. Send note data
    res.status(200).json({
      note,
    });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
