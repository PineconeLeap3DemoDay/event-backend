"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var UserModel = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "НЭРЭЭ ОРУУЛНА УУ"],
    },
    lastName: {
        type: String,
        required: [true, "ОВГОО ОРУУЛНА УУ"],
    },
    email: {
        type: String,
        required: [true, "Емайлаа ОРУУЛНА УУ"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Та зөв емайл оруулна уу",
        ],
    },
    password: {
        type: String,
        minLength: 4,
        required: [true, "НУУЦ ҮГ ОРУУЛНА УУ"],
        select: false,
    },
});
exports.Users = mongoose_1.default.model("User", UserModel);
