import mongoose from "mongoose";
import { Users } from "./user";

export interface IFavorite {
  userId: string;
  eventId: string;
}

const favoriteModel = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  eventId: { type: mongoose.Types.ObjectId, ref: "event" },
});
favoriteModel.pre('save',async function() {
  await Users.findByIdAndUpdate(this.userId, {
    $push: {
      favorites: this.eventId
    }
  })
})
export const Favorites = mongoose.model<IFavorite>("favorites", favoriteModel);
