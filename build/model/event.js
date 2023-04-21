"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var eventModel = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Та эвэнтийн нэрийг оруулна уу'],
    },
    about: {
        type: String,
        required: [true, 'Та эвэнтийн дэлгэрэнгүй хэсгийг оруулна уу'],
    },
    thumbnail: {
        type: String,
        required: [true, 'Та эвэнтийн зургийг оруулна уу'],
    },
    rating: {
        type: Number,
        min: [0, "Rating хамгийн багадаа 1 байна"],
        max: [10, "Rating хамгийн ихдээ 10 байна"],
        default: 0,
    },
    ticketcount: {
        type: Number,
        min: [1, "Rating хамгийн багадаа 1 байна"],
        max: [2000, "Rating хамгийн ихдээ 2000 байна"],
    },
    expirationdate: {
        type: Number,
    },
    organizer: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Company",
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: [true, 'Та эвэнтийн дуусах өдрийг оруулна уу']
    }
}, { timestamps: true });
exports.Event = mongoose_1.default.model('event', eventModel);
