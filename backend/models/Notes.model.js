import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
     type: String,
     required: true,
    },
    course: {
     type: String,
     required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
      min: 1,
      max: 8,
    },
    university: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fileUrl: { 
        type: String 
    },
    savedBy: [
        { 
        type: mongoose.Schema.Types.ObjectId, ref: "User" 
        }
    ],
    slug: { 
        type: String, unique: true, default: () => nanoid(8) 
    },
},
{
   timestamps: true,
})