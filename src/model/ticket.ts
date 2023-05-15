import mongoose from 'mongoose';
import { Users } from './user';
const ticketModel = new mongoose.Schema({
    eventid: {
        type: mongoose.Types.ObjectId,
        ref: 'event'
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});
ticketModel.pre('save',async function() {
    await Users.findByIdAndUpdate(this.userid, {
        $push: {
            tickets: this.eventid
        }
    })
});
export const Ticket = mongoose.model('ticket', ticketModel);
