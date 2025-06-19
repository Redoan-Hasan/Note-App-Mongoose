import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["work", "personal", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
},{versionKey: false,timestamps: true});

export const Note = mongoose.model("Note", noteSchema);