import express from 'express';
import { uploadNote } from '../controller/uploadNote.controller.js';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js'; 

const router = express.Router();

router.post('/upload', auth, upload.single('file'), uploadNote);

export default router;
