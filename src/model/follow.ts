import mongoose from 'mongoose';
import { Company } from './company';

const FollowerModel = new mongoose.Schema({
    whom: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
    },
    who: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

FollowerModel.pre('save', async function() {
    await Company.findByIdAndUpdate(this.whom, {
        $push: {
            followers: this.who
        }
    })
});
export const Follower = mongoose.model("follower", FollowerModel);
