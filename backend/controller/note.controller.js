import Note from "../models/Note.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

// GET /api/v1/notes (Explore notes with search, filters, sorting, and pagination)
export const getAllNotes = async (req, res) => {
  try {
    const {
      search,
      subject,
      semester,
      branch,
      college,
      tag,
      sortBy = "newest",
      page = 1,
      limit = 12
    } = req.query;

    const query = {};

    // 1. Search filter
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { subject: searchRegex },
        { branch: searchRegex },
        { college: searchRegex },
        { tags: searchRegex }
      ];
    }

    // 2. Specific filter criteria
    if (subject && subject.trim() !== "") {
      query.subject = new RegExp(`^${subject.trim()}$`, "i");
    }
    if (semester && semester.trim() !== "") {
      query.semester = new RegExp(`^${semester.trim()}$`, "i");
    }
    if (branch && branch.trim() !== "") {
      query.branch = new RegExp(`^${branch.trim()}$`, "i");
    }
    if (college && college.trim() !== "") {
      query.college = new RegExp(college.trim(), "i");
    }
    if (tag && tag.trim() !== "") {
      query.tags = tag.trim().toLowerCase();
    }

    // 3. Sorting logic
    let sortOptions = {};
    if (sortBy === "most_viewed" || sortBy === "views") {
      sortOptions = { views: -1, createdAt: -1 };
    } else if (sortBy === "most_downloaded" || sortBy === "downloads") {
      sortOptions = { downloads: -1, createdAt: -1 };
    } else {
      // Default: newest
      sortOptions = { createdAt: -1 };
    }

    // 4. Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const totalNotes = await Note.countDocuments(query);
    const totalPages = Math.ceil(totalNotes / limitNum) || 1;

    const notes = await Note.find(query)
      .populate("owner", "name email")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Filter metadata options for frontend dropdowns
    const distinctSubjects = await Note.distinct("subject");
    const distinctSemesters = await Note.distinct("semester");
    const distinctBranches = await Note.distinct("branch");
    const distinctColleges = await Note.distinct("college");

    res.status(200).json({
      notes,
      pagination: {
        totalNotes,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
      },
      filterOptions: {
        subjects: distinctSubjects.filter(Boolean),
        semesters: distinctSemesters.filter(Boolean),
        branches: distinctBranches.filter(Boolean),
        colleges: distinctColleges.filter(Boolean),
      }
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

// GET /api/v1/notes/:slug (Get single note by slug and increment view count)
export const getNoteBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Atomically increment views count when single note detail is loaded
    const note = await Note.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("owner", "name email");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error("Error fetching note by slug:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/v1/notes/id/:id (Get single note by ID)
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id).populate("owner", "name email");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/v1/notes/:id/download (Track download count and return file URL)
export const trackDownload = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndUpdate(
      id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Download count updated",
      downloads: note.downloads,
      fileUrl: note.fileUrl
    });
  } catch (error) {
    console.error("Error tracking download:", error);
    res.status(500).json({ message: "Failed to track download" });
  }
};

// POST /api/v1/notes/:id/bookmark (Toggle bookmark note for logged in user)
export const toggleBookmarkNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const isBookmarked = note.savedBy.some(
      (savedUserId) => savedUserId.toString() === userId.toString()
    );

    if (isBookmarked) {
      // Remove bookmark
      note.savedBy = note.savedBy.filter(
        (savedUserId) => savedUserId.toString() !== userId.toString()
      );
    } else {
      // Add bookmark
      note.savedBy.push(userId);
    }

    await note.save();

    res.status(200).json({
      message: isBookmarked ? "Removed from saved notes" : "Saved to bookmarks",
      isBookmarked: !isBookmarked,
      savedCount: note.savedBy.length
    });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: "Failed to update bookmark" });
  }
};

// PUT /api/v1/notes/:id (Update note metadata - Owner only)
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, subject, semester, branch, college, tags, course } = req.body;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Verify ownership
    if (note.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this note" });
    }

    const toStr = (v) => (typeof v === "string" ? v.trim() : String(v || "").trim());

    if (title) note.title = toStr(title);
    if (description !== undefined) note.description = toStr(description);
    if (subject) note.subject = toStr(subject);
    if (semester) note.semester = toStr(semester);
    if (branch) note.branch = toStr(branch);
    if (college !== undefined) note.college = toStr(college);
    if (course) note.course = toStr(course);

    if (tags !== undefined) {
      if (Array.isArray(tags)) {
        note.tags = tags.map(t => toStr(t).toLowerCase()).filter(Boolean);
      } else if (tags) {
        const tagStr = toStr(tags);
        note.tags = tagStr ? tagStr.split(",").map(t => t.trim().toLowerCase()).filter(Boolean) : [];
      }
    }


    await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Failed to update note" });
  }
};

// DELETE /api/v1/notes/:id (Delete note and Cloudinary file - Owner only)
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Verify ownership
    if (note.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this note" });
    }

    // Delete file from Cloudinary if public ID exists
    if (note.cloudinaryPublicId) {
      await deleteFromCloudinary(note.cloudinaryPublicId);
    }

    // Delete note document from DB
    await Note.findByIdAndDelete(id);

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Failed to delete note" });
  }
};
