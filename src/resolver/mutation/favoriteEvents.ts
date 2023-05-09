import { GraphQLError } from "graphql";
import { Users, Event } from "../../model";
import { Favorites } from "../../model/favorite";

export const addFavorite = async (_: any, { eventId }: any, { user }: any) => {
  const existUser = await Users.findById(user.id);
  if (!existUser) {
    throw new GraphQLError("User not found");
  }
  const existEvent = await Event.findById(eventId);
  if(!existEvent) {
    throw new GraphQLError("Event does not exist ");
  }
  const isExist = await Favorites.findOne({
    eventId: existEvent.id,
    userId: user.id
  })
    
  if (isExist) {
    throw new GraphQLError("Event already exist as favorite");
  }
  await Favorites.create({
    eventId: eventId,
    userId: user.id
  })
  return true;
};

export const deleteFavorite = async (
  _: any,
  { eventId }: any,
  { user }: any
) => {
  const existUser = await Users.findById(user.id);
  if (!existUser) {
    throw new GraphQLError("User not found");
  }
  const event = await Event.findById(eventId);
  if (!event) {
    throw new GraphQLError("Event not found");
  }
  const isThisFavoriteExist = await Favorites.findOne({
    eventId: event.id,
    userId: user.id
  })
  if(!isThisFavoriteExist) {
    throw new GraphQLError("You dont have this event as favorite");
  }
  await Favorites.deleteOne({
    eventId: event.id,
    userId: existUser.id
  })
  await existUser.updateOne({
    $pull: {
      favorites: event?._id,
    },
  });
  return true;
};
