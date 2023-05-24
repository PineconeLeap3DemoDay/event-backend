import { Category, Event } from "../../model";
import mongoose from "mongoose";
export const categories = async () => {
  const categories = await Category.find().populate({
    path: "events",
    populate: {
      path: "category",
    },
  });
  return categories;
};
export const category = async (_: any, args: any) => {
  const { categoryid: categoryid } = args;
  const categoryEvents = await Category.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(categoryid),
      },
    },
    {
      $lookup: {
        from: Event.collection.name,
        localField: "events",
        foreignField: "_id",
        as: "events",
      },
    },
    { $unwind: "$events" },
    {
      $match: {
        "events.startDate": {
          $gte: new Date(),
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        events: { $push: "$events" },
      },
    },
  ]);

  console.log(categoryEvents[0].events);
  return categoryEvents[0];
};
