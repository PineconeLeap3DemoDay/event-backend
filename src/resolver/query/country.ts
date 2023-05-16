import { City } from "../../model/city";
import { Country } from "../../model/country"

export const getCountries = async () => {
    const countries = await Country.find().populate({
        path: 'cities',
        populate: {
            path: 'events',
        }
    });
    return countries
}

export const getCountry = async(_: any, param: any) => {
    const {countryid} = param;
    const country = await Country.findById(countryid).populate({
        path: 'cities',
        populate: {
            path: 'events',
        }
    });
    return country
}

export const getCity = async(_: any, param: any) => {
    const {cityid} = param;
    const country = await City.findById(cityid).populate({
        path: 'cities',
        populate: {
            path: 'events',
        }
    });
    return country
}