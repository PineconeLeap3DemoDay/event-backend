import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
export interface ICompany {
    registrationnumber: string,
    password: string,
    rating: number
}
export interface companyInput {
    company: ICompany
}
const companyModel = new mongoose.Schema({
    registrationnumber: {
        type: String,
        required: [true, "Компани регистерийн дугаарыг ОРУУЛНА УУ"],
        unique: true
    },
    rating: {
        type: Number,
        min: [0, "Rating хамгийн багадаа 0 байна"],
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
companyModel.pre('save', async function() {
    const hashedpassword = await bcrypt.hash(this.password, 12);
    this.password = hashedpassword;
});

export const Company =  mongoose.model('Company', companyModel)