export const categoryTypeDefs = `#graphql
    scalar Date

    type Category {
        name: String!
        id: ID!
        events: [Event]
    }
    type Query {
        categories: [Category!]!
        category(categoryid:ID): Category!
    }
    type Mutation {
        addCategory(name: String!): Category!
        deleteCategory(id: ID!): Boolean!
        updateCategory(id: ID!, name: String!): Category!
    }
`;
