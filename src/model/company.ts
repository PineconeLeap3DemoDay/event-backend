import mongoose from 'mongoose';
export interface ICompany {
    registrationnumber: string,
    password: string,
    rating: number
}
export interface addCompanyInput {
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

export const Company =  mongoose.model('Company', companyModel)