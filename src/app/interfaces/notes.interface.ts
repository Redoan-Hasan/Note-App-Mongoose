export interface INotes {
  title: string;
  content: string;
  category: "work" | "personal" | "other";
  pinned: boolean;
}
