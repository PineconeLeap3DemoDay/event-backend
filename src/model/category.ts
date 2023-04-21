import mongoose from 'mongoose';
const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Категорийн нэрийг оруулна уу"],
        unique: true
    }
});
export const Category =  mongoose.model('category', categoryModel);
