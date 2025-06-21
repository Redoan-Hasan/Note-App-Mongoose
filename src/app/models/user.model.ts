import bycript from "bcryptjs";
import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interface";
import validator from "validator";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String, required: [true, "City is required"], trim: true },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
  },
  { _id: false, versionKey: false }
);

const userSchema = new Schema<IUser, Model<IUser, {}, UserInstanceMethods>>({

// const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
//   {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [
        2,
        "First name must be at least 2 characters long, got {VALUE}",
      ],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      validate: {
        validator: function (v: string) {
          return v.length >= 3;
        },
        message: (props) =>
          `Last name must be at least 3 characters long, got ${props.value}`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      // enum: ['user', 'admin'],
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },
    address: { type: addressSchema, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

//instance method
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bycript.hash(plainPassword, 10);
  return password;
    // console.log("Password hashed successfully");
});

//static method
userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bycript.hash(plainPassword, 10);
  return password;
    // console.log("Password hashed successfully");
});

// pre hook(middleware)  
userSchema.pre("save", async function(next){
    this.password = await bycript.hash(this.password, 10);
    console.log(this);
    next();
})

// post hook (middleware)
userSchema.post("save", function(doc, next){
    console.log("User created successfully", doc);
    next();
})

userSchema.post("findOneAndDelete", async function (doc, next){
    if(doc){
        await Note.deleteMany({user: doc._id});
        console.log(`Notes deleted for user ${doc}`);
    }
    next();
})


//virtuals
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});


// export const User = model<IUser>("User", userSchema);


// with instance method 
export const User = model<IUser, Model<IUser, {}, UserInstanceMethods>>("User", userSchema);


// with static method 
// export const User = model<IUser,UserStaticMethods>("User", userSchema);
