export const favoriteTypeDefs = `#graphql
type myFavorites {
    eventIds: [ID!]
}
type Query {
    getMyFavorites(userId: ID!): myFavorites!
}

type Mutation {
    addFavorite(eventId: ID!): Boolean!
    deleteFavorite(eventId: ID!): Boolean!
}
`;
