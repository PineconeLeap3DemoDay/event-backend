import { GraphQLError } from "graphql";
import { Users, Event } from "../../model";

export const addFavorite = async (_: any, { eventId }: any, { user }: any) => {
  const existUser = await Users.findById(user.id);
  if (!existUser) {
    throw new GraphQLError("User not found");
  }
  const existEvent = await Event.findById(eventId);
  const isExist =
    //@ts-ignore

    (await existUser.favorites.findIndex(
      (favorite: any) => favorite.toString() === eventId
    )) !== -1;
  if (isExist) {
    throw new GraphQLError("Event already exist");
  }
  await existUser.updateOne({
    $push: { favorites: existEvent?._id },
  });

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
  const existEvent = await Event.findById(eventId);
  if (!existEvent) {
    throw new GraphQLError("Event not found");
  }

  //@ts-ignore
  const isExist = await existUser.favorites.filter(
    (el: any) => el === existEvent._id
  );
  console.log(isExist, "kkkkkkkkkkkkkkk");

  // await existUser.updateOne({
  //   $pullAll: {
  //     favorites: existEvent?._id,
  //   },
  // });
  return true;
};
