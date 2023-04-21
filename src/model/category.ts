import mongoose from 'mongoose';
export interface ICategory {
    name: String
    _id:  String
}
export interface CategoryAddParams {
    name: String
}
export interface CategoryDeleteParams {
    id: String
}
export interface CategoryUpdateParams {
    id: String
    name: String
}

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Категорийн нэрийг оруулна уу"],
        unique: true
    }
});
export const Category =  mongoose.model<ICategory>('category', categoryModel);
