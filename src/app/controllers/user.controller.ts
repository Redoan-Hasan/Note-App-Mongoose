import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { userZodSchema } from "../zodSchemas/user.zodSchema";

export const userRouter = express.Router();

// creating a user
userRouter.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await userZodSchema.parseAsync(req.body);
    // const body = userZodSchema.parse(req.body);
    // console.log(body);
    // const password = await bycript.hash(body.password, 10);
    // console.log(password);
    // body.password = password;

    //static method
    // const password = await User.hashPassword(body.password);
    // console.log("pasword hashed successfully with static method" , password);
    // body.password = password;

    const user = await User.create(body);


    //instance method
    // const user = new User(body);
    // const password = await user.hashPassword(body.password);
    // user.password = password;
    // await user.save();

    res.status(201).send({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).send({
      message: "Error creating user",
      error: error.message,
    });
  }
});

// getting all users
userRouter.get("/get-users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).send({
    message: "Users retrieved successfully",
    users,
  });
});

// getting a single user
userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
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
  res.status(200).send({
    message: "User updated successfully",
    user,
  });
});

// deleting a user
userRouter.delete("/delete-user/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findOneAndDelete({_id: id});
  console.log(user);
  res.status(200).send({
    message: "User deleted successfully",
    user,
  });
});
