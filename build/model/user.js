"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userModel = new mongoose_1.default.Model({
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
    hashedPassword: {
        type: String,
        minLength: 4,
        required: [true, "НУУЦ ҮГ ОРУУЛНА УУ"],
        select: false,
    },
});
exports.default = mongoose_1.default.model('User', userModel);
