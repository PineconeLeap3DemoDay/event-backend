import mongoose from "mongoose";
import { Country } from "./country";

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    country: {
        type: mongoose.Types.ObjectId,
        ref: 'country',
        required: [true, 'Ta xoToo opyylna uu']
    },
    events: [{
        type: mongoose.Types.ObjectId,
        ref: 'event',
        default: []
    }]
});
CitySchema.pre('save',async function() {
    await Country.findByIdAndUpdate(this.country,{
        $push: {
            cities: this._id
        }
    })
})

export const City = mongoose.model('city', CitySchema)