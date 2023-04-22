export const companyTypeDefs = `#graphql
    scalar Date
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
    input loginCompanyInput {
        registrationnumber: String!
        password: String!
    }
    type addCompanyResponse {
        company: Company!
        token: String!
    }
    type Mutation {
        addCompany(company: addCompanyInput): addCompanyResponse
        loginCompany(company: loginCompanyInput): addCompanyResponse
    }
    type Query {
        companies: [Company!]!
    }`;
