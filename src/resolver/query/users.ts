import { GraphQLError } from "graphql";
import { Users, Event, Category, Ticket, Company } from "../../model";
import mongoose from "mongoose";

export const getUser = async (_: any, _param: any, context: any) => {
  const { user } = context;
  try {
    const user1 = await Users.findById(user?.id).populate([
      "favorites",
      "hashtags",
      "following",
      "tickets",
      "notifications",
    ]);
    //@ts-ignore
    return user1;
  } catch (error) {
    throw new GraphQLError("user not found");
  }
};
export const myHashtagEvents = async (_: any, _param: any, context: any) => {
  const { user } = context;
  try {
    const user1 = await Users.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(user.id) },
      },
      {
        $lookup: {
          from: Category.collection.name,
          localField: "hashtags",
          foreignField: "_id",
          as: "hashtags",
        },
      },
      {
        $lookup: {
          from: Event.collection.name,
          localField: "hashtags.events",
          foreignField: "_id",
          as: "hashtags.events",
        },
      },
      {
        $match: {
          "hashtags.event.startDate": {
            $gte: new Date(),
          },
        },
      },
      {
        $sample: {
          size: 5,
        },
      },
    ]);
    const events = user1[0]?.hashtags?.events;
    console.log(events);

    return events;
  } catch (error) {
    throw new GraphQLError("user not found");
  }
};
export const myTickets = async (_: any, _param: any, context: any) => {
  const { user } = context;
  const tickets = await Ticket.find({
    userid: user.id,
  });
  return tickets;
};

export const getUsers = async (_: any, _param: any, context: any) => {
  try {
    const companyID = context.user.id;
    const isCompany = await Company.findById(companyID);
    if (!isCompany) {
      throw new Error("You are not a company");
    }
    const allUsers = await Users.find();
    return allUsers;
  } catch (error) {
    throw new GraphQLError("bad request :(");
  }
};
