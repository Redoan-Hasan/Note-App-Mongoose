import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";


export const notesRouter = express.Router();

// creating a note
notesRouter.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);
  res.status(201).send({
    message: "Note created successfully",
    note,
  });
});

// getting all notes
notesRouter.get("/get-notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).send({
    message: "Notes fetched successfully",
    notes,
  });
});

// getting a single note
notesRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.status(200).send({
    message: "Note fetched successfully",
    note,
  });
});

// updating a note
notesRouter.patch("/update-note/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(id, updatedBody, { new: true });
  res.status(200).send({
    message: "Note updated successfully",
    note,
  });
});

// deleting a note
notesRouter.delete("/delete-note/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const note = await Note.findByIdAndDelete(id);
  res.status(200).send({
    message: "Note deleted successfully",
    note,
  });
});