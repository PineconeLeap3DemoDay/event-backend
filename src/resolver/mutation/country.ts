import { GraphQLError } from "graphql"
import { Country } from "../../model/country";
import { City } from "../../model/city";

export const addCountry = async (_: any, param: any, context: any) => {
    if (context.user?.variant !== 'company' || !context) {
        throw new GraphQLError('Та эвэнт нэмэх эрхгүй байна')
    }
    const { name } = param;
    try {
        await Country.create({
            name,
        })
    } catch (error) {
        throw new GraphQLError('Улс бүртгэлтэй байна')
    }

    return true
}
export const addCity = async (_: any, param: any, context: any) => {
    if (context.user?.variant !== 'company' || !context) {
        throw new GraphQLError('Та эвэнт нэмэх эрхгүй байна')
    }
    const { name, countryid } = param;
    try {
        await City.create({
            name,
            country: countryid
        })
    } catch (error) {
        throw new GraphQLError('Улс бүртгэлтэй байна')
    }

    return true
}