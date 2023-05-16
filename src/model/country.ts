import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    cities: [{
        type: mongoose.Types.ObjectId,
        ref: 'city',
        default: []
    }]
});

export const Country = mongoose.model('country', CountrySchema)