import { GraphQLError } from "graphql";
import { Category, Hashtag, Users } from "../../model";

export const addHashtag = async (
  _: any,
  { categoryId }: any,
  { user }: any
) => {
  const existUser = await Users.findById(user.id);
  if (!existUser) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "FORBIDDEN",
        http: { status: 400 },
      },
    });
  }
  const existCategory = await Category.findById(categoryId);
  if (!existCategory) {
    throw new GraphQLError("not found", {
      extensions: {
        code: "FORBIDDEN",
        http: { status: 400 },
      },
    });
  }
  const isExist = await Hashtag.find({
    $and: [{ userId: user.id }, { categoryId: categoryId }],
  });
  if (isExist[0]) {
    throw new GraphQLError("already exist", {
      extensions: {
        code: "FORBIDDEN",
        http: { status: 400 },
      },
    });
  }
  await Hashtag.create({
    userId: user.id,
    categoryId: categoryId,
  });
  return true;
};

export const deleteHashtag = async (
  _: any,
  { categoryId }: any,
  { user }: any
) => {
  const existUser = await Users.findById(user.id);
  if (!existUser) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "FORBIDDEN",
        http: { status: 400 },
      },
    });
  }
  await Hashtag.findOneAndDelete({userId: user.id, categoryId: categoryId});
  await existUser.updateOne({
    $pull: {
      hashtags: categoryId
    }
  })
  return true;
};
