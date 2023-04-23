export const categoryTypeDefs = `#graphql
    scalar Date

    type Category {
        name: String!
        id: ID!
    }
    type Query {
        categories: [Category!]!
    }
    type Mutation {
        addCategory(name: String!): Category!
        deleteCategory(id: ID!): Boolean!
        updateCategory(id: ID!, name: String!): Category!
    }
`;
