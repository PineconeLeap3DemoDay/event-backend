import mongoose from "mongoose";

export interface IUser {
  email: string;
  lastName: string;
  password: string;
  firstName: string;
}

const UserModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "НЭРЭЭ ОРУУЛНА УУ"],
  },
  lastName: {
    type: String,
    required: [true, "ОВГОО ОРУУЛНА УУ"],
  },
  email: {
    type: String,
    required: [true, "Емайлаа ОРУУЛНА УУ"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Та зөв емайл оруулна уу",
    ],
  },
  password: {
    type: String,
    minLength: 4,
    required: [true, "НУУЦ ҮГ ОРУУЛНА УУ"],
    select: false,
  },
});

export const Users = mongoose.model<IUser>("User", UserModel);
