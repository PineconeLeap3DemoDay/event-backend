import mongoose from "mongoose";

export interface IUser {
  email: string;
  lastName: string;
  password: string;
  firstName: string;
  hashtags: any[];
  fcmtoken?: string;
  isNotificationEnabled?: boolean;
  notifications?: [];
  profile: string;
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
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "event",
    },
  ],
  hashtags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
  ],
  tickets: [
    {
      type: mongoose.Types.ObjectId,
      ref: "event",
    },
  ],
  notifications: [
    {
      type: mongoose.Types.ObjectId,
      ref: "notification",
    },
  ],
  profile: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  fcmtoken: {
    type: String,
  },
  isNotificationEnabled: {
    type: Boolean,
    default: false,
  },
});

export const Users = mongoose.model<IUser>("User", UserModel);
