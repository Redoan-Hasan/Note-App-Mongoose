import express, { Request, Response } from "express";
import { User } from "../models/user.model";


export const userRouter = express.Router();

// creating a user
userRouter.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);

  res.status(201).send({
    message: "User created successfully",
    user,
  });
});

// getting all users
userRouter.get("/get-users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).send({
    message: "Users fetched successfully",
    users,
  });
});

// getting a single user
userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id); //if you wanna use another field like title or _id directy you can do that with findOne({title: "title"}) or findOne({_id: "id"}) findById is shorthand for findOne({_id: "id"})

  res.status(200).send({
    message: "User Info fetched successfully",
    user,
  });
});

// updating a user
userRouter.patch("/update-user/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedBody = req.body;
  const user = await User.findByIdAndUpdate(id, updatedBody, { new: true });
  //   console.log(user);
  // const user = await Note.updateOne({ _id: id }, updatedBody,{ new: true });
  //   const user = await Note.findOneAndUpdate({ _id: id }, updatedBody, { new: true});

  res.status(200).send({
    message: "Note updated successfully",
    user,
  });
});

// deleting a user
userRouter.delete("/delete-user/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
    console.log(user);
  // const user = await Note.deleteOne({ _id: id });
  //   const user = await Note.findOneAndDelete({ _id: id });

  res.status(200).send({
    message: "Note deleted successfully",
    user,
  });
});