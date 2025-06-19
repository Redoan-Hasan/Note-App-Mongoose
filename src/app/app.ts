import express, { Application, Request, Response } from "express";
import { Note } from "./models/notes.model";
import { notesRouter } from "./controllers/notes.controller";
const app: Application = express();

app.use(express.json());

app.use("/notes", notesRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the Note Application!");
});



export default app;
