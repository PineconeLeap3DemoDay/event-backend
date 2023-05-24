import jwt from "jsonwebtoken";

export const createToken = (user: any) => {
  let variant: "company" | "user" = "user";
  if (user.registrationnumber) {
    variant = "company";
  }

  const payload = { variant, id: user._id };
  const token = jwt.sign(payload, "haha", {
    expiresIn: "1d",
  });
  return token;
};

export const refreshToken = (user: any) => {
  let variant: "company" | "user" = "user";
  if (user.registrationnumber) {
    variant = "company";
  }
  const payload = { variant, id: user._id };
  const token = jwt.sign(payload, "hehe", { expiresIn: "2d" });
  return token;
};
