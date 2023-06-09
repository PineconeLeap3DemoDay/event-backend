import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import { Company, Follower, Users } from "../../model";
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
    user: newUser,
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

export const deleteUser = async (_: any, { _id }: any) => {
  const existUser = await Users.findById(_id);
  if (!existUser) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "FORBIDDEN",
        status: 400,
      },
    });
  }
  await Users.findByIdAndDelete(_id);
  return true;
};

export const editUser = async (_: any, {user: input}: any, context: any) => {
  const {id: userid} =context.user;
  const existUser = await Users.findById(userid);
  if (!existUser) {
    throw new GraphQLError("User not found", {
      extensions: {
        code: "FORBIDDEN",
        status: 400,
      },
    });
  }
  if (input.password) {
    const hashPass = bcrypt.hashSync(input.password, 12);
    await Users.findByIdAndUpdate(userid, { ...input, password: hashPass });
  }
  delete input.password;

  await existUser.updateOne(input)
  return true;
};
export const followCompany = async (_: any, param: any, context: any) => {
  console.log(context)
  if(!context || context?.user?.variant !== 'user') {
    throw new GraphQLError("you are not authorized");
  }
  const {id: userid} = context.user;
  const {companyid} = param;
  const company = await Company.findById(companyid);
  if(!company) {
    throw new GraphQLError("company not found");
  }
  const isUserAlreadyFollowedCompany = company.followers
  .findIndex(follower => follower.toString() === userid) !== -1;
  
  if(isUserAlreadyFollowedCompany) {
    throw new GraphQLError("you already followed this company");
  }
  await Follower.create({
    whom: company._id,
    who: userid
  });
  return true
}
export const unfollowCompany = async (_: any, param: any, context: any) => {
  if(!context || context?.user?.variant !== 'user') {
    throw new GraphQLError("you are not authorized");
  }
  const {id: userid} = context.user;
  const {companyid} = param;
  const company = await Company.findById(companyid);
  if(!company) {
    throw new GraphQLError("company not found");
  }
  const isUserFollowThisCompany = company.followers
  .findIndex(follower => follower.toString() === userid) !== -1;

  if(!isUserFollowThisCompany) {
    throw new GraphQLError("you dont follow this company");
  }
  await company.updateOne({
    $pull: {
      followers: userid
    }
  });
  await Users.findByIdAndUpdate(userid, {
    $pull: {
      following: companyid
    }
  })
  await Follower.findOneAndDelete({whom: companyid, who: userid})
  return true
}
