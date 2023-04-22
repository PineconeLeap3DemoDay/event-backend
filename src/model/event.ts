import mongoose from 'mongoose';
export interface AddEventInput {
    title: string,
    about: string,
    price: number,
    category: string,
    thumbnail: string,
    ticketcount: number,
    organizer: string,
    location: string,
}
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
    // console.log(this.startDate, this.endDate)
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
});

export const Event = mongoose.model('event', eventModel);
