import mongoose from 'mongoose';
import { Users } from './user';
const NotificaitonModel = new mongoose.Schema({
    title: {
        type: String,
        required: [true],
    },
    subtitle: {
        type: String,
    },
    thumbnail: {
        type: String,
        required: [true],
        default: 'https://react.dev/images/og-home.png',
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});
NotificaitonModel.pre('save',async function() {
    await Users.findByIdAndUpdate(this.userid, {
        $push: {
            notifications: this._id
        }
    })
});
export const Notification = mongoose.model('notification', NotificaitonModel);
