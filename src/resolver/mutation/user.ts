import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { Users } from "../../model";
import { createToken } from "../../utils/token";

export const signup = async (_: any, { user }: any) => {
  const existUser = await Users.findOne({ email: user.email });
  if (existUser) {
    throw new GraphQLError("User already exist", {
      extensions: {
        code: "FORBIDDEN",
        status: 400,
      },
    });
  }
  const hashPass = bcrypt.hashSync(user.password, 12);
  const newUser = await Users.create(
    Object.assign(user, { password: hashPass })
  );
  const token = createToken(user);
  return {
    user: newUser,
    token: token,
  };
};
