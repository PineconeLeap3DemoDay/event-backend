import mongoose from "mongoose";

export interface IFavorite {
  userId: string;
  eventId: string;
}

const favoriteModel = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  eventId: { type: mongoose.Types.ObjectId, ref: "event" },
});

export const Favorites = mongoose.model<IFavorite>("favorites", favoriteModel);
