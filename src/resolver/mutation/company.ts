import { Company } from "../../model";
import { companyInput } from "../../types";
import { GraphQLError } from "graphql";
import { createToken } from "../../utils/token";
import bcrypt from "bcryptjs";
export const addCompany = async (_: any, args: companyInput) => {
  const { registrationnumber, password, name, email } = args.company;
  const company = await Company.findOne({ registrationnumber });
  if (company) {
    throw new GraphQLError("Компани бүртгэлтэй байна", {
      extensions: {
        code: "FORBIDDEN",
        status: 400,
      },
    });
  }
  const hashedpassword = bcrypt.hashSync(password, 12);
  const newcompany = await Company.create({
    registrationnumber,
    name,
    email,
    password: hashedpassword,
  });
  const token = createToken(newcompany);

  return {
    company: newcompany,
    token: token,
  };
};
export const loginCompany = async (_: any, args: companyInput) => {
  const { registrationnumber, password } = args.company;
  const company = await Company.findOne({ registrationnumber }).select(
    "+password"
  );

  if (!company) {
    throw new GraphQLError("Таны оруулсан компани оршдоггүй", {
      extensions: {
        code: "FORBIDDEN",
        status: 400,
      },
    });
  }
  const isPasswordRight = await bcrypt.compare(password, company.password);
  if (!isPasswordRight) {
    throw new GraphQLError("Таны оруулсан нууц үг таарахгүй байна", {
      extensions: {
        code: "FORBIDDEN",
        status: 400,
      },
    });
  }
  const token = createToken(company);
  return {
    company,
    token,
  };
};
