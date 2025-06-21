import express, { Application, Request, Response } from "express";
import { notesRouter } from "./app/controllers/notes.controller";
import { userRouter } from "./app/controllers/user.controller";
const app: Application = express();

app.use(express.json());

app.use("/notes", notesRouter);
app.use("/users", userRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the Note Application!");
});



export default app;
