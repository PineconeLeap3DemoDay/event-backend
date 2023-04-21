"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const jwtKey = process.env.JSON_WEB_TOKEN;
// export const signingKey = fs.readFileSync(jwtKey as string);
// if (!signingKey) {
//   console.error("JWT signing key file was not found");
//   process.exit(1);
// }
var createToken = function (user) {
    var token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, "haha", {
        expiresIn: "1d",
    });
    return token;
};
exports.createToken = createToken;
