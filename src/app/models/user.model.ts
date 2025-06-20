import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";
import validator from "validator";

const addressSchema = new Schema<IAddress>({
    city: { type: String, required: [true, 'City is required'], trim: true },
    country: { type: String, required: [true, 'Country is required'], trim: true }
}, {_id: false, versionKey: false });


const userSchema = new Schema<IUser>({
    firstName: { type: String, required:[ true, 'First name is required' ], trim: true , minlength: [2, 'First name must be at least 2 characters long, got {VALUE}'] },
    lastName: { type: String, required: true, trim: true, minlength:3,
        validate:{
            validator: function(v: string) {
                return v.length >=3;
            },
            message: props => `Last name must be at least 3 characters long, got ${props.value}`
        }
     },
    email: { type: String, required: true, unique: true , trim: true, 
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: { type: String, required: true },
    role: { 
        type: String,
        // enum: ['user', 'admin'],
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} is not a valid role'
        },
        default: 'user'
    },
    address: { type: addressSchema, required: true }
}, {
    versionKey: false,
    timestamps: true
});

export const User = model<IUser>('User', userSchema);