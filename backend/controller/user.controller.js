import Note from "../models/Note.model.js";

// GET /api/v1/users/me/stats
export const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all notes uploaded by current user
    const userNotes = await Note.find({ owner: userId });

    const totalNotesUploaded = userNotes.length;

    const totalViews = userNotes.reduce((acc, note) => acc + (note.views || 0), 0);
    const totalDownloads = userNotes.reduce((acc, note) => acc + (note.downloads || 0), 0);

    // Count how many notes the user has bookmarked
    const totalSavedNotes = await Note.countDocuments({ savedBy: userId });

    res.status(200).json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      stats: {
        totalNotesUploaded,
        totalViews,
        totalDownloads,
        totalSavedNotes,
      }
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Failed to fetch user stats" });
  }
};

// GET /api/v1/users/me/notes (Fetch notes uploaded by logged-in user)
export const getUserNotes = async (req, res) => {
  try {
    const userId = req.user._id;

    const notes = await Note.find({ owner: userId })
      .sort({ createdAt: -1 })
      .populate("owner", "name email");

    res.status(200).json({ notes });
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).json({ message: "Failed to fetch user notes" });
  }
};

// GET /api/v1/users/me/bookmarks (Fetch notes bookmarked by logged-in user)
export const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookmarks = await Note.find({ savedBy: userId })
      .sort({ createdAt: -1 })
      .populate("owner", "name email");

    res.status(200).json({ bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ message: "Failed to fetch bookmarks" });
  }
};
