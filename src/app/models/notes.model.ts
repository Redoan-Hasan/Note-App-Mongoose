import mongoose from "mongoose";
import { INotes } from "../interfaces/notes.interface";

const noteSchema = new mongoose.Schema<INotes>({
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

export const Note = mongoose.model<INotes>("Note", noteSchema);