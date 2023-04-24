export interface AddEventInput {
    event: {
    title: string,
    about: string,
    price: number,
    category: string,
    thumbnail: string,
    ticketcount: number,
    organizer: string,
    location: string,
    }
}
export interface DeleteEventInput {
    eventid: string
}
export interface UpdateEventInput {
    title?: string,
    about?: string,
    price?: number,
    category?: string,
    thumbnail?: string,
    ticketcount?: number,
    organizer?: string,
    location?: string,
    eventid?: String
}