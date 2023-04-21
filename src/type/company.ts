export const companyTypeDefs = `#graphql
    type Company {
        registrationnumber: String!
        rating: Int!
        password: String!
        id: ID!
    }
    input addCompanyInput {
        registrationnumber: String!
        password: String!
    }
    type Mutation {
        addCompany(company: addCompanyInput): Company
    }
    type Query {
        companies: [Company!]!
    }
    
`