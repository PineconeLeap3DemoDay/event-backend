import mongoose from "mongoose";
import { Category, Company } from "../model";
import { City } from "../model/city";
import { Country } from "../model/country";

export default function aggregatePipeline(arg: any) {
    let pipeline: 
    ({ $match: { startDate: { $gt: Date; $lt: Date; }; country?: undefined; }; } 
        | { $match: { country: mongoose.Types.ObjectId; startDate?: undefined; }; })[] 
    = [];
    //only by date
    (arg.from && arg.to) && (pipeline = [
        {
            $match: {
                startDate: {
                    $gt: new Date(arg?.from),
                    $lt: new Date(arg?.to)
                }
            },
        },
        {
            //@ts-ignore
            $lookup: {
                from: Category.collection.name,
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            //@ts-ignore
            $lookup: {
                from: Country.collection.name,
                localField: 'country',
                foreignField: '_id',
                as: 'country'
            }
        },
        {
            //@ts-ignore
            $lookup: {
                from: City.collection.name,
                localField: 'city',
                foreignField: '_id',
                as: 'city'
            }
        },
        {
            //@ts-ignore
            $lookup: {
                from: Company.collection.name,
                localField: 'organizer',
                foreignField: '_id',
                as: 'organizer'
            }
        },
    ]);
    //query by date and category
    (arg.from && arg.to && arg.categoryid) && (pipeline = [{
        $match: {
            startDate: {
                $gt: new Date(arg?.from),
                $lt: new Date(arg?.to)
            }
        },
    }, {
        $match: {
            //@ts-ignore
            category: new mongoose.Types.ObjectId(arg.categoryid)
        }
    },
    {
        //@ts-ignore
        $lookup: {
            from: Category.collection.name,
            localField: 'category',
            foreignField: '_id',
            as: 'category'
        }
    },
    {
        //@ts-ignore
        $lookup: {
            from: Country.collection.name,
            localField: 'country',
            foreignField: '_id',
            as: 'country'
        }
    },
    {
        //@ts-ignore
        $lookup: {
            from: City.collection.name,
            localField: 'city',
            foreignField: '_id',
            as: 'city'
        }
    },
    {
        //@ts-ignore
        $lookup: {
            from: Category.collection.name,
            localField: 'category',
            foreignField: '_id',
            as: 'category'
        }
    },
]);
    //query by date and country
    (arg.from && arg.to && arg.countryid) && (pipeline = [
        {
            $match: {
                startDate: {
                    $gt: new Date(arg?.from),
                    $lt: new Date(arg?.to)
                }
            },
        }, 
        {
            $match: {
                //@ts-ignore
                country: new mongoose.Types.ObjectId(arg.countryid)
            }
        },
        {
            //@ts-ignore
            $lookup: {
                from: Country.collection.name,
                localField: 'country',
                foreignField: '_id',
                as: 'country'
            }
        }
    ]);
    //query by date and country and city
    (arg.from && arg.to && arg.countryid && arg.cityid) && (pipeline = [
        {
            $match: {
                startDate: {
                    $gt: new Date(arg?.from),
                    $lt: new Date(arg?.to)
                }
            },
        },
        {
            $match: {
                //@ts-ignore
                country: new mongoose.Types.ObjectId(arg.countryid)
            }
        },
        {
            $match: {
                //@ts-ignore
                city: new mongoose.Types.ObjectId(arg.cityid)
            }
        },
        {
            //@ts-ignore
            $lookup: {
                from: Category.collection.name,
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            //@ts-ignore
            $lookup: {
                from: Country.collection.name,
                localField: 'country',
                foreignField: '_id',
                as: 'country'
            }
        }
    ]);
    //query by date and country and city and categoryid
    (arg.from && arg.to && arg.countryid && arg.cityid && arg.categoryid) && (pipeline = [
        {
            $match: {
                startDate: {
                    $gt: new Date(arg?.from),
                    $lt: new Date(arg?.to)
                }
            },
        },
        {
            $match: {
                //@ts-ignore
                country: new mongoose.Types.ObjectId(arg.countryid)
            }
        },
        {
            $match: {
                //@ts-ignore
                city: new mongoose.Types.ObjectId(arg.cityid)
            }
        },
        {
            $match: {
                //@ts-ignore
                category: new mongoose.Types.ObjectId(arg.categoryid)
            }
        },
        {
            //@ts-ignore
            $lookup: {
                from: Category.collection.name,
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            //@ts-ignore
            $lookup: {
                from: Country.collection.name,
                localField: 'country',
                foreignField: '_id',
                as: 'country'
            }
        }
    ]);
    ////////////
    //query by includes string
    (arg.includes) && (pipeline = [
        {
            $match: {
                //@ts-ignore
                "title": {
                    $regex: arg.includes
                }
            },
        },
    ]);
    return pipeline
}
