import express from "express";

const router = express.Router();

router.route("/upload").post(
    (req, res) => {
        // Handle file upload logic here
        res.status(200).json({ message: "File uploaded successfully" });
    }
)

export default router;