import jwt from "jsonwebtoken";
import fs from "fs";

// const jwtKey = process.env.JSON_WEB_TOKEN;
// export const signingKey = fs.readFileSync(jwtKey as string);
// if (!signingKey) {
//   console.error("JWT signing key file was not found");
//   process.exit(1);
// }

export const createToken = (user: any) => {
  const token = jwt.sign({ id: user._id, email: user.email }, "haha", {
    expiresIn: "1d",
  });
  return token;
};
