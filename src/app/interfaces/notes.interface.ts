import { Types } from "mongoose";

export interface INotes {
  title: string;
  content: string;
  category: "work" | "personal" | "other";
  pinned: boolean;
  user: Types.ObjectId;
}
