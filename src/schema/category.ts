export const categorySchema =  `#graphql
    type Category {
        name: String!
        _id: ID!
    }
    type Query {
        categories: [Category]
    }
    type Mutation {
        addCategory(name: String!): Category
    }
`