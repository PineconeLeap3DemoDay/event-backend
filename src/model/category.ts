import mongoose from 'mongoose';
const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Категорийн нэрийг оруулна уу"],
        unique: true
    }
});
export default mongoose.model('category', categoryModel);
