import mongoose from 'mongoose';
import axios from 'axios'
import { Category, Company, Hashtag, Users } from './index';
import { City } from './city';
const eventModel = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Та эвэнтийн нэрийг оруулна уу'],
        trim: true,
    },
    about: {
        type: String,
        required: [true, 'Та эвэнтийн дэлгэрэнгүй хэсгийг оруулна уу'],
    },
    thumbnail: {
        type: String,
        required: [true, 'Та эвэнтийн зургийг оруулна уу'],
        default: 'https://liveeventproductions.co.uk/wp-content/uploads/2018/01/event-production-services-live-event-productions-banner-image-4.jpg'
    },
    rating: {
        type: Number,
        min: [0, "Rating хамгийн багадаа 1 байна"],
        max: [10, "Rating хамгийн ихдээ 10 байна"],
        default: 0,
    },
    country: {
        type: mongoose.Types.ObjectId,
        ref: 'country',
        required: [true, 'Та эвэнтийн болох улсаа оруулна уу'],
        trim: true,
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'city',
        required: [true, 'Та эвэнтийн болох хотоо оруулна уу'],
    },
    location: {
        type: String,
        required: [true, 'Та эвэнтийн болох газрыг оруулна уу'],
        trim: true,
    },
    ticketcount: {
        type: Number,
        min: [1, "Rating хамгийн багадаа 1 байна"],
        max: [2000, "Rating хамгийн ихдээ 2000 байна"],
        required: [true, 'Та тасалбарын тоо хэмжээг оруулна уу']
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: [true, 'Та эвэнтийн ангилалыг оруулна уу']
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required: [true, 'Та эвэнтийн зохион байгуулж буй компанийг оруулна уу']
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    expirationdate: {
        type: Number,
        required: [true, 'Та эвэнтийн үнийг оруулна уу'],
        default: 10
    },
    price: {
        type: Number,
        default: 10
    },
    endDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Та эвэнтийн дуусах өдрийг оруулна уу']
    }
}, {timestamps: true});
eventModel.pre('save', async function () {
    //when event added, organizer's document will be updated
    await Company.findByIdAndUpdate(this.organizer, {
        $push: { events: this._id }
    })
    await Category.findByIdAndUpdate(this.category, {
        $push: { events: this._id }
    });
    await City.findByIdAndUpdate(this.city, {
        $push: {
            events: this._id
        }
    })
    const usersWithThisEventCategoryAsHashtag = await Hashtag.find({
        categoryId: this.category
    });
    usersWithThisEventCategoryAsHashtag.forEach(async (elem) => {
        const user = await Users.findById(elem.userId);
        if(user?.fcmtoken || user?.fcmtoken !== "") {
            await axios({
                method: 'POST',
                url: 'https://fcm.googleapis.com/fcm/send',
                headers: {
                    Authorization: `key=AAAAiw-HM0E:APA91bFRVy12OOV_kHxB2auhs5cpQaPjebF9Gk9VbEu6OJ_iSnP5eyhn7SEtklMxLY2mBWoU9jC3348Ro8ZvJC4ADrJj8Kns-BZxTV3vh07OYd7IKbl6zZxWPuhVJB1rob91IcfBp34X`,
                },
                data: {
                    "to" : user?.fcmtoken,
                    "notification" : {
                        "body" : "Таны дуртай категорит эвэнт нэмэгдлээ",
                        "title": "Шинэ эвэнт нэмэгдлээ"
                    },
                    "data" : {
                        "body" : "Таны дуртай категорит эвэнт нэмэгдлээ",
                        "title": "Шинэ эвэнт нэмэгдлээ",
                        "thumbnail": this.thumbnail
                    }
                   }
            })
        }
    })
});

export const Event = mongoose.model('event', eventModel);
