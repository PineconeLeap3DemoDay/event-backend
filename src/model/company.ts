import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const companyModel = new mongoose.Schema({
  registrationnumber: {
    type: String,
    required: [true, "Компани регистерийн дугаарыг ОРУУЛНА УУ"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Компани нэрээ ОРУУЛНА УУ"],
    unique: true,
  },
  rating: {
    type: Number,
    min: [0, "Rating хамгийн багадаа 0 байна"],
    max: [10, "Rating хамгийн ихдээ 10 байна"],
    default: 0,
  },
  password: {
    type: String,
    minLength: 4,
    required: [true, "НУУЦ ҮГ ОРУУЛНА УУ"],
    select: false,
  },
  events: [
    {
      type: mongoose.Types.ObjectId,
      ref: "event",
      default: [],
    },
  ],
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  profile: [
    {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  ],
});
// companyModel.pre('save', async function() {
//     const hashedpassword = await bcrypt.hash(this.password, 12);
//     this.password = hashedpassword;
// });

export const Company = mongoose.model("Company", companyModel);
