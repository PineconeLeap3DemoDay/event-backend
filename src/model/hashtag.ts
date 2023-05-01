import mongoose from "mongoose";

export interface IHashtag {
  userId: string;
  categoryId: string;
}

const hashtagModel = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  categoryId: { type: mongoose.Types.ObjectId, ref: "category" },
});

export const Hashtag = mongoose.model<IHashtag>("hashtag", hashtagModel);
