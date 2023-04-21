"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var companyModel = new mongoose_1.default.Schema({
    registrationnumber: {
        type: String,
        required: [true, "Компани регистерийн дугаарыг ОРУУЛНА УУ"],
        unique: true
    },
    rating: {
        type: Number,
        min: [0, "Rating хамгийн багадаа 1 байна"],
        max: [10, "Rating хамгийн ихдээ 10 байна"],
        default: 0
    },
    password: {
        type: String,
        minLength: 4,
        required: [true, "НУУЦ ҮГ ОРУУЛНА УУ"],
        select: false,
    },
});
exports.Company = mongoose_1.default.model('Company', companyModel);
