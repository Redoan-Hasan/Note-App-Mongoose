import express, { Application, Request, Response } from "express";
import { Note } from "./models/notes.model";
import { notesRouter } from "./controllers/notes.controller";
import { userRouter } from "./controllers/user.controller";
const app: Application = express();

app.use(express.json());

app.use("/notes", notesRouter);
app.use("/users", userRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the Note Application!");
});



export default app;
