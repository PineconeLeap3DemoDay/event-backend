import gql from 'graphql-tag'

export const categoryTypeDefs = gql`
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