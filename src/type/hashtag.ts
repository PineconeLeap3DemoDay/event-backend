export const hashtagTypeDefs = `#graphql
type Hashtag {
    categoryIds: [ID!]
}
type Mutation {
    addHashtag(categoryId: ID!): Boolean!
    deleteHashtag(hashtagId: ID!): Boolean!
}
`;
