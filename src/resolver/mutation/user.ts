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
  const token = createToken(newUser);
  return {
    user: user,
    token: token,
  };
};

export const signin = async (_: any, { email, password }: any) => {
  const existUser = await Users.findOne({ email: email }).select("+password");

  if (!existUser) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "FORBIDDEN",
        status: 400,
      },
    });
  }
  const isPasswordRight = await bcrypt.compare(password, existUser.password);
  if (!isPasswordRight) {
    throw new GraphQLError("Password incorrect", {
      extensions: {
        code: "FORBIDDEN",
        status: 400,
      },
    });
  }
  const token = createToken(existUser);

  return {
    user: existUser,
    token: token,
  };
};
