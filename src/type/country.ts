export const countryTypeDefs = `#graphql
type City {
    name: String
    events: [Event]
    id:ID
}
type Country {
    name: String,
    cities: [City]
    id: ID
}
type Query {
    getCountries: [Country]
    getCountry(countryid: ID): Country
    getCity(cityid: ID): Boolean
}
type Mutation {
    addCountry(name: String): Boolean
    addCity(countryid: ID! name: String!): Boolean
}
`