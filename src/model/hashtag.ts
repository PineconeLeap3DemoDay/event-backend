import mongoose from "mongoose";
import { Users } from "./user";

export interface IHashtag {
  userId: string;
  categoryId: string;
}

const hashtagModel = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  categoryId: { type: mongoose.Types.ObjectId, ref: "category" },
});
hashtagModel.pre('save', async function() {
  await Users.findByIdAndUpdate(this.userId, {
    $push:{
      hashtags: this.categoryId
    }
  })
})
export const Hashtag = mongoose.model<IHashtag>("hashtag", hashtagModel);
